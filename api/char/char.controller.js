const Char = require("./char.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setError } = require("../../utils/error");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")


const createChar = async (req, res, next) => {
  try {
    const char = new Char(req.body);

    const charExist = await Char.findOne({ id: char.id });
    if (charExist) {
      return next(setError("404", "Ya existe un personaje con esa ID"));
    }
    const charDB = await char.save();
    return res.status(201).json({
      status: 201,
      message: `Personaje ${charDB.name} con ID ${charDB.id} creado`,
    });
  } catch (error) {
    return next(error);
  }
};

const createChars = async (req, res, next) => {
  try {
    const characters = req.body; // Esperamos un array de personajes en el cuerpo de la solicitud

    // Verificar si alguno de los personajes ya existe en la base de datos
    const existingChars = await Char.find({ id: { $in: characters.map(char => char.id) } });
    if (existingChars.length > 0) {
      const existingIds = existingChars.map(char => char.id);
      return next(setError("404", `Ya existen personajes con las siguientes IDs: ${existingIds.join(", ")}`));
    }

    // Guardar todos los personajes en la base de datos
    const savedChars = await Char.insertMany(characters);

    // Responder con la lista de personajes creados
    res.status(201).json({
      status: 201,
      message: "Personajes creados exitosamente",
      data: savedChars,
    });
  } catch (error) {
    next(error);
  }
};

const getChars = async (req, res, next) => {
  try {
    const characters = await Char.find();
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: characters,
    });
  } catch (error) {
    next(error);
  }
};

const updateChar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const char = await Order.findByIdAndUpdate(id, body, { new: true });
    if (!char) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: char,
    });
  } catch (error) {
    next(error);
  }
};

const deleteChar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const char = await Char.findByIdAndDelete(id);
    if (!char) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Se responde confirmando la eliminación del pedido.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: char,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createChar, createChars, getChars, deleteChar, updateChar };
