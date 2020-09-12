var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var moment = require("moment");

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eten_data",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

/* GET home page. */
router.get("/addEten", function (req, res, next) {
  let query =
    "INSERT INTO messages (`date`, `has_read`, message) VALUES('" +
    moment().format() +
    "', 0, '')";
  con.query(query, function (err, result) {
    if (err) {
      res.render("index", { title: "FUCK SHTI~!" });
      throw err;
    }
    res.render("index", { title: "Added message~!" });
  });
});

router.get("/readEten", function (req, res, next) {
  let query = "SELECT * FROM messages WHERE has_read = 0";
  con.query(query, function (err, result) {
    if (err) throw err;
    for (var index in result) {
      let update =
        "UPDATE messages SET has_read = 1 WHERE id = " + result[index].id;
      con.query(update, function (err) {
        if (err) throw err;
      });
    }

    res.json(result);
  });
});

module.exports = router;
