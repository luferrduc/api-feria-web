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