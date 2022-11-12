import supertest from "supertest";
import app from "../app.js";
import server from "../index.js";
import { pool } from "../db/database.js";

const api = supertest(app);

describe("Persons", () => {
  beforeAll(async () => {
    await pool.query("DELETE FROM persona");
    await pool.query("ALTER TABLE persona AUTO_INCREMENT=1");
    // const [persona1, persona2] = personasIniciales;
    // await pool.query(`INSERT INTO persona set ?`, [persona1]);
    // await pool.query(`INSERT INTO persona set ?`, [persona2]);
  });

  test("GET Obtención de personas fallido", async () => {
    const response = await api
      .get("/api/persona")
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(0);
    expect(response.body).toEqual([]);
  });

  test("POST Añadir registro de persona correcto", async () => {
    const newPerson = {
      nombre: "Luciano",
      apellido_p: "Ferrando",
      apellido_m: "Donoso",
      direccion: "Almirante Gómez Carreño",
      num_identificador: "18.621.142-1",
      pais: "Chile",
      ciudad: "Santiago",
    };
    const response = await api
      .post("/api/persona")
      .send(newPerson)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual({ id_persona: 1, ...newPerson });
  });

  test("POST Fallar al añadir una persona", async () => {
    const newPerson = {
      nombre: "",
      apellido_p: "Saez",
      apellido_m: "Echeverría",
      direccion: "",
      num_identificador: "",
      pais: "Chile",
      ciudad: "Santiago",
    };
    const response = await api
      .post("/api/persona")
      .send(newPerson)
      .expect(500)
      .expect("Content-Type", /application\/json/);
    expect(response.body.message).toContain(
      "Alguno de los campos se encuentra vacío"
    );
  });

  test("GET Obtención de personas correcto", async () => {
    const listaPersonas = [
      {
        id_persona: 1,
        nombre: "Luciano",
        apellido_p: "Ferrando",
        apellido_m: "Donoso",
        direccion: "Almirante Gómez Carreño",
        num_identificador: "18.621.142-1",
        pais: "Chile",
        ciudad: "Santiago",
      },
    ];
    const response = await api
      .get("/api/persona")
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(listaPersonas);
  });

  test("GET Obtención de persona correcto", async () => {
    const personaEncontrada = {
      id_persona: 1,
      nombre: "Luciano",
      apellido_p: "Ferrando",
      apellido_m: "Donoso",
      direccion: "Almirante Gómez Carreño",
      num_identificador: "18.621.142-1",
      pais: "Chile",
      ciudad: "Santiago",
    };
    const numId = "18.621.142-1";
    const response = await api
      .get(`/api/persona/${numId}`)
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(personaEncontrada);
  });

  test("GET Obtención de persona incorrecto", async () => {
    const numId = "19.993.242-1";
    const response = await api
      .get(`/api/persona/${numId}`)
      .send()
      .expect(404)
      .expect("Content-Type", /application\/json/);
    expect(response.body.message).toContain("Persona no encontrada");
  });

  test("PUT Modificar registro de una persona de forma correcta", async () => {
    const numId = "18.621.142-1";
    const newData = {
      nombre: "Luciano",
      apellido_p: "Ferrando",
      apellido_m: "Donoso",
      direccion: "Almirante Gómez",
      pais: "Italia",
      ciudad: "Milano",
      num_identificador: numId,
    };
    const response = await api.put(`/api/persona/${numId}`).send(newData);
    expect(response.body).toEqual({
      id_persona: 1,
      num_identificador: numId,
      ...newData,
    });
  });

  test("PUT Modificar registro de una persona de forma incorrecta", async () => {
    const numId = "19.993.242-1";
    const newData = {
      nombre: "Luciano",
      apellido_p: "Ferrando",
      apellido_m: "Donoso",
      direccion: "Almirante Gómez",
      pais: "Italia",
      ciudad: "Milano",
      num_identificador: numId,
    };
    const response = await api.put(`/api/persona/${numId}`).send(newData);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("Persona no encontrada");
  });

  test("DELETE Eliminar una persona de forma correcta", async () => {
    const numId = "18.621.142-1";
    const response = await api.delete(`/api/persona/${numId}`).send();
    expect(response.statusCode).toBe(204);
  });

  test("DELETE Eliminar una persona de forma incorrecta", async () => {
    const numId = "19.993.242-1";
    const response = await api.delete(`/api/persona/${numId}`).send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("Persona no encontrada");
  });

  afterAll(() => {
    pool.end();
    server.close();
  });
});
