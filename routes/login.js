const express = require("express");
const jwt = require("jsonwebtoken");
const handle = require("../connection");
var router = express.Router();

router.post("/", (req, res) => {
  const user = req.body.user;
  const pw = req.body.pw;

  handle.query(
    `SELECT * FROM users WHERE username = '${user}' AND password = '${pw}'`,
    (err, rows) => {
      if (!rows.length) return res.sendStatus(403);
      const token = jwt.sign(
        { user: user, signed: true },
        process.env.TOKEN_SIGN
      );

      res.send({ status: "success", token: token });
    }
  );
});

module.exports = router;
