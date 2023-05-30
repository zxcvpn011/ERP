const mongoose = require("mongoose");
const { Schema } = mongoose, { ObjectId } = Schema.Types

const MaterialsSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    default: Date.now,
    required: true
  },
}, { timestamps: true });


module.exports = mongoose.models.Materials ? mongoose.model('Materials') : mongoose.model("Materials", MaterialsSchema);
