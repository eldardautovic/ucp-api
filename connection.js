const mysql = require("mysql");

require("dotenv").config();

var handle = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PW,
  database: process.env.DB,
});

module.exports = handle;
