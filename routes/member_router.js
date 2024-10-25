const express = require('express')
const router = express.Router();

const memberController = require('../controller/member_controller');

router.post('/join', memberController.createUser)
router.post('/login', memberController.loginUser)

module.exports = router;