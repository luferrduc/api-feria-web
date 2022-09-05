import express from "express";
import morgan from "morgan";
import { dirname, join } from "path";
// Da rutas de un archivo del directorio
import { fileURLToPath } from "url";
import { dbOptions } from "./database.js";
import UserRoutes from "./routes/users.js";
//para conectarlo a la base de datos
import mysql from "mysql";
import myconn from "express-myconnection";

// Inicialización
const app = express();
<<<<<<< HEAD
const __dirname = dirname(fileURLToPath(import.meta.url)); // Objeto global que da info del archivo que está ejecutando el código
=======

const __dirname = dirname(fileURLToPath(import.meta.url)); // Objeto global que da info del archivo que está ejecutando el códifo
>>>>>>> ddbd1f388a5328e00ea0b18798e94d5b5a78f4c2
// Configuraciones
app.set("port", process.env.PORT || 3001);
// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(myconn(mysql, dbOptions, "single")); //conexion base de datos

// Rutas
app.use(UserRoutes);
// app.use('RUTA')

// Archivos estáticos
app.use(express.static(join(__dirname, "public")));
app.listen(app.get("port"), () => {
  console.log("Servidor escuchando en el puerto: ", app.get("port"));
});
