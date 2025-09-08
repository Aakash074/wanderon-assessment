# WanderOn Secure Authentication System

A comprehensive, production-ready authentication system built with the MERN stack, featuring enterprise-grade security, beautiful UI/UX, and modern development practices.

![WanderOn Auth](https://img.shields.io/badge/WanderOn-Auth%20System-blue?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Enterprise%20Grade-red?style=for-the-badge)

## 🌟 Features

### 🔐 Security Features
- **JWT Authentication** with secure HTTP-only cookies
- **Password Hashing** using bcrypt with salt rounds
- **Rate Limiting** to prevent brute force attacks
- **Input Validation & Sanitization** against XSS and injection attacks
- **CORS Protection** with configurable origins
- **Helmet.js** for security headers
- **Account Lockout** after failed login attempts
- **Password Strength Validation** with real-time feedback

### 🎨 User Experience
- **Beautiful, Modern UI** with WanderOn travel theme
- **Smooth Animations** using Framer Motion
- **Responsive Design** optimized for all devices
- **Smart Form Validation** with single state management
- **Real-time Input Validation** with animated error messages
- **Password Strength Indicator** with visual feedback
- **Loading States** and progress indicators
- **Toast Notifications** for user feedback
- **Accessibility** compliant design

### 🚀 Technical Excellence
- **Clean Architecture** with separation of concerns
- **Error Handling** with custom error classes
- **Input Validation** on both client and server
- **Database Optimization** with proper indexing
- **Environment Configuration** for different deployment stages
- **RESTful API** design with consistent responses

## 🏗️ Architecture

### Backend Structure
```
backend/
├── models/
│   └── User.js              # User schema with validation
├── routes/
│   ├── auth.js              # Authentication routes
│   └── user.js              # User management routes
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── errorHandler.js      # Global error handling
│   └── validation.js        # Input validation rules
└── server.js                # Express server configuration
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Route components
│   ├── contexts/            # React context providers
│   ├── services/            # API service layer
│   └── styles/              # Tailwind CSS configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Copy the development example file
   cp env.development.example .env
   
   # Or create .env manually with the following variables:
   NODE_ENV=development
   PORT=5001
   MONGODB_URI=mongodb+srv://admin:kitkat123@cluster0.vyohmg4.mongodb.net/secure-auth?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secure-jwt-secret-key-change-in-production
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7
   MAX_LOGIN_ATTEMPTS=5
   LOCKOUT_TIME=15
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file (optional)**
   ```bash
   # Copy the development example file
   cp env.development.example .env
   
   # The default configuration should work for local development
   # REACT_APP_API_URL=http://localhost:5001/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "john@example.com", // email or username
  "password": "SecurePass123!"
}
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Check Authentication Status
```http
GET /api/auth/check
```

### User Management Endpoints

#### Get User Profile
```http
GET /api/user/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

#### Change Password
```http
PUT /api/user/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!",
  "confirmNewPassword": "NewPass123!"
}
```

## 🔒 Security Implementation

### Password Security
- **Bcrypt hashing** with 12 salt rounds
- **Password complexity requirements**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character

### JWT Security
- **HTTP-only cookies** prevent XSS attacks
- **Secure flag** for HTTPS environments
- **SameSite policy** for CSRF protection
- **Token expiration** with configurable duration
- **Token refresh** mechanism

### Rate Limiting
- **General API**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes
- **Account lockout**: After 5 failed attempts for 15 minutes

### Input Validation
- **Server-side validation** using express-validator
- **Client-side validation** using react-hook-form
- **Data sanitization** against NoSQL injection
- **XSS protection** with input sanitization

## 🎯 Smart Form Validation System

### Features
- **Single State Management**: All form fields managed in one centralized state
- **Real-time Validation**: Fields validated as users type with smart error display
- **Password Strength Indicator**: Visual feedback with requirements checklist
- **Animated Error Messages**: Smooth transitions for better UX
- **Reusable Components**: Consistent validation across all forms

### Validation Rules
- **Registration**: Name validation, username rules, email format, password strength
- **Login**: Identifier validation, password requirements
- **Profile Update**: Field validation with duplicate checking
- **Password Change**: Current password verification, new password strength

For detailed documentation, see [VALIDATION_SYSTEM.md](VALIDATION_SYSTEM.md)

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades (#0ea5e9 to #0c4a6e)
- **Accent**: Orange shades (#f97316 to #7c2d12)
- **Success**: Green shades (#22c55e to #14532d)
- **Danger**: Red shades (#ef4444 to #7f1d1d)

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)

### Components
- **Cards**: Soft shadows with rounded corners
- **Buttons**: Multiple variants with hover states
- **Forms**: Consistent styling with error states
- **Animations**: Smooth transitions and micro-interactions

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Update CORS origins for your domain
3. Use a process manager like PM2
4. Set up SSL certificates
5. Configure reverse proxy (Nginx)

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to a static hosting service (Netlify, Vercel, etc.)
3. Configure environment variables
4. Set up custom domain and SSL

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience
- **Tablet**: Adapted layouts and touch-friendly interactions
- **Mobile**: Optimized forms and navigation

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_TIME=15
CLIENT_URL=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5001/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **WanderOn** for the opportunity to build this authentication system
- **MongoDB** for the database solution
- **Express.js** for the robust backend framework
- **React** for the powerful frontend library
- **Node.js** for the runtime environment

## 🚀 Deployment

This system is designed for deployment on modern cloud platforms:

### **Production Stack**
- **Frontend**: Netlify (Static hosting with global CDN)
- **Backend**: Render (Cloud hosting with auto-deploy)
- **Database**: MongoDB Atlas (Cloud database)

### **Quick Deploy**
1. **Backend**: Deploy to Render with one-click GitHub integration
2. **Frontend**: Deploy to Netlify with automatic build optimization
3. **Database**: Already configured with MongoDB Atlas

📖 **See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.**

## ⚙️ Environment Configuration

The system includes example environment files for different deployment scenarios:

### **Backend Environment Files**
- `env.development.example` - Local development configuration
- `env.production.example` - Production deployment configuration

### **Frontend Environment Files**  
- `env.development.example` - Local development configuration
- `env.production.example` - Production deployment configuration

### **Setup Instructions**
```bash
# For local development
cp env.development.example .env

# For production deployment
cp env.production.example .env
# Then update with your actual values
```

## 📚 Documentation

- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference
- **[Architecture Guide](./ARCHITECTURE.md)** - System architecture and design patterns
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[Validation System](./VALIDATION_SYSTEM.md)** - Input validation documentation

## 📞 Support

For support, email support@wanderon.com or create an issue in this repository.

---

**Built with ❤️ for WanderOn - Production Ready Authentication System** 🚀
