const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  name: String,
  template: Object,
  path: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("TemplateModel", TemplateSchema);
