const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { validationPassword, validationEmail } = require("../../utils/validate");

const charSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  faction: { type: String, trim: true, required: true },
  profession: { type: String, trim: true, required: true },
  race: { type: String, trim: true, required: true },
});

module.exports = mongoose.model('Char', charSchema);
