const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("Variable de entorno MONGO_URI no definida");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log("INFO: Conexión exitosa a:", conn.connection.name);
  } catch (error) {
    console.error("ERROR:", error.message);
  }
};

module.exports = { connectMongo };