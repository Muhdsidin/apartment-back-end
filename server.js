const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 3000
const adminRoutes = require("./router/adminRouter")

//sub initiazaions
app.use(cors())
app.use(express.json())

//this is routers initiazations
app.use("/admin",adminRoutes)
app.listen(PORT , ()=> console.log(`server is running on ${PORT}`)) 