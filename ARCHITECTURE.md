# WanderOn Authentication System - Architecture Documentation

## System Overview

The WanderOn Authentication System is a production-ready, secure user authentication solution built using the MERN stack (MongoDB, Express.js, React, Node.js). The system follows modern architectural patterns and implements enterprise-grade security measures.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  React Frontend (Port 3000)                                    │
│  ├── Components (UI Components)                                 │
│  ├── Pages (Route Components)                                   │
│  ├── Contexts (State Management)                                │
│  ├── Hooks (Custom Logic)                                       │
│  └── Services (API Communication)                               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTP/HTTPS
                                │ (withCredentials: true)
                                │
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│  Express.js Server (Port 5001)                                 │
│  ├── Middleware Stack                                           │
│  │   ├── CORS (Cross-Origin Resource Sharing)                  │
│  │   ├── Helmet (Security Headers)                             │
│  │   ├── Rate Limiting (DDoS Protection)                       │
│  │   ├── Body Parsing (JSON/URL Encoded)                       │
│  │   ├── Cookie Parser (JWT Cookie Handling)                   │
│  │   └── Static File Serving                                   │
│  └── Error Handling (Global Error Handler)                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
┌─────────────────────────────────────────────────────────────────┐
│                       ROUTING LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Route Handlers                                                │
│  ├── /api/auth/* (Authentication Routes)                       │
│  │   ├── POST /register (User Registration)                    │
│  │   ├── POST /login (User Login)                              │
│  │   ├── POST /logout (User Logout)                            │
│  │   ├── GET /me (Current User)                                │
│  │   ├── POST /refresh (Token Refresh)                         │
│  │   └── GET /check (Auth Status Check)                        │
│  └── /api/user/* (User Management Routes)                      │
│      ├── GET /profile (Get Profile)                            │
│      ├── PUT /profile (Update Profile)                         │
│      ├── PUT /password (Change Password)                       │
│      ├── DELETE /account (Delete Account)                      │
│      ├── GET /stats (Admin: User Stats)                        │
│      └── GET /all (Admin: All Users)                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
┌─────────────────────────────────────────────────────────────────┐
│                     MIDDLEWARE LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  Security & Validation Middleware                              │
│  ├── Authentication Middleware                                 │
│  │   ├── JWT Token Verification                                │
│  │   ├── User Session Validation                               │
│  │   └── Cookie-based Auth                                     │
│  ├── Authorization Middleware                                  │
│  │   ├── Role-based Access Control                             │
│  │   └── Permission Checking                                   │
│  ├── Validation Middleware                                     │
│  │   ├── Input Sanitization                                    │
│  │   ├── Schema Validation                                     │
│  │   └── Error Handling                                        │
│  └── Rate Limiting Middleware                                  │
│      ├── General API Rate Limiting                             │
│      └── Auth-specific Rate Limiting                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Business Logic Services                                       │
│  ├── AuthService                                               │
│  │   ├── User Registration Logic                               │
│  │   ├── User Authentication Logic                             │
│  │   ├── Token Generation                                      │
│  │   └── User Validation                                       │
│  ├── UserService                                               │
│  │   ├── Profile Management                                    │
│  │   ├── Password Management                                   │
│  │   ├── Account Management                                    │
│  │   └── Admin Operations                                      │
│  └── TokenService                                              │
│      ├── JWT Operations                                        │
│      ├── Cookie Management                                     │
│      ├── Token Validation                                      │
│      └── Token Refresh Logic                                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  Data Access Layer                                             │
│  ├── Mongoose ODM                                              │
│  │   ├── Schema Definition                                     │
│  │   ├── Model Validation                                      │
│  │   ├── Pre/Post Hooks                                        │
│  │   └── Virtual Properties                                    │
│  └── User Model                                                │
│      ├── User Schema                                           │
│      ├── Password Hashing                                      │
│      ├── Login Attempt Tracking                                │
│      └── Account Lockout Logic                                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
┌─────────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  MongoDB Atlas                                                 │
│  ├── User Collection                                           │
│  │   ├── User Documents                                        │
│  │   ├── Indexes (email, username)                            │
│  │   └── Indexes as required for users                        │
│  ├── Connection Management                                     │
│  │   ├── Connection Pooling                                    │
│  │   ├── Retry Logic                                           │
│  │   └── Health Monitoring                                     │
│  └── Security Features                                         │
│      ├── Authentication                                        │
│      ├── Authorization                                         │
│      ├── Encryption at Rest                                    │
│      └── Network Security                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Design Patterns

### 1. Layered Architecture
The system follows a strict layered architecture pattern:
- **Presentation Layer**: React frontend components
- **API Layer**: Express.js routes and middleware
- **Service Layer**: Business logic encapsulation
- **Data Access Layer**: Mongoose models and schemas
- **Database Layer**: MongoDB storage

### 2. Repository Pattern (via Mongoose)
Data access is abstracted through Mongoose models, providing a clean interface for database operations.

### 3. Service Layer Pattern
Business logic is encapsulated in dedicated service classes:
- `AuthService`: Authentication-related operations
- `UserService`: User management operations
- `TokenService`: JWT and cookie operations

### 4. Middleware Pattern
Cross-cutting concerns are handled through Express middleware:
- Authentication
- Authorization
- Validation
- Rate limiting
- Error handling

### 5. Factory Pattern
Configuration objects are created through factory functions for consistency.

## Security Architecture

### Authentication Flow
```
1. User submits credentials
2. Server validates credentials
3. Password verified using bcrypt
4. JWT token generated with user claims
5. Token stored in HTTP-only cookie
6. Subsequent requests include cookie automatically
7. Middleware validates token on protected routes
```

### Authorization Flow
```
1. JWT token extracted from cookie/header
2. Token signature verified
3. Token expiration checked
4. User retrieved from database
5. User role and permissions checked
6. Access granted/denied based on role
```

### Security Layers

#### 1. Transport Security
- HTTPS enforcement in production
- Cookie policy is dynamic:
  - Production / HTTPS client: `SameSite=None; Secure`
  - Local HTTP client: `SameSite=Lax` (no `Secure`)

#### 2. Authentication Security
- JWT tokens with expiration
- HTTP-only cookies (XSS protection)
- Dynamic Secure/SameSite as above
- Token refresh endpoint (no refresh token store)

#### 3. Authorization Security
- Role-based access control (RBAC)
- Route-level permissions
- Admin-only endpoints

#### 4. Input Security
- Server-side validation
- Input sanitization
- NoSQL injection prevention
- XSS protection

#### 5. Rate Limiting
- General API rate limiting
- Authentication-specific limits
- Account lockout mechanisms

#### 6. Password Security
- Bcrypt hashing (12 rounds)
- Password complexity requirements
- Account lockout after failed attempts

## Data Flow

### User Registration Flow
```
Frontend → API Route → Validation Middleware → AuthService → 
UserService → User Model → MongoDB → Response Chain
```

### User Authentication Flow
```
Frontend → API Route → Validation Middleware → AuthService → 
User Model → Password Verification → JWT Generation → 
Cookie Setting → Response
```

### Protected Route Access Flow
```
Frontend Request → Auth Middleware → Token Extraction → 
Token Verification → User Lookup → Authorization Check → 
Route Handler → Service Layer → Database → Response
```

## Component Architecture

### Backend Components

#### 1. Server (server.js)
- Application entry point
- Middleware configuration
- Route mounting
- Database connection
- Error handling setup

#### 2. Routes
- **Auth Routes**: Authentication endpoints
- **User Routes**: User management endpoints
- Route-specific middleware application

#### 3. Middleware
- **Authentication**: JWT token verification
- **Authorization**: Role-based access control
- **Validation**: Input validation and sanitization
- **Error Handling**: Centralized error processing

#### 4. Services
- **AuthService**: Authentication business logic
- **UserService**: User management business logic
- **TokenService**: JWT and cookie operations

#### 5. Models
- **User Model**: User schema and methods
- Password hashing hooks
- Validation rules
- Virtual properties

#### 6. Configuration
- **Constants**: Application-wide constants
- **Database**: Connection configuration
- **Environment**: Environment-specific settings

### Frontend Components

#### 1. Application Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route-specific pages
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API communication
└── utils/              # Utility functions
```

#### 2. State Management
- **AuthContext**: Global authentication state
- **useFormValidation**: Form state management
- Local component state for UI interactions

#### 3. API Communication
- **authService**: Authentication API calls
- Axios configuration with interceptors
- Cookie-based authentication

## Scalability Considerations

### Horizontal Scaling
- Stateless server design
- JWT tokens eliminate server-side sessions
- MongoDB Atlas auto-scaling
- Load balancer ready

### Performance Optimizations
- Database indexing on frequently queried fields
- Connection pooling
- Response caching strategies
- Optimized queries

### Monitoring and Logging
- Error logging and tracking
- Performance monitoring
- Security event logging
- Health check endpoints

## Security Best Practices Implemented

### 1. Authentication Security
- ✅ Strong password requirements
- ✅ Password hashing with bcrypt
- ✅ JWT tokens with expiration
- ✅ HTTP-only cookies
- ✅ Secure cookie flags

### 2. Authorization Security
- ✅ Role-based access control
- ✅ Route-level permissions
- ✅ Admin endpoint protection

### 3. Input Validation
- ✅ Server-side validation
- ✅ Input sanitization
- ✅ XSS protection
- ✅ NoSQL injection prevention

### 4. Rate Limiting
- ✅ API rate limiting
- ✅ Authentication rate limiting
- ✅ Account lockout mechanisms

### 5. Error Handling
- ✅ Consistent error responses
- ✅ No sensitive data in errors
- ✅ Proper HTTP status codes

## Development Guidelines

### Code Organization
- Clear separation of concerns
- Service layer for business logic
- Consistent error handling
- Comprehensive input validation

### Testing Strategy
- Unit tests for services
- Integration tests for API endpoints
- Frontend component testing
- Security testing

### Documentation
- API documentation
- Code comments
- Architecture documentation
- Deployment guides

## Deployment Architecture

### Development Environment
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5001`
- Database: MongoDB Atlas

### Production Environment
- Frontend: Netlify (Static hosting with CDN)
- Backend: Render (Cloud hosting with auto-deploy)
- Database: MongoDB Atlas
- SSL: Automatic (Netlify & Render provide SSL certificates)
- CDN: Built-in (Netlify global CDN)

### Environment Variables
```
# Database
MONGODB_URI=mongodb+srv://...

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Cookie Configuration
COOKIE_EXPIRE=7

# Security
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_TIME=15

# Application
PORT=5001
NODE_ENV=production
CLIENT_URL=https://your-domain.com
```

This architecture provides a solid foundation for a scalable, secure, and maintainable authentication system suitable for production use.
