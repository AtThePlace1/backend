const memberService = require('../services/member_services')

const createUser = async (req, res) => {
  const { email, nickname, password, profile_image } = req.body;

  try {
    const newUser = await memberService.createUser({ email, nickname, password });
    res.status(201).json({ message: 'User registered successful', user: newUser })
  } catch (error) {
    console.log(error)
    // const statusCode = error.statusCode || 500;
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' })
  }
}

module.exports = { createUser }