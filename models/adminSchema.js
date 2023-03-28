const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    outletName: {
      type: String,
      required: true,
    },
    regNumber: {
      type: String,
      required: true,
    },
    gpsCoordinates: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    productlist: [
      {
        type: Object,
        productid: {
          type: String,
        },
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        category: {
          type: String,
        },
        color: {
          type: String,
        },
        pattern: {
          type: String,
        },
        actualPrice: {
          type: String,
        },
        gender: {
          type: String,
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
      },
    ],
    status: {
      type: Boolean,
      required: true,
    },
    emailverified: {
      type: Boolean,
      required: true,
    },
    mobileverification: {
      type: Boolean,
      required: true,
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

module.exports = mongoose.model("User", userSchema);
