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
	  if(!SECRETKEY) {
		  throw new Error ('SECRETKEY 환경 변수가 설정되지 않음');
	  }
    const decoded = jwt.verify(token, SECRETKEY);

	  
	  if(decoded.email) {
	  const findUser = await memberDao.findByEmail(decoded.email);

    if (!findUser) {
      return res.status(404).json({ error: 'No User' })
    }

    req.user = findUser;}

	  else if (decoded.kakaoId) {
		  const findKakaoUser = await memberDao.getUserByKakaoId(decoded.kakaoId);

		  if(!findKakaoUser) {
			  return res.status(404).json({error:'No User' });
		  }
		  req.user = findKakaoUser;
	  }
	  else{
		  return res.status(403).json({error:'Invalid token : missing email or kakaoId'});
	  }
    next();
  } catch (error) {
	  console.error('Error in authMiddleware:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token. Access denied.' });
    }

    return res.status(500).json({ message: 'Invalid Server Error' })
  }
};

module.exports = authMiddleware
