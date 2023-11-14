const mongoose = require("mongoose")

const ProductModel =  new mongoose.Schema({
    title:{
        type:String,
        require: true,
        min: 20
    },
    prize:{
        type:String,
        require:true
    },
    imageUrl:[

    ],
    
},{strict:false})

module.exports = mongoose.model("Rooms",ProductModel)
