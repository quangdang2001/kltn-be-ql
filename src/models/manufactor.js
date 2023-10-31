const mongoose = require("mongoose");

const manufactorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter manufactor name"],
    trim: true,
    maxLenght: [50, "Manufactor must be at least 50 characters"],
  },
  logo: {
    url: {
      type: String,
      required: [true, "Please enter link manufactor logo"],
    },
  },
});
