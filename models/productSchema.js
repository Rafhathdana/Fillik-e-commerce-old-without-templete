const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productid: {
      type: String,
      required: true,
    },
    merchantid: {
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
    orginalPrice: {
      type: Number,
      required: true,
    },
    ourPrice: {
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => Math.round(v * 100),
    },
    sellerPrice: {
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
    Orders: {
      type: Object,
      small: {
        type: Array,
      },
      medium: {
        type: Array,
      },
      large: {
        type: Array,
      },
      extraLarge: {
        type: Array,
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
