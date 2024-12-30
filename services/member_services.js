const memberDao = require('../models/member_dao')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const axios = require("axios");
const querystring = require('querystring')
const SECRETKEY = process.env.SECRETKEY
const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;


const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  const passwordRegex = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
  return passwordRegex.test(password);
};

const validateNickname = (nickname) => {
  return nickname.length >= 3 && nickname.length <= 8;
};


const createUser = async (userData) => {
  const { email, nickname, password, profile_image } = userData;

  const REQUIRED_KEYS = { email, nickname, password };
  Object.keys(REQUIRED_KEYS).map((key) => {
    if (!REQUIRED_KEYS[key]) {
      const error = new Error(`${key}를 입력하세요`);
      error.statusCode = 400;
      throw error;
    }
  })

  if (!validateEmail(email)) {
    const error = new Error('잘못된 이메일 형식입니다');
    error.statusCode = 400;
    throw error;
  }

  if (!validatePassword(password)) {
    const error = new Error('잘못된 비밀번호 형식입니다');
    error.statusCode = 400;
    throw error;
  }

  if (!validateNickname(nickname)) {
    const error = new Error('닉네임 길이 3자~8자');
    error.statusCode = 400;
    throw error;
  }

  const existingEmailUser = await memberDao.findByEmail(email);
  if (existingEmailUser) {
    const error = new Error('이미 사용 중인 이메일입니다');
    error.statusCode = 409;
    throw error;
  }

  const existingNicknameUser = await memberDao.findByNickname(nickname);
  if (existingNicknameUser) {
    const error = new Error('이미 사용 중인 닉네임입니다');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await memberDao.createUser({
    email,
    nickname,
    password: hashedPassword,
    profile_image
  });
  return newUser;
};

const kakaoLogIn = async (authCode) => {
	try {
		const data = querystring.stringify({
			grant_type: "authorization_code",
			client_id: REST_API_KEY,
			redirect_uri: REDIRECT_URI,
			code: authCode,
		});

	const getKakaoToken = await axios.post(
		"https://kauth.kakao.com/oauth/token",
		data,
		{
			headers: {
				"Content-Type":"application/x-www-form-urlencoded",
			},
			withCredentials: true,
		}
	);

	if(!getKakaoToken.data.access_token) {
		throw {statusCode:401, message:"Failed to retrieve access token from Kakao."};
	}

	const getKakaoUserData = await axios.get(
		"https://kapi.kakao.com/v2/user/me",
		{
			headers: {
				Authorization : `Bearer ${getKakaoToken.data.access_token}`,
			},
		});

	const kakaoId = getKakaoUserData.data.id;
	const properties = getKakaoUserData.data.properties;

	if (!kakaoId || !properties || !properties.nickname || !properties.profile_image) {
		throw {
			statusCode: 400,
			message: "Kakao user data is incomplete",
		};
	}

	const nickname = properties.nickname;
	const profile_image = properties.profile_image;

	const userInfo = await memberDao.getUserByKakaoId(kakaoId);

	if (!userInfo) {
		const newUser = await memberDao.createKakaoUser(kakaoId, nickname, profile_image)
		const accessToken = jwt.sign({kakaoId: newUser.kakaoId, nickname: newUser.nickname, profile_image: newUser.profile_image },
			SECRETKEY, {expiresIn : '1d'} );
		return {
			status: 201,
			data: {
				token: accessToken,
				user: {
					kakaoId: newUser.kakaoId,
					nickname: newUser.nickname,
					profile_image: newUser.profile_image,
				}
			},
		}
	}

	const accessToken = jwt.sign({kakaoId: userInfo.kakao_id, nickname:userInfo.nickname, profile_image:userInfo.profile_image},
	return {
		status: 200,
		data: {
			token: accessToken,
			user: {
				kakaoId: userInfo.kakao_id,
				nickname: userInfo.nickname,
				profile_image: userInfo.profile_image,
			}
		},
	}

} catch(error) {
	console.error("Error during Kakao login : ", error.response?.data || error.message || error );
	throw {
		statusCode: error.response?.status || 500,
		message: error.response?.data?.message || error.message || "Failed to fetch Kakao user data :",
	};
}


const loginUser = async (userData) => {
  const { email, password } = userData;

  const REQUIRED_KEYS = { email, password };
  Object.keys(REQUIRED_KEYS).map((key) => {
    if (!REQUIRED_KEYS[key]) {
      const error = new Error(`${key}를 입력하세요`);
      error.statusCode = 400;
      throw error;
    }
  })

  if (!validateEmail(email)) {
    const error = new Error('잘못된 이메일 형식입니다');
    error.statusCode = 400;
    throw error;
  }

  const user = await memberDao.findByEmail(email);

  if (!user) {
    const error = new Error('사용자를 찾을 수 없습니다');
    error.statusCode = 404;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    const error = new Error('잘못된 비밀번호입니다')
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, SECRETKEY, { expiresIn: '1d' });

  return token;
}

module.exports = { createUser,kakaoLogIn, loginUser }
