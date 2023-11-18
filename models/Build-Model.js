const mongoose = require("mongoose")

const Build = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    location:{
        type:String,
        require: true
    }
})

module.exports = mongoose.model("building", Build)