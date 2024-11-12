const express = require('express')
const router = express.Router()
const likeController = require('../controller/like_controller')
const authCheck = require('../middleware/authorization')

router.patch('/:cafeId', authCheck, likeController.likeController)

module.exports = router;