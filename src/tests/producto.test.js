import supertest from "supertest";
import app from "../app.js";
import server from "../index.js";
import { pool } from "../db/database.js";

const api = supertest(app);

const personasInicial = {
  nombre: "Luciano",
  apellido_p: "Ferrando",
  apellido_m: "Donoso",
  direccion: "Almirante Gómez Carreño",
  num_identificador: "18.621.142-1",
  pais: "Chile",
  ciudad: "Santiago",
};

const usuarioInicial = {
  password: "1234",
  nombre_usuario: "LuFer",
  id_rol: 2,
  id_persona: 1,
  imagen: "",
  email: "lu.ferrando@duocuc.cl",
};

describe("Users", () => {
  beforeAll(async () => {
    await pool.query("DELETE FROM usuarios");
    await pool.query("DELETE FROM persona");

    await pool.query("ALTER TABLE persona AUTO_INCREMENT=1");
    await pool.query("ALTER TABLE usuarios AUTO_INCREMENT=1");
    await pool.query("ALTER TABLE productos AUTO_INCREMENT=1");

    await pool.query(`INSERT INTO persona set ?`, [personasInicial]);
    await pool.query(`INSERT INTO usuarios set ?`, [usuarioInicial]);
  });

  test("GET No existen registro de productos", async () => {
    const response = await api
      .get("/api/productos")
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(0);
    expect(response.body).toEqual([]);
  });

  test("POST Añadir registro de producto correcto", async () => {
    const newProduct = {
      nombre: "Manzana",
      precio: 2500,
      observaciones: "Manzanas frescas pink lady de la Región del Maule",
      id_calidad: 1,
      imagen: "",
      id_usuario: 1,
    };
    const response = await api
      .post("/api/productos")
      .send(newProduct)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual({ id_producto: 1, ...newProduct });
  });

  test("POST Fallar al añadir un producto", async () => {
    const newProduct = {
      nombre: "",
      precio: 2500,
      observaciones: "Manzanas frescas pink lady de la Región del Maule",
      id_calidad: 1,
      imagen: "",
      id_usuario: 1,
    };
    const response = await api
      .post("/api/productos")
      .send(newProduct)
      .expect(500)
      .expect("Content-Type", /application\/json/);
    expect(response.body.message).toEqual(
      "Algunos campos se encuentran vacios, por favor rellenarlos"
    );
  });

  test("GET Obtención de productos correcto", async () => {
    const response = await api
      .get("/api/productos")
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(1);
  });

  test("GET Obtención de producto correcto", async () => {
    const productoEncontrado = {
      id_producto: 1,
      nombre: "Manzana",
      precio: 2500,
      observaciones: "Manzanas frescas pink lady de la Región del Maule",
      id_calidad: 1,
      imagen: "",
      id_usuario: 1,
    };
    const idProduct = 1;
    const response = await api
      .get(`/api/productos/${idProduct}`)
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(productoEncontrado);
  });

  test("GET Obtención de producto incorrecto", async () => {
    const idProduct = 2;
    const response = await api
      .get(`/api/productos/${idProduct}`)
      .send()
      .expect(404)
      .expect("Content-Type", /application\/json/);
    expect(response.body.message).toContain("Producto no encontrado");
  });

  test("PUT Modificar registro de un producto de forma correcta", async () => {
    const idProduct = 1;
    const newData = {
      nombre: "Pera",
      precio: 3500,
      observaciones: "Manzanas frescas pink lady de la Región del Maule",
      id_calidad: 1,
      imagen: "",
      id_usuario: 1,
    };
    const response = await api.put(`/api/productos/${idProduct}`).send(newData);
    expect(response.body.nombre).toEqual(newData.nombre);
    expect(response.body.precio).toEqual(newData.precio);
  });

  test("PUT Modificar registro de un producto de forma incorrecta", async () => {
    const idProduct = 2;
    const newData = {
      nombre: "Pera",
      precio: 3500,
      observaciones: "Manzanas frescas pink lady de la Región del Maule",
      id_calidad: 1,
      imagen: "",
      id_usuario: 1,
    };
    const response = await api.put(`/api/productos/${idProduct}`).send(newData);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("Producto no encontrado");
  });

  test("DELETE Eliminar un producto de forma correcta", async () => {
    const idProduct = 1;
    const response = await api.delete(`/api/productos/${idProduct}`).send();
    expect(response.statusCode).toBe(204);
  });

  test("DELETE No se elimina producto porque no existe", async () => {
    const idProduct = 2;
    const response = await api.delete(`/api/productos/${idProduct}`).send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("Producto no encontrado");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM productos");
    await pool.query("DELETE FROM usuarios");

    pool.end();
    server.close();
  });
});
