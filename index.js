const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

mongoose
  .connect("mongodb://mongo/DBCursosTP") //Conectarse y crear la database con mongo dockerizado (no en localhost como típicamente)
  .then((db) =>
    console.log("La base de datos está conectada a ", db.connection.host)
  )
  .catch((err) => console.error(err));

app.listen(PORT);
console.log("Servidor en puerto", PORT);
