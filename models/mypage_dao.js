const myDataSource = require('../models/init');

const findUserById = async (userId) => {
  const [userInfo] = await myDataSource.query(`
    SELECT * FROM users WHERE id = ?`, [userId])
  return userInfo;
}

module.exports = { findUserById }