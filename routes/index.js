const express = require('express');
const router = express.Router();

const memberRouter = require('./member_router');

router.get('/ping', (_, res) => { res.send('pong') });

router.use('/member', memberRouter);

module.exports = router;