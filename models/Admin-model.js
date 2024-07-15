const mongoose = require("mongoose")

const AdminModel =  new mongoose.Schema({
    email:{
        type:String,
        require: true,
        min: 20
    },
    password:{
        type:String,
        require:true
    },
},{strict:false})

module.exports = mongoose.model("Admins",AdminModel)
