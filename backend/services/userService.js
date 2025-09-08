/**
 * User Service
 * Handles all user-related business logic
 * Separates business logic from route handlers
 */

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { AppError } = require('../middleware/errorHandler');

class UserService {
  /**
   * Get user profile by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User profile
   */
  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updateData - Profile update data
   * @returns {Promise<Object>} Updated user object
   */
  async updateUserProfile(userId, updateData) {
    const { firstName, lastName, email } = updateData;

    // Check if email is being changed and is unique
    if (email) {
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: userId }
      });

      if (existingUser) {
        throw new AppError('Email already exists. Please use another email.', 400);
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email: email.toLowerCase() }),
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }

    return updatedUser;
  }

  /**
   * Change user password
   * @param {string} userId - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<void>}
   */
  async changeUserPassword(userId, currentPassword, newPassword) {
    // Get user with password
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Verify current password without relying on instance methods
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();
  }

  /**
   * Delete user account
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  async deleteUserAccount(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Soft delete by deactivating account
    user.isActive = false;
    user.updatedAt = new Date();
    await user.save();
  }

  /**
   * Get user statistics (admin only)
   * @returns {Promise<Object>} User statistics
   */
  async getUserStats() {
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalInactiveUsers = await User.countDocuments({ isActive: false });
    const recentUsers = await User.find(
      { isActive: true }, 
      { firstName: 1, lastName: 1, email: 1, createdAt: 1 }
    )
    .sort({ createdAt: -1 })
    .limit(10);

    return {
      totalActiveUsers: totalUsers,
      totalInactiveUsers,
      recentUsers,
      totalUsers: totalUsers + totalInactiveUsers
    };
  }

  /**
   * Get all users with pagination (admin only)
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated users
   */
  async getAllUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const users = await User.find(
      { isActive: true }, 
      { firstName: 1, lastName: 1, email: 1, username: 1, role: 1, createdAt: 1, lastLogin: 1 }
    )
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const totalUsers = await User.countDocuments({ isActive: true });
    const totalPages = Math.ceil(totalUsers / limit);

    return {
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null
   */
  // Removed unused method: findUserByEmail

  /**
   * Find user by username
   * @param {string} username - Username
   * @returns {Promise<Object|null>} User object or null
   */
  // Removed unused method: findUserByUsername
}

module.exports = new UserService();
