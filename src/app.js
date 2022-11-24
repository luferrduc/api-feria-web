import express from "express";
import morgan from "morgan";
import { dirname, join } from "path";
// Da rutas de un archivo del directorio
import { fileURLToPath } from "url";
//import { dbOptions } from "./db/database.js";
// Importación de las rutas
import UserRoutes from "./routes/users.js";
import PersonsRoutes from "./routes/persons.js";
import AuthRoutes from "./routes/auth.js";
import ContratosRoutes from "./routes/contratos.js";
import ProductRoutes from "./routes/productos.js";
import SubastaRoutes from "./routes/subastas.js";
import VentasRoutes from "./routes/ventas.js";
import TransporteRoutes from "./routes/transportes.js";
import PeticionRoutes from "./routes/peticion.js";
import PaymentRoutes from "./routes/payment.js";


// Para conectarlo a la base de datos
import mysql from "mysql2";
import myconn from "express-myconnection";
import cors from "cors";

import { PORT } from "./config.js";

// Inicialización
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url)); // Objeto global que da info del archivo que está ejecutando el código


// Configuraciones
app.set("port", PORT || 3001);
// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//app.use(myconn(mysql, dbOptions, "single")); // Conexion base de datos

// Rutas
app.use("/api/usuarios", UserRoutes);
app.use("/api/persona", PersonsRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/contratos", ContratosRoutes);
app.use("/api/productos", ProductRoutes);
app.use("/api/subastas", SubastaRoutes);
app.use("/api/ventas", VentasRoutes);
app.use("/api/transportes", TransporteRoutes);
app.use("/api/peticion", PeticionRoutes);
app.use("/api/payment", PaymentRoutes);
// Rutas sin definir
app.use((req, res, next) => {
  res.status(404).json({
    message: "Not found",
  });
});

// Archivos estáticos
app.use(express.static(join(__dirname, "public")));

export default app;
