const express = require('express');
const router = express.Router();

const cafeController = require('../controller/cafe_controller');

router.get('/list', cafeController.getAllCafes);
router.get('/detail/:id', cafeController.getCafeById);
router.get('/filter', cafeController.getPreferences);

module.exports = router;