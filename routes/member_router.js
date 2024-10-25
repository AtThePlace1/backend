const express = require('express')
const router = express.Router();

const memberController = require('../controllers/member_controller');

router.post('/join', memberController.createUser)

module.exports = router;