const express = require('express');
const router = express.Router();
const multer = require('multer');

const myPageController = require('../controller/mypage_controller');
const authCheck = require('../middleware/authorization')

router.get('', authCheck, myPageController.getUserById);
router.patch('/profile', authCheck, myPageController.updateProfile)
router.delete('/like/:cafeId', authCheck, myPageController.deleteLikeList)

const upload = multer({storage: multer.memoryStorage()});


router.patch('/upload', authCheck, upload.single('profileImage'), myPageController.uploadImage)


module.exports = router; 
