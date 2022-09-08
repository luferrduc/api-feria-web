export const getPersons = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("SELECT * FROM persona", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
};

export const addPerson = (req, res) => {
  console.log(req.body);
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO persona set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);
      res.send("Persona registrada");
    });
  });
};

export const deletePerson = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "DELETE FROM persona WHERE num_identificador = ?",
      [req.params.numId],
      (err, rows) => {
        if (err) return res.send(err);
        res.send("Persona eliminada correctamente");
      }
    );
  });
};

export const updatePerson = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("UPDATE persona SET ? WHERE num_identificador = ?", [
      req.body,
      req.params.numId
    ] , (error, rows) => {
      if(error) return res.send(error)
      res.sed("Persona modificada correctamente")
    });

  });
};
