const mongoose = require("mongoose")

const BookModel = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    roomNo:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    region:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    to:{
        type:String,
        require:true
    },
    from:{
        type:String,
        require:true
    }
},{strict:false})

module.exports = mongoose.model("Booked",BookModel)