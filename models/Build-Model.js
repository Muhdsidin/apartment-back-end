const mongoose = require("mongoose")

const Build = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    natural: [
      {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rooms', // Replace 'Rooms' with the actual model name for rooms
          },

      ],
  }, { strict: false });

  module.exports = mongoose.model("building", Build)
  