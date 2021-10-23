const express = require("express");
const mysql = require("mysql");
const app = express();
var handle = require("./connection");

//routes
const login = require("./routes/login.js");
app.use(express.json());

app.use("/login", login);

app.listen(3000, () => {
  console.log("Server started, connecting with the database...");

  handle.connect((err) => {
    if (err) throw err;

    console.log("   💻 Database connected with server successfully.");
  });
});
