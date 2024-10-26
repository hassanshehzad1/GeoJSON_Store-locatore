// Updating  Schema

const mongoose = require("mongoose");

const geoCoder = require("../utils/geoCoder");
const storeSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Please add a store id"],
    unique: true,
    trim: true,
    maxlength: [8, "Your id max length is 8"],
  },

  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Geocode new locationation
storeSchema.pre("save", async function (next) {
  const location = await geoCoder.geocode(this.address);

  // Formatted address
  this.location = {
    type: "point",
    coordinates: [location[0].longitude, location[0].latitude],
    formattedAddress: location[0].formattedAddress,
  };

  // Do not save regular address
  this.address = undefined;

  // Callback
  next();
});
module.exports = new mongoose.model("Store", storeSchema);
