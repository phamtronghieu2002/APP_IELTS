const env = require("~/config/env");

const WHITELIST_DOMAINS = [
  'https://admin-ktln.onrender.com',
  'http://localhost:5111',
  "http://localhost:5000",
  "https://yourdomain.com",
  "https://yourdomain.com",
  "http://127.0.0.1:5500",
  "http://192.168.85.187:8081",
  "https://5919-222-253-150-226.ngrok-free.app",

  `${env?.CLIENT_URL}`

];

module.exports = {
  WHITELIST_DOMAINS,
};
