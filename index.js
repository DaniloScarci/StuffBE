const cors = require("cors");
const express = require("express");
const app = express();

const conn = require("./db");

app.use(cors());

app.use(express.json());

app.get(`/aziende`, (_, res) => {
  conn.query(`SELECT * FROM Azienda`, (_, results) => res.json(results));
});

app.get(`/elementi`, (_, res) => {
  conn.query(
    "SELECT a.*,e.* FROM Azienda a JOIN Elemento e ON a.idAzienda = e.idJoinAzienda",
    (_, results) => {
      res.json(results);
    }
  );
});

app.post(`/inserisciElemento`, (req, res) => {
  const { completato, privato, idJoinAzienda, descrizioneElemento } = req.body;
  conn.query(
    `INSERT INTO Elemento(completato,
        privato,
        idJoinAzienda,
        descrizioneElemento
        ) VALUES(
            ${completato},
            ${privato},
            ${idJoinAzienda},
            "${descrizioneElemento}"
        )`,
    (_, results) => res.json({ newId: results.insertId })
  );
});

app.post(`/eliminaElemento/:idElemento`, (req, res) => {
  const { idElemento } = req.params;
  conn.query(`DELETE e.* FROM Elemento e WHERE e.idElemento = ${idElemento}`);
  res.end();
});

app.listen(4000, () => {
  console.log(`Listening on PORT 4000..`);
});
