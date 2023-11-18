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
    number:{
        type:String,
        require: true,
    },
    building:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"buiding"
    }
},{strict:false})

module.exports = mongoose.model("Rooms",ProductModel)