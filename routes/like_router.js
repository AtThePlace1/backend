const express = require('express')
const router = express.Router()
const likeController = require('../controller/like_controller')

router.patch('/:userId/:cafeId', likeController.likeController)

module.exports = router;