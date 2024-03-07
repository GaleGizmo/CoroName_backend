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
    await Corista.findByIdAndUpdate(req.body.author,{logged:true})
    
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
    const { votados } = req.body;
    const {idCorista} =req.params
    let coristaName = await Corista.findById(idCorista);
    if (coristaName.voted) {
      await modifyVoto(coristaName, votados);
      return res.status(200).json({coristaName, message: "Votos modificados" });
    } else {
      for (const votado of votados) {
        await Nombre.findByIdAndUpdate(
          votado,
          { $inc: { points: 1 } },
          { new: true }
        );
      }

      coristaName.voted = true;
      coristaName.namesVoted = votados;
      await coristaName.save();
      return res
        .status(200)
        .json({coristaName,  message: "Votación engadida" });
    }
  } catch (error) {
    return next(error);
  }
};
const modifyVoto = async (corista, votos) => {
  let votadosPreviamente = corista.namesVoted;
  for (const votadoAntes of votadosPreviamente) {
    if (!votos.includes(votadoAntes)) {
      await Nombre.findByIdAndUpdate(
        votadoAntes,
        { $inc: { points: -1 } },
        { new: true }
      );
      votadosPreviamente = votadosPreviamente.filter((id) => id != votadoAntes);
    }
  }
  for (const nuevoVoto of votos) {
    if (!votadosPreviamente.includes(nuevoVoto)) {
      await Nombre.findByIdAndUpdate(
        nuevoVoto,
        { $inc: { points: 1 } },
        { new: true }
      );
      votadosPreviamente.push(nuevoVoto);
    }
  }
  corista.namesVoted = votadosPreviamente;
  await corista.save();
};
module.exports = { postNombre, getNombres, deleteNombre, editNombre, addVoto };
