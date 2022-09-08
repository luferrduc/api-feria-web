import express from "express";
import morgan from "morgan";
import { dirname, join } from "path";
// Da rutas de un archivo del directorio
import { fileURLToPath } from "url";
import { dbOptions } from "./db/database.js";
// Importación de las rutas
import UserRoutes from "./routes/users.js";
import PersonsRoutes from './routes/persons.js'
// Para conectarlo a la base de datos
import mysql from "mysql2";
import myconn from "express-myconnection";

// Inicialización
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url)); // Objeto global que da info del archivo que está ejecutando el código


// Configuraciones
app.set("port", process.env.PORT || 3001);
// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(myconn(mysql, dbOptions, "single")); // Conexion base de datos

// Rutas
app.use("/api", UserRoutes);
app.use("/api", PersonsRoutes);

// Archivos estáticos
app.use(express.static(join(__dirname, "public")));
app.listen(app.get("port"), () => {
  console.log("Servidor escuchando en el puerto: ", app.get("port"));
});
