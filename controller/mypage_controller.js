const mypageService = require('../services/mypage_service.js')

const getUserById = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const userInfo = await mypageService.getUserById(userId);
    if (!userInfo) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ userInfo })
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const userId = req.user.id
  const { profileImage } = req.body;

  try {
    await mypageService.updateProfile(userId, profileImage);
    res.status(200).json({ message: 'Profile updated successfully' })
  } catch (error) {
    console.log(error)
    next(error);
  }
}

const deleteLikeList = async (req, res, next) => {
  const userId = req.user.id;
  const cafeId = req.params.cafeId;

  try {
    await mypageService.deleteLikeList(userId, cafeId)
    res.status(200).json({ message: 'Delete Successfully' })

  } catch (error) {
    console.log(error)
    next(error);
  }
}

const uploadImage = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const imagePath = `http://localhost:10010/images/${req.file.filename}`;
    console.log(req.file.filename);
    await mypageService.saveImagePath(userId, imagePath);

    const response = { message: 'Image uploaded successfully', imagePath: imagePath };

    res.status(200).json(response);
    console.log(response)
  } catch (error) {
    console.error('Upload error', error)
    next(error);
  }
};

module.exports = { getUserById, updateProfile, deleteLikeList, uploadImage }