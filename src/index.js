import app from "./app.js";

const server = app.listen(app.get("port"), () => {
  console.log("Servidor escuchando en el puerto: ", app.get("port"));
});

export default server;
