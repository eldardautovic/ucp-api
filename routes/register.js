const express = require("express");
const handle = require("../connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var router = express.Router();

router.post("/", (req, res) => {
  const user = req.body.user;
  const pw = req.body.pw;

  handle.query(
    `SELECT * FROM users WHERE username = '${user}'`,
    (err, rows) => {
      if (rows.length)
        return res.status(400).send("There is someone already registered.");

      const hashedPw = bcrypt.hashSync(pw, 10);

      handle.query(
        `INSERT INTO users (username, password) VALUES ('${user}', '${hashedPw}')`,
        (err, rows) => {
          if (err) return console.log(err);

          const token = jwt.sign(
            { user: user, signed: true },
            process.env.TOKEN_SIGN
          );

          res.send({ status: "success", token: token });
        }
      );
    }
  );
});

module.exports = router;
