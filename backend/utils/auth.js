const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user ? { id: user.id, email: user.email, fullName: user.fullName } : null;
  } catch (err) {
    return null;
  }
};

module.exports = authMiddleware;
