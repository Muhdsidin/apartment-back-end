const mongoose = require("mongoose")

const Build = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    location:{
        type:String,
        require: true
    },
    rooms:[
       {
            type: mongoose.Schema.Types.ObjectId,
            ref:"rooms"
        },
    ]
},{strict: false})

module.exports = mongoose.model("building", Build)