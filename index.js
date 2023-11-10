const express = require("express")
const app = express()
const cors = require("cors")
const connectDatabase = require("./config/db")
const adminRoutes = require("./router/adminRouter")
const ProductModel = require("./models/Product-Model")
const PORT = 3000

//sub initiazaions
connectDatabase()
app.use(cors())
app.use(express.json())
app.get('/',async(req,res)=>{
    await ProductModel.create()
    res.status(200).json({
        message:"this is applicable "
    })
})

//this is routers initiazations
app.use("/admin",adminRoutes)
app.listen(PORT , ()=> console.log(`server is running on ${PORT}`)) 