const mypageDao = require('../models/mypage_dao');

const getUserById = async (userId) => {
  return await mypageDao.findUserById(userId);
}

module.exports = { getUserById }