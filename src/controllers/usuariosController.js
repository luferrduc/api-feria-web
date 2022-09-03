const getAllUsuario = (req, res) => {
  res.send("Get all users");
};

const getOneUsuario = (req, res) => {
  res.send("Get one user");
};

const createNewUsuario = (req, res) => {
  res.send("createNewUsuario");
};

const updateUsuario = (req, res) => {
  res.send("updateUsuario");
};

const deleteOneUsuario = (req, res) => {
  res.send("deleteOneUsuario");
};

module.exports = {
  getAllUsuario,
  getOneUsuario,
  createNewUsuario,
  updateUsuario,
  deleteOneUsuario,
};
