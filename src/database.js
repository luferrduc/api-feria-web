import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "maipogrande",
});
/* 
  mysqlConnection.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("La base de datos está conectada");
    }
  });
  
  module.exports = mysqlConnection;
   */
