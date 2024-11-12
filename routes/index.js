const express = require('express');
const router = express.Router();

const memberRouter = require('./member_router');
const cafeRouter = require('./cafe_router')
const likeRouter = require('./like_router')
const mypageRouter = require('./mypage_router')

router.get('/', (req, res) => { res.send('hello world!')});
router.get('/ping', (_, res) => { res.send('pong') });

router.use('/member', memberRouter);
router.use('/cafe', cafeRouter);
router.use('/like', likeRouter);
router.use('/mypage', mypageRouter)

module.exports = router;
