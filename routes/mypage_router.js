const express = require('express');
const router = express.Router();

const myPageController = require('../controller/mypage_controller');

router.get('/:userId', myPageController.getUserById);

module.exports = router;