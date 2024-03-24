const Corista = require("../coristas/coristas.model");
const Nombre = require("./nombres.model");

const getNombres = async (req, res, next) => {
  try {
    const nombres = await Nombre.find().populate("author");
    return res.json(nombres);
  } catch (error) {
    return next(error);
  }
};

const postNombre = async (req, res, next) => {
  try {
    await Corista.findByIdAndUpdate(req.body.author, { logged: true });

    const newNombre = await new Nombre(req.body);
    await newNombre.save();
    return res.status(201).json(newNombre);
  } catch (error) {
    return next(error);
  }
};
const deleteNombre = async (req, res, next) => {
  try {
    const { idNombre } = req.params;

    const nombreEliminado = await Nombre.findByIdAndDelete(idNombre);

    return res.status(200).json(nombreEliminado);
  } catch (error) {
    return next(error);
  }
};
const editNombre = async (req, res, next) => {
  try {
    const { idNombre } = req.params;

    const nombreToEdit = new Nombre(req.body);

    nombreToEdit._id = idNombre;

    const nombreEditd = await Nombre.findByIdAndUpdate(idNombre, nombreToEdit, {
      new: true,
    });

    return res.status(200).json(nombreEditd);
  } catch (error) {
    return next(error);
  }
};
const addVoto = async (req, res, next) => {
  try {
    const { votado, points } = req.body;
    const { idCorista } = req.params;
    const messageText=(points>0) ? "Voto engadido":"Voto descontado"
    let coristaName = await Corista.findById(idCorista);
    if (!coristaName) {
      return res.status(404).json({idCorista, message: "El corista no existe" });
    }
    const nombreVotado = await Nombre.findById(votado);
    if (!nombreVotado) {
      return res.status(404).json({ message: "El nombre votado no existe" });
    }
    await Nombre.findByIdAndUpdate(
      votado,
      { $inc: { points: points } },
      { new: true }
    );

    coristaName.voted = true;
    if (points<0) {
      coristaName.namesVoted = coristaName.namesVoted.filter(
        (obj) => obj.votado != votado
      );
    } else {
      coristaName.namesVoted.push({votado:votado, points:points});
    }
    await Corista.findByIdAndUpdate(idCorista, coristaName, {new:true}  )
    return res.status(200).json({ coristaName, message: messageText });
  } catch (error) {
    console.error("Error en la función addVoto:", error);
    return next(error);
  }
};
// const modifyVoto = async (corista, votos) => {
//   let votadosPreviamente = corista.namesVoted;
//   for (const votadoAntes of votadosPreviamente) {
//     if (!votos.includes(votadoAntes)) {
//       await Nombre.findByIdAndUpdate(
//         votadoAntes,
//         { $inc: { points: -1 } },
//         { new: true }
//       );
//       votadosPreviamente = votadosPreviamente.filter((id) => id != votadoAntes);
//     }
//   }
//   for (const nuevoVoto of votos) {
//     if (!votadosPreviamente.includes(nuevoVoto)) {
//       await Nombre.findByIdAndUpdate(
//         nuevoVoto,
//         { $inc: { points: 1 } },
//         { new: true }
//       );
//       votadosPreviamente.push(nuevoVoto);
//     }
//   }
//   corista.namesVoted = votadosPreviamente;
//   await corista.save();
// };




// Función para comparar los valores de points
async function comparePoints() {
  try {
    // Obtener todos los documentos de Nombres
    const nombres = await Nombre.find();

    // Iterar sobre cada documento en Nombres
    for (const nombre of nombres) {
      const { _id } = nombre;

      // Buscar todos los coristas que votaron por este nombre
      const coristasVotantes = await Corista.find({ "namesVoted.votado": _id.toString()});

      if (coristasVotantes.length === 0) {
        console.log(`Nombre ${_id}: Nadie votó por este nombre.`);
        continue;
      }

      // Calcular la suma total de puntos de los coristas votantes
      let totalPointsFromCoristas = 0;
      for (const corista of coristasVotantes) {
        const entry = corista.namesVoted.find((obj) => obj.votado === _id.toString());
        if (entry) {
          totalPointsFromCoristas += entry.points;
        }
      }

      // Comparar con el valor actual de points en Nombres
      if (nombre.points === totalPointsFromCoristas) {
        console.log(`Nombre ${_id}: Puntos coinciden (${nombre.points})`);
      } else {
        console.log(
          `Nombre ${_id}: Puntos no coinciden. Nombres: ${nombre.points}, Coristas: ${totalPointsFromCoristas}`
        );
      }
    }
  } catch (error) {
    console.error("Error al comparar puntos:", error);
  }
}

// Llama a la función para realizar la comparación
// comparePoints();

const noMoreVotes = async (req, res, next) =>{
  return res.status(200).json({  message: "O prazo para votar rematou" })
}

module.exports = { postNombre, getNombres, deleteNombre, editNombre, addVoto, noMoreVotes };
