import express from "express";
import morgan from "morgan";
import { dirname, join } from "path";
// Da rutas de un archivo del directorio
import { fileURLToPath } from "url";
import UserRoutes from "./routes/usuarios.js";

// Inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); // Objeto global que da info del archivo que está ejecutando el código
// Configuraciones
app.set("port", process.env.PORT || 3001);
// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use(UserRoutes);
// app.use('RUTA')

// Archivos estáticos
app.use(express.static(join(__dirname, "public")));
app.listen(app.get("port"), () => {
  console.log("Servidor escuchando en el puerto: ", app.get("port"));
});
