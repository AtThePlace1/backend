const myDataSource = require('./init');

const isAlreadyLiked = async (userId, cafeId) => {
  return await myDataSource.query(`
    SELECT * FROM likes
    WHERE user_id = ? AND cafe_id = ?`, [userId, cafeId])
}

const insertLike = async (userId, cafeId) => {
  return await myDataSource.query(`
    INSERT INTO likes (user_id, cafe_id)
    VALUES (?, ?)`, [userId, cafeId]);
}

const deleteLike = async (userId, cafeId) => {
  return await myDataSource.query(`
    DELETE FROM likes
    WHERE user_id = ? AND cafe_id = ?`, [userId, cafeId])
}

module.exports = { isAlreadyLiked, insertLike, deleteLike }