# WanderOn Authentication API Documentation

## Overview

The WanderOn Authentication API provides secure user authentication and management capabilities. Built with Express.js, MongoDB, and JWT tokens, it offers enterprise-grade security features including rate limiting, account lockout, and comprehensive input validation.

**Base URL**: 
- Development: `http://localhost:5001/api`
- Production: `https://your-render-app.onrender.com/api`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication, stored in HTTP-only cookies for security. Some endpoints require authentication while others are public.

Cookie behavior:
- In production (HTTPS or when CLIENT_URL is https), cookies are set with `SameSite=None; Secure` for cross-site usage.
- In local development over HTTP, cookies are set with `SameSite=Lax` and without `Secure`.

### Cookie Authentication (preferred)
The API automatically handles authentication via HTTP-only cookies set during login/registration. Clients should send requests with `withCredentials: true`.

### Authorization Header (optional)
Some tools may use a Bearer token header, but it is not required when using cookies.

---

## Error Handling

All API responses follow a consistent format:

### Success Response Format
```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response Format
```json
{
  "status": "error",
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

### HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Authentication required)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (Rate limited)
- `500` - Internal Server Error

---

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **Account lockout**: After 5 failed login attempts for 15 minutes

---

## Endpoints

### Authentication Endpoints

#### Register User
Creates a new user account and returns authentication token.

**POST** `/auth/register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

**Validation Rules:**
- `firstName`: 2-50 characters, letters and spaces only
- `lastName`: 2-50 characters, letters and spaces only
- `username`: 3-30 characters, alphanumeric and underscore only, not reserved
- `email`: Valid email format, max 255 characters
- `password`: 8-128 characters, must contain uppercase, lowercase, number, and special character
- `confirmPassword`: Must match password

**Success Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "60d5ecb74f6a4b001f647b8a",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true,
      "createdAt": "2021-06-25T10:30:00.000Z",
      "updatedAt": "2021-06-25T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "status": "error",
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists. Please use another email."
    }
  ]
}
```

---

#### Login User
Authenticates user credentials and returns authentication token.

**POST** `/auth/login`

**Request Body:**
```json
{
  "identifier": "john@example.com", // email or username
  "password": "SecurePass123!"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "60d5ecb74f6a4b001f647b8a",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true,
      "lastLogin": "2021-06-25T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Invalid credentials
- `400` - Account temporarily locked due to too many failed login attempts
- `429` - Too many authentication attempts

---

#### Logout User
Logs out the current user and clears authentication cookie.

**POST** `/auth/logout`

**Authentication**: Required

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

#### Get Current User
Returns the current authenticated user's information.

**GET** `/auth/me`

**Authentication**: Required

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "60d5ecb74f6a4b001f647b8a",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true,
      "lastLogin": "2021-06-25T10:30:00.000Z"
    }
  }
}
```

---

#### Refresh Token
Generates a new authentication token for the current user.

**POST** `/auth/refresh`

**Authentication**: Required

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### Check Authentication Status
Checks if the user is currently authenticated.

**GET** `/auth/check`

**Authentication**: Not required

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "authenticated": true,
    "user": {
      "_id": "60d5ecb74f6a4b001f647b8a",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true
    }
  }
}
```

**Unauthenticated Response (200):**
```json
{
  "status": "success",
  "data": {
    "authenticated": false,
    "user": null
  }
}
```

---

### User Management Endpoints

#### Get User Profile
Returns the current user's profile information.

**GET** `/user/profile`

**Authentication**: Required

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "60d5ecb74f6a4b001f647b8a",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true,
      "createdAt": "2021-06-25T10:30:00.000Z",
      "updatedAt": "2021-06-25T10:30:00.000Z",
      "lastLogin": "2021-06-25T10:30:00.000Z"
    }
  }
}
```

---

#### Update User Profile
Updates the current user's profile information.

**PUT** `/user/profile`

**Authentication**: Required

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "60d5ecb74f6a4b001f647b8a",
      "username": "johndoe",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true,
      "updatedAt": "2021-06-25T11:00:00.000Z"
    }
  }
}
```

---

#### Change Password
Changes the current user's password.

**PUT** `/user/password`

**Authentication**: Required

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!",
  "confirmNewPassword": "NewPass123!"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Password changed successfully"
}
```

**Error Response (400):**
```json
{
  "status": "error",
  "message": "Current password is incorrect"
}
```

---

#### Delete User Account
Deactivates the current user's account (soft delete).

**DELETE** `/user/account`

**Authentication**: Required

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Account deactivated successfully"
}
```

---

### Admin Endpoints

#### Get User Statistics
Returns user statistics (admin only).

**GET** `/user/stats`

**Authentication**: Required (Admin role)

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "stats": {
      "totalActiveUsers": 150,
      "totalInactiveUsers": 25,
      "totalUsers": 175,
      "recentUsers": [
        {
          "_id": "60d5ecb74f6a4b001f647b8a",
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com",
          "createdAt": "2021-06-25T10:30:00.000Z"
        }
      ]
    }
  }
}
```

---

#### Get All Users
Returns paginated list of all users (admin only).

**GET** `/user/all?page=1&limit=10`

**Authentication**: Required (Admin role)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "users": [
      {
        "_id": "60d5ecb74f6a4b001f647b8a",
        "username": "johndoe",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "user",
        "createdAt": "2021-06-25T10:30:00.000Z",
        "lastLogin": "2021-06-25T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 15,
      "totalUsers": 150,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## Security Features

### Password Security
- Bcrypt hashing with 12 salt rounds
- Strong password requirements (8+ chars, mixed case, numbers, special chars)

### JWT Security
- HTTP-only cookies prevent XSS attacks
- Secure flag for HTTPS environments
- SameSite policy for CSRF protection
- Configurable token expiration

### Account Security
- Account lockout after 5 failed attempts
- 15-minute lockout duration
- Login attempt tracking
- Active session management

### Input Validation
- Server-side validation using express-validator
- Data sanitization against NoSQL injection
- XSS protection
- Request rate limiting

---

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-render-app.onrender.com/api'
    : 'http://localhost:5001/api',
  withCredentials: true // Important for cookies
});

// Register user
const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response.data);
  }
};

// Login user
const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
};

// Get current user (cookie-based)
const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Get user failed:', error.response.data);
  }
};
```

### cURL Examples (cookie-based)

```bash
# Register user (Development)
curl -X POST http://localhost:5001/api/auth/register \

# Register user (Production)  
curl -X POST https://your-render-app.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe", 
    "email": "john@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }'

# Login user
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "identifier": "john@example.com",
    "password": "SecurePass123!"
  }'

# Get current user (using saved cookies)
curl -X GET http://localhost:5001/api/auth/me \
  -b cookies.txt

# Update profile
curl -X PUT http://localhost:5001/api/user/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com"
  }'
```

---

## Changelog

### Version 1.0.0
- Initial API release
- User registration and authentication
- JWT token management
- Profile management
- Admin endpoints
- Comprehensive security features

---

## Support

For technical support or questions about this API, please contact the development team or refer to the project documentation.
