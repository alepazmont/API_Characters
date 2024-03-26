const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./utils/db");
const charRouter = require("./api/char/char.routes");

const {
  notFoundHandler,
  errorHandler,
} = require("./api/middleware/error.middleware");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectMongo();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());

app.get("/", (req, res) => {
  res.send("La API funciona");
});
app.use("/character", charRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor conectado al puerto ${PORT}`);
});
