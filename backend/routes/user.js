const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { validatePasswordChange, validateProfileUpdate } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');
const userService = require('../services/userService');

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticate, asyncHandler(async (req, res) => {
  // Get user profile using service layer
  const user = await userService.getUserProfile(req.user._id);

  res.json({
    status: 'success',
    data: {
      user: user.toJSON()
    }
  });
}));

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticate, validateProfileUpdate, asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const userId = req.user._id;

  // Update user profile using service layer
  const user = await userService.updateUserProfile(userId, {
    firstName,
    lastName,
    email
  });

  res.json({
    status: 'success',
    message: 'Profile updated successfully',
    data: {
      user: user.toJSON()
    }
  });
}));

// @route   PUT /api/user/password
// @desc    Change user password
// @access  Private
router.put('/password', authenticate, validatePasswordChange, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  // Change user password using service layer
  await userService.changeUserPassword(userId, currentPassword, newPassword);

  res.json({
    status: 'success',
    message: 'Password changed successfully'
  });
}));

// @route   DELETE /api/user/account
// @desc    Delete user account (soft delete)
// @access  Private
router.delete('/account', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Delete user account using service layer
  await userService.deleteUserAccount(userId);

  // Clear authentication cookie (import tokenService at top)
  const tokenService = require('../services/tokenService');
  tokenService.clearAuthCookie(res);

  res.json({
    status: 'success',
    message: 'Account deactivated successfully'
  });
}));

// @route   GET /api/user/stats
// @desc    Get user statistics (admin only)
// @access  Private/Admin
router.get('/stats', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
  // Get user statistics using service layer
  const stats = await userService.getUserStats();

  res.json({
    status: 'success',
    data: {
      stats
    }
  });
}));

// @route   GET /api/user/all
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/all', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Get all users using service layer
  const result = await userService.getAllUsers(page, limit);

  res.json({
    status: 'success',
    data: result
  });
}));

module.exports = router;
