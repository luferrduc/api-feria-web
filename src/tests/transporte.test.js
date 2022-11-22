import supertest from "supertest";
import app from "../app.js";
import server from "../index.js";
import { pool } from "../db/database.js";

const api = supertest(app);

const personasInicial = {
  nombre: "José",
  apellido_p: "Reyes",
  apellido_m: "Alcaino",
  direccion: "Lo Solar",
  num_identificador: "20.495.809-2",
  pais: "Chile",
  ciudad: "Santiago",
};

const usuarioInicial = {
  password: "1234",
  nombre_usuario: "JbReyes",
  id_rol: 5,
  id_persona: 1,
  imagen: "",
  email: "jb.reyes@duocuc.cl",
};

describe("Transportes", () => {
  beforeAll(async () => {
    await pool.query("ALTER TABLE persona AUTO_INCREMENT=1");
    await pool.query("ALTER TABLE usuarios AUTO_INCREMENT=1");
    await pool.query("ALTER TABLE transportes AUTO_INCREMENT=1");

    await pool.query(`INSERT INTO persona set ?`, [personasInicial]);
    await pool.query(`INSERT INTO usuarios set ?`, [usuarioInicial]);
  });

  test("GET No existen registro de transportes", async () => {
    const response = await api
      .get("/api/transportes")
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(0);
    expect(response.body).toEqual([]);
  });

  test("POST Añadir registro de transporte correcto", async () => {
    const newTransporte = {
      patente: "JJ-YJ-67",
      tamano: "Mediano",
      capacidad_carga: 5000,
      refrigeracion: "Si",
      id_tipo: 1,
      id_usuario: 1,
    };
    const response = await api
      .post("/api/transportes")
      .send(newTransporte)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual({ id_transporte: 1, ...newTransporte });
  });

  test("POST Fallar al añadir un transporte", async () => {
    const newTransporte = {
      patente: "JJ-YJ-67",
      tamano: "",
      capacidad_carga: 5000,
      refrigeracion: "",
      id_tipo: 1,
      id_usuario: 1,
    };
    const response = await api
      .post("/api/transportes")
      .send(newTransporte)
      .expect(500)
      .expect("Content-Type", /application\/json/);
    expect(response.body.message).toEqual(
      "Algunos campos se encuentran vacios, por favor rellenarlos"
    );
  });

  test("GET Obtención de transporte correcto", async () => {
    const response = await api
      .get("/api/transportes")
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(1);
  });

  test("GET Obtención de transporte correcto", async () => {
    const transporteEncontrado = {
      id_transporte: 1,
      patente: "JJ-YJ-67",
      tamano: "Mediano",
      capacidad_carga: 5000,
      refrigeracion: "Si",
      id_tipo: 1,
      id_usuario: 1,
    };
    const idTransporte = 1;
    const response = await api
      .get(`/api/transportes/${idTransporte}`)
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(transporteEncontrado);
  });

  test("GET Obtención de transporte incorrecto", async () => {
    const idTransporte = 2;
    const response = await api
      .get(`/api/transportes/${idTransporte}`)
      .send()
      .expect(404)
      .expect("Content-Type", /application\/json/);
    expect(response.body.message).toContain("Transporte no encontrado");
  });

  test("PUT Modificar registro de un transporte de forma correcta", async () => {
    const idTransporte = 1;
    const newData = {
      patente: "JJ-YJ-67",
      tamano: "Grande",
      capacidad_carga: 7500,
      refrigeracion: "No",
      id_tipo: 1,
      id_usuario: 1,
    };
    const response = await api
      .put(`/api/transportes/${idTransporte}`)
      .send(newData);
    expect(response.body.nombre).toEqual(newData.nombre);
    expect(response.body.precio).toEqual(newData.precio);
  });

  test("PUT Modificar registro de un transporte de forma incorrecta", async () => {
    const idTransporte = 2;
    const newData = {
      patente: "JJ-YJ-67",
      tamano: "Grande",
      capacidad_carga: 7500,
      refrigeracion: "No",
      id_tipo: 1,
      id_usuario: 1,
    };
    const response = await api
      .put(`/api/transportes/${idTransporte}`)
      .send(newData);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("Transporte no encontrado");
  });

  test("DELETE Eliminar un transporte de forma correcta", async () => {
    const idTransporte = 1;
    const response = await api
      .delete(`/api/transportes/${idTransporte}`)
      .send();
    expect(response.statusCode).toBe(204);
  });

  test("DELETE No se elimina transporte porque no existe", async () => {
    const idTransporte = 2;
    const response = await api
      .delete(`/api/transportes/${idTransporte}`)
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("Transporte no encontrado");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM usuarios");
    await pool.query("DELETE FROM persona");

    pool.end();
    server.close();
  });
});
