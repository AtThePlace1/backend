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

const getUserByKakaoId = async (kakaoId) => {
	const [user] = await myDataSource.query(`
	SELECT * FROM users WHERE kakao)id = ? `
		, [kakaoId]);
	return user;
}

const createKakaoUser = async ( kakaoId, nickname, profileImage) => {
	const result = await myDataSource.query(`
	INSERT INTO users (kakao_id, nickname, profile_image, is_social)
	VALUES ( ?, ?, ?, 1) `
		, [kakaoId, nickname, profileImage]);
	return { id: result.insertId, kakaoId, nickname, profileImage }
}

module.exports = { findByEmail, findByNickname, createUser, getUserByKakaoId, createKakaoUser }
