const myDataSource = require('./init');

const getAllCafes = async () => {
  return await myDataSource.query(`
    SELECT * FROM cafes`);
}

const getCafeById = async (id) => {
  return await myDataSource.query(`
    SELECT * FROM cafes
    WHERE cafes.id = ?`, [id])
}

module.exports = { getAllCafes, getCafeById }