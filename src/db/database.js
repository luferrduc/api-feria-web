// export const dbOptions = {
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "root",
//   database: "maipogrande",
// };

import { createPool } from "mysql2/promise";
import { DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "../config.js";
export const pool = createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
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
