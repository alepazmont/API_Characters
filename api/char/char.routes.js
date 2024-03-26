const express = require("express");
const charRouter = express.Router();
const {
    getChars,
    createChar,
    updateChar,
    deleteChar,
    createChars
  } = require("../char/char.controller");
const { isAuth } = require("../middleware/auth.middleware");



//OBTENER TODAS LAS CANCIONES
charRouter.get("/get", getChars);

//CREAR UNA CANCIÓN
charRouter.post("/create", /* [isAuth], */ createChar);


charRouter.post("/createChars", /* [isAuth], */ createChars);

//UPDATE
charRouter.patch("/update", /* [isAuth], */ updateChar);

//DELETE
charRouter.delete("/delete", /* [isAuth], */ deleteChar);


module.exports = charRouter;




