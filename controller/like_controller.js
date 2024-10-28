const likeService = require('../services/like_service');

const likeController = async (req, res) => {
  const userId = req.user.id
  const { cafeId } = req.params;

  try {
    const result = await likeService.toggleLike(userId, cafeId);
    if (result === 'liked') {
      res.status(200).json({ message: 'Liked successfully', result });
    } else if (result === 'unliked') {
      res.status(200).json({ message: 'Like removed successfully', result });
    }
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal  Server Error' })
  }
}

module.exports = { likeController }