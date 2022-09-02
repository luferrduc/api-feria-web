import express from "express";
import morgan from "morgan";
import path from "path";
import {PORT} from './config.js'


// Inicialización
const app = express();

// Configuraciones

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use()
// app.use('RUTA')


// Archivos estáticos

app.listen(PORT)
console.log('servidor en el puerto', PORT)