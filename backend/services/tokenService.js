/**
 * Token Service
 * Handles JWT token operations and cookie management
 * Centralizes token-related functionality
 */

const jwt = require('jsonwebtoken');
const { JWT, COOKIE } = require('../config/constants');

class TokenService {
  /**
   * Get cookie options for authentication tokens
   * @returns {Object} Cookie configuration object
   */
  getCookieOptions() {
    // Dynamically set SameSite/Secure based on frontend protocol
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    const isHttpsClient = clientUrl.startsWith('https://');
    // For cross-site cookies over HTTPS we must use SameSite=None; Secure
    const sameSite = isHttpsClient ? 'none' : 'lax';
    const secure = isHttpsClient || process.env.NODE_ENV === 'production';

    // Session cookie: omit maxAge so cookie expires on browser close
    return {
      ...COOKIE.OPTIONS,
      sameSite,
      secure,
    };
  }

  /**
   * Extract token from request (cookie or Authorization header)
   * @param {Object} req - Express request object
   * @returns {string|null} JWT token or null
   */
  extractTokenFromRequest(req) {
    // Try to get token from cookie first
    let token = req.cookies[COOKIE.NAME];
    
    // Fallback to Authorization header
    if (!token && req.header('Authorization')) {
      const authHeader = req.header('Authorization');
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    return token;
  }

  /**
   * Verify JWT token
   * @param {string} token - JWT token to verify
   * @returns {Object} Decoded token payload
   * @throws {Error} If token is invalid or expired
   */
  verifyToken(token) {
    return jwt.verify(token, JWT.SECRET);
  }

  /**
   * Set authentication cookie on response
   * @param {Object} res - Express response object
   * @param {string} token - JWT token to set
   */
  setAuthCookie(res, token) {
    res.cookie(COOKIE.NAME, token, this.getCookieOptions());
  }

  /**
   * Clear authentication cookie
   * @param {Object} res - Express response object
   */
  clearAuthCookie(res) {
    // Must match options used when setting the cookie to clear properly
    res.clearCookie(COOKIE.NAME, this.getCookieOptions());
  }

  /**
   * Generate JWT token for user
   * @param {Object} user - User object
   * @returns {string} JWT token
   */
  generateTokenForUser(user) {
    return jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role 
      },
      JWT.SECRET,
      { 
        expiresIn: JWT.EXPIRE,
        issuer: JWT.ISSUER,
        audience: JWT.AUDIENCE
      }
    );
  }

  /**
   * Check if token error is due to expiration
   * @param {Error} error - JWT error
   * @returns {boolean} True if token is expired
   */
  isTokenExpired(error) {
    return error.name === 'TokenExpiredError';
  }

  /**
   * Check if token error is due to invalid token
   * @param {Error} error - JWT error
   * @returns {boolean} True if token is invalid
   */
  isTokenInvalid(error) {
    return error.name === 'JsonWebTokenError';
  }
}

module.exports = new TokenService();
