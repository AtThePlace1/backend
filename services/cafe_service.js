const cafeDao = require('../models/cafe_dao')

const getAllCafes = async () => {
  return await cafeDao.getAllCafes();
}

const getCafeById = async (id) => {
  return await cafeDao.getCafeById(id);
}

module.exports = { getAllCafes, getCafeById }