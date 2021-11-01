const express = require("express");
const handle = require("../connection");
const endpointLog = require('../utils/logging');
const bcrypt = require("bcrypt");
var router = express.Router();

router.get("/", (req, res) => {

  handle.query(`SELECT * FROM announcments ORDER BY id DESC LIMIT 4 `, (err, rows) => {
    if(!rows.length) 
        return res.send([]);

    res.send(rows);

    endpointLog("/announcments", "GET");

  });
 
});

module.exports = router;
