const mypageDao = require('../models/mypage_dao');
const AWS = require('aws-sdk')
const path = require('path')

const getUserById = async (userId) => {
  return await mypageDao.likeList(userId);
}

const updateProfile = async (userId, profileImage) => {
  return await mypageDao.updateUserProfile(userId, profileImage);
}

const deleteLikeList = async (userId, cafeId) => {
  return await mypageDao.deleteLikeList(userId, cafeId);
}

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: 'ap-northeast-2',
});

const s3 = new AWS.S3();


const uploadImageToS3 = async (userId, file) => {
	const fileName = `${Date.now()}-${path.basename(file.originalname)}`;
	console.log('File name with timestamp: ', fileName);

	const params = {
		Bucket: 'myattheplacebucket',
		Key: `images/${fileName}`,
		Body: file.buffer,
		ContentType: file.mimetype,
		ACL: 'public-read',
	};

	const data = await s3.upload(params).promise();
	const imagePath = data.Location;


	await saveImagePath(userId, imagePath);

	return imagePath;
};

const saveImagePath = async (userId, imagePath) => {
	await mypageDao.saveImagePath(userId, imagePath);
};

module.exports = { getUserById, updateProfile, deleteLikeList, uploadImageToS3, saveImagePath }
