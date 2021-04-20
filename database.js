const mysql = require("mysql2");

module.exports = mysql.createConnection({
    host: "188.95.227.176",
    user: "dntfury1",
    database: "simple_forum",
    password: "mypass",
    port: 3306
});

