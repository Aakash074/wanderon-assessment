const jwt = require('jsonwebtoken');
const User = require('../models/User');
const tokenService = require('../services/tokenService');
const authService = require('../services/authService');

// Middleware to authenticate JWT token
const authenticate = async (req, res, next) => {
  try {
    // Extract token using token service
    const token = tokenService.extractTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token using token service
    const decoded = tokenService.verifyToken(token);

    // Find active user using auth service
    const user = await authService.findActiveUser(decoded.userId);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token. User not found or inactive.'
      });
    }

    // Add user to request object
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (tokenService.isTokenInvalid(error)) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token.'
      });
    } else if (tokenService.isTokenExpired(error)) {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired.'
      });
    } else {
      console.error('Authentication error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Authentication failed.'
      });
    }
  }
};

// Middleware to authorize based on roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. Authentication required.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    let token = req.cookies.authToken;
    
    if (!token && req.header('Authorization')) {
      const authHeader = req.header('Authorization');
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (token) {
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key-change-in-production'
      );

      const user = await User.findById(decoded.userId);
      if (user && user.isActive) {
        req.user = user;
        req.token = token;
      }
    }
  } catch (error) {
    // Silently fail for optional auth
  }
  
  next();
};

module.exports = {
  authenticate,
  authorize,
  optionalAuth
};
