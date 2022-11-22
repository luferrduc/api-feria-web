import { createPool } from "mysql2/promise";
import {
  DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DATABASE_TEST,
} from "../config.js";
const { NODE_ENV } = process.env;

const DB = NODE_ENV === "test" ? DATABASE_TEST : DATABASE;

export const pool = createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB,
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
