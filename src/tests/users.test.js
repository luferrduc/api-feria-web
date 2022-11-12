import supertest from "supertest";
import app from "../app.js";
import server from "../index.js";
import { pool } from "../db/database.js";

const api = supertest(app);

const personasIniciales = [
  {
    nombre: "Luciano",
    apellido_p: "Ferrando",
    apellido_m: "Donoso",
    direccion: "Almirante Gómez Carreño",
    num_identificador: "18.621.142-1",
    pais: "Chile",
    ciudad: "Santiago",
  },
  {
    nombre: "Thiare",
    apellido_p: "Saez",
    apellido_m: "Echeverría",
    direccion: "Alto las condes",
    num_identificador: "20.146.529-1",
    pais: "Chile",
    ciudad: "Santiago",
  },
];

describe("Users", () => {
  beforeAll(async () => {
    await pool.query("DELETE FROM usuarios");
    await pool.query("DELETE FROM persona");
    await pool.query("ALTER TABLE persona AUTO_INCREMENT=1");
    await pool.query("ALTER TABLE usuarios AUTO_INCREMENT=1");

    const [persona1, persona2] = personasIniciales;
    await pool.query(`INSERT INTO persona set ?`, [persona1]);
    await pool.query(`INSERT INTO persona set ?`, [persona2]);
  });

  test("GET Obtención de usuarios fallido", async () => {
    const response = await api
      .get("/api/usuarios")
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(0);
    expect(response.body).toEqual([]);
  });

  test("POST Añadir registro de usuario correcto", async () => {
    const newUser = {
      password: "1234",
      nombre_usuario: "LuFer",
      id_rol: 1,
      id_persona: 1,
      email: "lu.ferrando@duocuc.cl",
    };
    const response = await api
      .post("/api/usuarios")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.nombre_usuario).toEqual(newUser.nombre_usuario);
    expect(response.body.email).toEqual(newUser.email);
  });

  test("POST Fallar al añadir un usuario", async () => {
    const newUser = {
      password: "5678",
      nombre_usuario: "thi.saez",
      id_rol: 2,
      id_persona: 2,
      email: "thi.saez@",
      imagen: "",
    };
    const response = await api
      .post("/api/usuarios")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(response.body.errors[0].msg).toEqual(
      "El formato del email es incorrecto"
    );
  });

  test("GET Obtención de usuarios correcto", async () => {
    const response = await api
      .get("/api/usuarios")
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(1);
  });

  test("GET Obtención de usuario correcto", async () => {
    const usuarioEncontrado = {
      id_usuario: 1,
      nombre_usuario: "LuFer",
      nombre: "Luciano",
      apellido_p: "Ferrando",
      apellido_m: "Donoso",
      direccion: "Almirante Gómez Carreño",
      num_identificador: "18.621.142-1",
      pais: "Chile",
      ciudad: "Santiago",
      rol_usuario: "administrador",
      email: "lu.ferrando@duocuc.cl",
    };
    const userName = "LuFer";
    const response = await api
      .get(`/api/usuarios/${userName}`)
      .send()
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.nombre_usuario).toEqual(
      usuarioEncontrado.nombre_usuario
    );
    expect(response.body.nombre).toEqual(usuarioEncontrado.nombre);
    expect(response.body.email).toEqual(usuarioEncontrado.email);
  });

  test("GET Obtención de usuario incorrecto", async () => {
    const userName = "Jb.reyes";
    const response = await api
      .get(`/api/usuarios/${userName}`)
      .send()
      .expect(404)
      .expect("Content-Type", /application\/json/);
    expect(response.body.message).toContain("Usuario no encontrado");
  });

  test("PUT Modificar registro de un usuario de forma correcta", async () => {
    const userName = "LuFer";
    const newData = {
      email: "lu.ferrando@gmail.com",
      nombre_usuario: userName,
      id_rol: 1,
      imagen: "",
      password: "0987",
    };
    const response = await api.put(`/api/usuarios/${userName}`).send(newData);
    expect(response.body.email).toEqual(newData.email);
    expect(response.body.id_rol).toEqual(newData.id_rol);
    expect(response.body.nombre_usuario).toEqual(newData.nombre_usuario);
  });

  test("PUT Modificar registro de una usuarios de forma incorrecta", async () => {
    const userName = "Jb.reyes";
    const newData = {
      email: "jb.reyes@gmail.com",
      nombre_usuario: userName,
      id_rol: 2,
      imagen: "",
      password: "4567",
    };
    const response = await api.put(`/api/usuarios/${userName}`).send(newData);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("Usuario no encontrado");
  });

  test("DELETE Eliminar una usuarios de forma correcta", async () => {
    const userName = "LuFer";
    const response = await api.delete(`/api/usuarios/${userName}`).send()
    expect(response.statusCode).toBe(204);
  });

  test("DELETE No se elimina usuario porque no existe", async () => {
    const userName = "Jb.reyes";
    const response = await api.delete(`/api/usuarios/${userName}`).send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("Usuario no encontrado");
  });

  afterAll(async() => {
    await pool.query("DELETE FROM usuarios");
    pool.end();
    server.close();
  });
});
