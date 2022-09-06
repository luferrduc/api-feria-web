export const getAllUsers = (req, res) => {
  //const allUsers = usuarioService.getAllUsuario;
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `select u.id_usuario, u.nombre_usuario, u.password,
      p.nombre, p.apellido_p, p.apellido_m, u.imagen, 
      ru.descripcion as rol_usuario, p.rut, p.direccion, p.ciudad, p.ciudad, u.email
      from usuarios u inner join persona p on u.id_persona = p.id_persona
      inner join rol_usuarios ru on ru.id_rol = u.id_rol
      `,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
};
export const getOneUser = (req, res) => {
  //trae el usuario segun su id
  //const user = usuarioService.getOneUsuario(req.params.userId);
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `select u.id_usuario, u.nombre_usuario, u.password,
      p.nombre, p.apellido_p, p.apellido_m, u.imagen,
      ru.descripcion as rol_usuario, p.rut, p.direccion, p.ciudad, p.ciudad, u.email
      from usuarios u inner join persona p on u.id_persona = p.id_persona
      inner join rol_usuarios ru on ru.id_rol = u.id_rol where u.nombre_usuario = ?;
      `,
      [req.params.userName],
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
};

export const getPersons = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("SELECT * FROM persona", [req.params.userName], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
};

export const addPerson = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO persona set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);
      res.send("Persona registrada");
    });
  });
};

export const addUser = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO usuarios set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);
      res.send("Usuario registrado");
    });
  });
};

export const deleteUser = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "DELETE FROM usuarios WHERE nombre_usuario = ?",
      [req.params.userName],
      (err, rows) => {
        if (err) return res.send(err);
        res.send("Usuario eliminado");
      }
    );
  });
};
export const updateUser = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "UPDATE usuarios SET ? WHERE nombre_usuario = ?",
      [req.body, req.params.userName],
      (err, rows) => {
        if (err) return res.send(err);
        res.send("Usuario actualizado!");
      }
    );
  });
};
