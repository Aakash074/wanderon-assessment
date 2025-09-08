const express = require('express');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const authService = require('../services/authService');
const tokenService = require('../services/tokenService');

const router = express.Router();

// Cookie options are now handled by tokenService

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegistration, asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Register user using service layer
  const user = await authService.registerUser({
    firstName,
    lastName,
    username,
    email,
    password
  });

  // Generate JWT token
  const token = authService.generateToken(user);

  // Set authentication cookie
  tokenService.setAuthCookie(res, token);

  // Prepare user response
  const userResponse = authService.prepareUserResponse(user);

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: {
      user: userResponse,
      token
    }
  });
}));

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  // Authenticate user using service layer
  const user = await authService.loginUser(identifier, password);

  // Generate JWT token
  const token = authService.generateToken(user);

  // Set authentication cookie
  tokenService.setAuthCookie(res, token);

  // Prepare user response
  const userResponse = authService.prepareUserResponse(user);

  res.json({
    status: 'success',
    message: 'Login successful',
    data: {
      user: userResponse,
      token
    }
  });
}));

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', authenticate, asyncHandler(async (req, res) => {
  // Clear authentication cookie using token service
  tokenService.clearAuthCookie(res);

  res.json({
    status: 'success',
    message: 'Logged out successfully'
  });
}));

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  // User is already available from authenticate middleware
  const userResponse = authService.prepareUserResponse(req.user);

  res.json({
    status: 'success',
    data: {
      user: userResponse
    }
  });
}));

// @route   POST /api/auth/refresh
// @desc    Refresh auth token
// @access  Private
router.post('/refresh', authenticate, asyncHandler(async (req, res) => {
  const user = req.user;

  // Generate new JWT token
  const token = authService.generateToken(user);

  // Set new authentication cookie
  tokenService.setAuthCookie(res, token);

  res.json({
    status: 'success',
    message: 'Token refreshed successfully',
    data: {
      token
    }
  });
}));

// @route   GET /api/auth/check
// @desc    Check authentication status
// @access  Public
router.get('/check', asyncHandler(async (req, res) => {
  // Extract token using token service
  const token = tokenService.extractTokenFromRequest(req);

  if (!token) {
    return res.json({
      status: 'success',
      data: {
        authenticated: false,
        user: null
      }
    });
  }

  try {
    // Verify token using token service
    const decoded = tokenService.verifyToken(token);

    // Find active user using auth service
    const user = await authService.findActiveUser(decoded.userId);
    
    if (!user) {
      return res.json({
        status: 'success',
        data: {
          authenticated: false,
          user: null
        }
      });
    }

    // Prepare user response
    const userResponse = authService.prepareUserResponse(user);

    res.json({
      status: 'success',
      data: {
        authenticated: true,
        user: userResponse
      }
    });
  } catch (error) {
    res.json({
      status: 'success',
      data: {
        authenticated: false,
        user: null
      }
    });
  }
}));

module.exports = router;
