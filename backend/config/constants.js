/**
 * Application Constants
 * Centralized configuration and constants to improve DRY compliance
 */

module.exports = {
  // JWT Configuration
  JWT: {
    SECRET: process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key-change-in-production',
    EXPIRE: process.env.JWT_EXPIRE || '7d',
    ISSUER: 'wanderon-auth',
    AUDIENCE: 'wanderon-users'
  },

  // Cookie Configuration
  COOKIE: {
    NAME: 'authToken',
    EXPIRE_DAYS: parseInt(process.env.COOKIE_EXPIRE) || 7,
    OPTIONS: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    }
  },

  // Security Configuration
  SECURITY: {
    BCRYPT_ROUNDS: 12,
    MAX_LOGIN_ATTEMPTS: parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5,
    LOCKOUT_TIME_MINUTES: parseInt(process.env.LOCKOUT_TIME) || 15,
    RATE_LIMIT: {
      GENERAL: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100
      },
      AUTH: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5
      }
    }
  },

  // Database Configuration
  DATABASE: {
    MONGODB_URI: process.env.MONGODB_URI,
    CONNECTION_OPTIONS: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  // Application Configuration
  APP: {
    PORT: process.env.PORT || 5001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000'
  },

  // Response Messages
  MESSAGES: {
    SUCCESS: {
      REGISTER: 'User registered successfully',
      LOGIN: 'Login successful',
      LOGOUT: 'Logged out successfully',
      PROFILE_UPDATE: 'Profile updated successfully',
      PASSWORD_CHANGE: 'Password changed successfully',
      ACCOUNT_DELETE: 'Account deactivated successfully',
      TOKEN_REFRESH: 'Token refreshed successfully'
    },
    ERROR: {
      UNAUTHORIZED: 'Access denied. No token provided.',
      INVALID_TOKEN: 'Invalid token.',
      TOKEN_EXPIRED: 'Token expired.',
      USER_NOT_FOUND: 'User not found',
      INACTIVE_USER: 'Invalid token. User not found or inactive.',
      INVALID_CREDENTIALS: 'Invalid credentials',
      EMAIL_EXISTS: 'Email already exists. Please use another email.',
      USERNAME_EXISTS: 'Username already exists. Please use another username.',
      ACCOUNT_LOCKED: 'Account temporarily locked due to too many failed login attempts',
      CURRENT_PASSWORD_INCORRECT: 'Current password is incorrect',
      AUTHENTICATION_FAILED: 'Authentication failed.',
      INSUFFICIENT_PERMISSIONS: 'Insufficient permissions to access this resource.',
      VALIDATION_ERROR: 'Validation error',
      SERVER_ERROR: 'Internal server error'
    }
  },

  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500
  },

  // User Roles
  ROLES: {
    USER: 'user',
    ADMIN: 'admin'
  },

  // Validation Rules
  VALIDATION: {
    PASSWORD: {
      MIN_LENGTH: 8,
      MAX_LENGTH: 128,
      REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    },
    USERNAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 30,
      REGEX: /^[a-zA-Z0-9_]+$/,
      RESERVED: ['admin', 'root', 'user', 'guest', 'test', 'api', 'www', 'mail', 'support']
    },
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50,
      REGEX: /^[a-zA-Z\s]+$/
    },
    EMAIL: {
      MAX_LENGTH: 255
    }
  }
};
