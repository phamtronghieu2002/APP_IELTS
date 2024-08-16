
require('dotenv').config();
console.log('env', process.env.ABC)
const env = {
  BUILD_MODE: process.env.BUILD_MODE,
  LOCAL_APP_PORT: process.env.LOCAL_APP_PORT,
  LOCAL_APP_HOST: process.env.LOCAL_APP_HOST,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_DIALECT: process.env.DB_DIALECT,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  DINARY_CLOUD_NAME: process.env.DINARY_CLOUD_NAME,
  DINARY_CLOUD_API_KEY: process.env.DINARY_CLOUD_API_KEY,
  DINARY_CLOUD_API_SECRET: process.env.DINARY_CLOUD_API_SECRET,
};

module.exports = env;
