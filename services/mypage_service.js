const mypageDao = require('../models/mypage_dao');

const getUserById = async (userId) => {
  return await mypageDao.likeList(userId);
}

const updateProfile = async (userId, profileImage) => {
  return await mypageDao.updateUserProfile(userId, profileImage)
}

module.exports = { getUserById, updateProfile }