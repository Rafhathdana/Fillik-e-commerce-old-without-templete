const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    pattern: {
      type: String,
      required: true,
    },
    actualPrice: {
      type: Number,
      required: true,
    },
    sellPrice: {
      type: Number,
      required: true,
    },
    genderType: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Object,
      small: {
        type: Number,
      },
      medium: {
        type: Number,
      },
      large: {
        type: Number,
      },
      extraLarge: {
        type: Number,
      },
    },
    images: {
      type: Array,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
