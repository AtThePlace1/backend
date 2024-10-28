const express = require('express');
const router = express.Router();

const myPageController = require('../controller/mypage_controller');
const authCheck = require('../middleware/authorization')

router.get('', authCheck, myPageController.getUserById);
router.patch('/profile', authCheck, myPageController.updateProfile)

module.exports = router;