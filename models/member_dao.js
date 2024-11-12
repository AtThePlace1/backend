const myDataSource = require('./init');

const findByEmail = async (email) => {
  const [userEmail] = await myDataSource.query(`
    SELECT * FROM users
    WHERE email = ?`
    , [email]);
  return userEmail;
}

const findByNickname = async (nickName) => {
  const [userNickName] = await myDataSource.query(`
    SELECT nickname FROM users
    WHERE nickname = ?`
    , [nickName]);
  return userNickName
};

const createUser = async (userData) => {
  const { email, nickname, password, profile_image } = userData;
  return await myDataSource.query(`
    INSERT INTO users (email, nickname, password, profile_image)
    VALUES (?, ?, ?,?)
    `
    , [email, nickname, password, profile_image])
}

module.exports = { findByEmail, findByNickname, createUser }