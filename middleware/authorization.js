const jwt = require('jsonwebtoken')
const memberDao = require('../models/member_dao')
const SECRETKEY = process.env.SECRETKEY

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access deneid. No token provided' });
  }

  try {
    const decoded = await jwt.verify(token, SECRETKEY);
    const findUser = await memberDao.findByEmail(decoded.email);

    if (!findUser) {
      return res.status(404).json({ error: 'No User' })
    }

    req.user = findUser;
    next();
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: 'Invalid or Expired Token' })
  }
};

module.exports = authMiddleware
