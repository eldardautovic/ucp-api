const express = require("express");
const handle = require("../connection");
const bcrypt = require("bcrypt");
var router = express.Router();

router.get("/", (req, res) => {

  handle.query(`SELECT * FROM announcments`, (err, rows) => {
    if(!rows.length) 
        return res.send([]);

    res.send(rows);
  });
 
});

module.exports = router;
