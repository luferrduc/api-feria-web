import mysql from 'mysql2'

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "maipogrande",
  });
  
  mysqlConnection.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("La base de datos está conectada");
    }
  });
  
  module.exports = mysqlConnection;
  