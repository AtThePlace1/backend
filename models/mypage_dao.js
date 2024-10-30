const myDataSource = require('../models/init');

const findUserById = async (userId) => {
  const [userInfo] = await myDataSource.query(`
    SELECT * FROM users WHERE id = ?`, [userId])
  return userInfo;
}

const likeList = async (userId) => {
  return await myDataSource.query(`
    SELECT users.profile_image, users.nickname,
    JSON_ARRAYAGG(
    JSON_OBJECT(
    'cafe_id', cafes.id,
    'cafe_name', cafes.cafe_name,
    'opening_hours', cafes.opening_hours,
    'loacation_address', cafes.location_address,
    'contact_number', cafes.contact_number
  )) AS likeList
    FROM users
    LEFT JOIN likes ON users.id = likes.user_id
    LEFT JOIN cafes ON cafes.id = likes.cafe_id
    WHERE users.id = ?`, [userId])
}

const updateUserProfile = async (userId, profileImage) => {
  return await myDataSource.query(`
    UPDATE users
    SET profile_image = ?
    WHERE id = ?`, [profileImage, userId])
}

const deleteLikeList = async (userId, cafeId) => {
  return await myDataSource.query(`
    DELETE FROM likes
    WHERE user_id = ? AND cafe_id = ?`, [userId, cafeId]
  )
}

module.exports = { findUserById, likeList, updateUserProfile, deleteLikeList }