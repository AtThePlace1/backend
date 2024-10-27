const likeDao = require('../models/like_dao');

const toggleLike = async (userId, cafeId) => {
  const alreadyLiked = await likeDao.isAlreadyLiked(userId, cafeId);

  if (alreadyLiked.length > 0) {
    await likeDao.deleteLike(userId, cafeId);
    return 'unliked';
  } else {
    await likeDao.insertLike(userId, cafeId);
    return 'liked'
  }
}

module.exports = { toggleLike }