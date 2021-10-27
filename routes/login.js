const express = require("express");
const jwt = require("jsonwebtoken");
const handle = require("../connection");
const bcrypt = require('bcrypt');
var router = express.Router();

router.post("/", (req, res) => {
  const user = req.body.user;
  const pw = req.body.pw;

  handle.query(`SELECT password FROM users WHERE username = '${user}'`, (err, rows) => {
    if(!rows.length) return res.status(403).send("Wrong usernames.");

    const comparedPw = bcrypt.compareSync(pw, rows[0].password);

    if(!comparedPw)
      return res.status(403).send("Wrong password.");
  
    handle.query(
      `SELECT * FROM users WHERE username = '${user}'`,
      (err, rows) => {
        if (!rows.length) return res.sendStatus(403);
        const token = jwt.sign(
          { user: user, signed: true,  admin: rows[0].admin == 1 ? true : false },
          process.env.TOKEN_SIGN
        );

        const obj = {
          status: "success",
          token: token
        }
  
        res.send(obj);
    });
  });
  

});


module.exports = router;
