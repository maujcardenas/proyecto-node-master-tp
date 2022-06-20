const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");

// Defino el esquema de la base de datos:

const Schema = mongoose.Schema;

//Base de datos para las materias del master
const MateriaSchema = new Schema({
  NombreMateria: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
  },
  Profesor: {
    type: String,
  },
  FechaInicio: {
    type: Date,
  },
  FechaFinal: {
    type: Date,
  },
});

//Fin de la definición del esquema de la base de datos

const Materia = mongoose.model("Materia", MateriaSchema);

// Defino las funciones que usaré en los requests:
const addNewMateria = (req, res) => {
  console.log(req.body);
  let newMateria = new Materia(req.body);
  newMateria.save((err, materia) => {
    if (err) {
      res.send(err);
    }
    res.json(materia);
  });
};

const getMaterias = (req, res) => {
  Materia.find({}, (err, materia) => {
    if (err) {
      res.send(err);
    }
    res.json(materia);
  });
};

const getMateriaWithId = (req, res) => {
  Materia.findById(req.params.materiaID, (err, materia) => {
    if (err) {
      res.send(err);
    }
    res.json(materia);
  });
};

const updateMateria = (req, res) => {
  Materia.findOneAndUpdate(
    { __id: req.params.materiaID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, materia) => {
      if (err) {
        res.send(err);
      }
      res.json(materia);
    }
  );
};

const deleteMateria = (req, res) => {
  Materia.remove({ __id: req.params.materiaID }, (err, materia) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "materia removida" });
  });
};

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/materias", getMaterias);
router.post("/materias", addNewMateria);

module.exports = router;
// const routes = (app) => {
//   app
//     .route("/materias")
//     .get((req, res, next) => {
//       //middleware
//       console.log(`Request from: ${req.originalUrl}`);
//       console.log(`Request type: ${req.method}`);
//       next();
//     }, getMaterias)

//     .post(addNewMateria);

//   app
//     .route("/materias/:materiaID")
//     .get(getMateriaWithId)
//     .put(updateMateria)
//     .delete(deleteMateria);
// };

// export default routes;
