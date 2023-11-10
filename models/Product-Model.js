const mongoose = require("mongoose")

const ProductModel =  new mongoose.Schema({
    title:{
        type:String,
        require: true,
        min: 20
    },
    prize:{
        type:Number,
        require:true
    },
    imageUrl:[

    ],
    location:{
        type:String,
        require: true,
    }
},{strict:false})

module.exports = mongoose.model("Rooms",ProductModel)