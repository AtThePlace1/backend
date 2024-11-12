require('dotenv').config();
const http = require('http');
const { createApp } = require('./app');
const app = createApp();
const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}`);
});
