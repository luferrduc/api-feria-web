import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DATABASE = process.env.DB_DATABASE || "maipogrande";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "root";
export const DATABASE_TEST = process.env.DATABASE_TEST || "maipograndetest";
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN