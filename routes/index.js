const express = require('express');
const router = express.Router();

const cafeRouter = require('./cafe_router')

router.get('/ping', (_, res) => { res.send('pong') });

router.use('/cafe', cafeRouter);

module.exports = router;