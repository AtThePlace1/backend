const memberService = require('../services/member_services')

const createUser = async (req, res, next) => {
  const { email, nickname, password, profile_image } = req.body;

  try {
    const newUser = await memberService.createUser({ email, nickname, password, profile_image });
    res.status(201).json({ message: 'User registered successful', user: newUser })
  } catch (error) {
    console.log(error)
    next(error);
  }
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await memberService.loginUser({ email, password });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error)
    next(error);
  }
}

module.exports = { createUser, loginUser }
