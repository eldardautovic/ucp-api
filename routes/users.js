const express = require("express");
const handle = require("../connection");
const bcrypt = require("bcrypt");
const endpointLog = require('../utils/logging');
var router = express.Router();

router.get('/', (req, res) => {

    handle.query(`SELECT id, username FROM users`, (err, rows) => {

        res.send(rows);
        endpointLog("/users", "GET");
    });

});

router.get('/count', (req, res) => {

    handle.query(`SELECT COUNT(id) AS registeredUsers FROM users`, (err, rows) => {

        res.send(rows[0]);

        endpointLog("/users/count", "GET");

    });

});

module.exports = router;