const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
//const upload = multer({dset:'public/images'});

const myPageController = require('../controller/mypage_controller');
const authCheck = require('../middleware/authorization')

router.get('', authCheck, myPageController.getUserById);
router.patch('/profile', authCheck, myPageController.updateProfile)
router.delete('/like/:cafeId', authCheck, myPageController.deleteLikeList)

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, path.join(__dirname, '../public/images/')) },
  filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname) },
});

const upload = multer({ storage: storage })

router.patch('/upload', authCheck, upload.single('profileImage'), myPageController.uploadImage)


module.exports = router; 