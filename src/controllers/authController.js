export const login = (req, res) => {
  const sqlQuery = `SELECT * from usuarios WHERE nombre_usuario = ?`;
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(sqlQuery,[req.params.userName] ,(err, rows) => {
      if (err) return res.send(err);
      res.json(rows)
    });
  });
};
