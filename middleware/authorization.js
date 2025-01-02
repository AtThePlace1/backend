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
    console.error("Error in authentication middleWare: ", error);
    return res.status(500).json({ message: 'Invalid Server Error' })
  }
};

module.exports = authMiddleware
