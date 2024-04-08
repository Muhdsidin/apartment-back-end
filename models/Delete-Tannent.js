const mongoose = require("mongoose");

const DeleteModelSchema = new mongoose.Schema({
    Deleted_tannent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booked' // Replace 'Booked' with the actual model name for tenants
    }]
});

module.exports = mongoose.model("Delete", DeleteModelSchema);
