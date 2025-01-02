const memberService = require('../services/member_services')

const createUser = async (req, res, next) => {
  const { email, nickname, password, profile_image } = req.body;

  try {
    const newUser = await memberService.createUser({ email, nickname, password, profile_image });
    res.status(201).json({ message: 'User registered successful', user: newUser })
  } catch (error) {
    console.error('Error in createUser:',error.message || error);
    return next(error);
  }
}
const kakaoLogIn = async (req, res, next) => {
	const { authCode } = req.body;

	if (!authCode) {
		return res.status(400).json({message : 'Authorization code is missing' });
	}
	try {
		const tokendata = await memberService.kakaoLogIn(authCode);
		res.status(tokendata.status).json(tokendata.data);
	} catch(error) {
		console.error('Error in kakaoLogIn:', error.message ||error);
		return next(error)
	}
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await memberService.loginUser({ email, password });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in loginUser:', error.message||error);
    return next(error);
  }
}

module.exports = { createUser,kakaoLogIn, loginUser }
