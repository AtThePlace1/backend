const cors = require('cors');

const corsOptions = {
  origin: (origin, callback) => {
    // 로컬 개발 환경과 배포된 도메인 모두 허용
    if (origin === 'https://attheplace.vercel.app' || origin === 'http://localhost:3000') {
      callback(null, true); // 요청을 허용
    } else {
      callback(new Error('CORS policy: Origin not allowed'), false); // 허용되지 않는 도메인
    }
  },
  methods: 'GET,POST,PUT,PATCH,DELETE', // 허용할 HTTP 메서드
  allowedHeaders: 'Content-Type,Authorization', // 허용할 헤더
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;

