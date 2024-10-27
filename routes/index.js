const express = require('express');
const router = express.Router();

const memberRouter = require('./member_router');
const cafeRouter = require('./cafe_router')
const likeRouter = require('./like_router')

router.get('/ping', (_, res) => { res.send('pong') });

router.use('/member', memberRouter);
router.use('/cafe', cafeRouter);
router.use('/like', likeRouter);

module.exports = router;