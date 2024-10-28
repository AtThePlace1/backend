const mypageService = require('../services/mypage_service.js')

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const userInfo = await mypageService.getUserById(userId);
    if (!userInfo) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User information retrieved successfully', userInfo })
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' })
  }
}

module.exports = { getUserById }