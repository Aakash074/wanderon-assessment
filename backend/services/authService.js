/**
 * Authentication Service
 * Handles all authentication-related business logic
 * Separates business logic from route handlers
 */

const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');

class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user object
   */
  async registerUser(userData) {
    const { firstName, lastName, username, email, password } = userData;

    // Check if user already exists
    await this.validateUserUniqueness(email, username);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password
    });
    
    await user.save();
    return user;
  }

  /**
   * Authenticate user login
   * @param {string} identifier - Email or username
   * @param {string} password - User password
   * @returns {Promise<Object>} Authenticated user object
   */
  async loginUser(identifier, password) {
    const user = await User.findByCredentials(identifier, password);
    return user;
  }

  /**
   * Validate user uniqueness for registration
   * @param {string} email - User email
   * @param {string} username - User username
   * @throws {AppError} If user already exists
   */
  async validateUserUniqueness(email, username) {
    // Check email uniqueness
    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      throw new AppError('Email already exists. Please use another email.', 400);
    }

    // Check username uniqueness
    const existingUsername = await User.findOne({
      username: username
    });

    if (existingUsername) {
      throw new AppError('Username already exists. Please use another username.', 400);
    }
  }

  /**
   * Check if user exists and is active
   * @param {string} userId - User ID
   * @returns {Promise<Object|null>} User object or null
   */
  async findActiveUser(userId) {
    const user = await User.findById(userId);
    if (!user || !user.isActive) {
      return null;
    }
    return user;
  }

  /**
   * Generate authentication token for user
   * @param {Object} user - User object
   * @returns {string} JWT token
   */
  generateToken(user) {
    return user.generateAuthToken();
  }

  /**
   * Prepare user response (remove sensitive data)
   * @param {Object} user - User object
   * @returns {Object} Sanitized user object
   */
  prepareUserResponse(user) {
    return user.toJSON();
  }
}

module.exports = new AuthService();
