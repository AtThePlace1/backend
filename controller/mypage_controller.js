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
  const file = req.file;

  if (!file) {
	  return res.status(400).json({message: 'No file uploaded'});
  }
	try {
const imagePath = await mypageService.uploadImageToS3(userId, file);

await mypageService.saveImagePath(userId, imagePath);
    res.status(200).json({message: 'Image uploaded successfully'});
  } catch (error) {
    console.error('Upload error', error)
    next(error);
  }
};

module.exports = { getUserById, updateProfile, deleteLikeList, uploadImage }
