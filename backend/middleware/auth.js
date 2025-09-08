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

// Removed optionalAuth: not used

module.exports = {
  authenticate,
  authorize
};
