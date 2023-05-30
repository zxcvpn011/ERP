const mongoose = require("mongoose");
const { Schema } = mongoose, { ObjectId } = Schema.Types

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: String,
    required: true
  },
  productCode: {
    type: Number,
    required: true
  },
  materials: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.models.Product ? mongoose.model('Product') : mongoose.model("Product", ProductSchema);