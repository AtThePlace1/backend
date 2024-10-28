const mypageDao = require('../models/mypage_dao');

const getUserById = async (userId) => {
  return await mypageDao.likeList(userId);
}

module.exports = { getUserById }