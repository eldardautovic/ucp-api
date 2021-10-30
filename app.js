const express = require("express");
const mysql = require("mysql");
const app = express();
var handle = require("./connection");
const cors = require("cors");

//routes
const login = require("./routes/login.js");
const register = require("./routes/register");
const announcments = require("./routes/announcments");
app.use(express.json());

app.use(cors());

app.use("/login", login);
app.use("/register", register);
app.use("/announcments", announcments);

app.listen(8080, () => {
  console.log("Server started, connecting with the database...");

  handle.connect((err) => {
    if (err) throw err;

    console.log("   💻 Database connected with server successfully.");
  });
});
