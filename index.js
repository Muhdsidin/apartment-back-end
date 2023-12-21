const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./config/db");
const adminRoutes = require("./router/adminRouter");
const ProductModel = require("./models/Product-Model");

const PORT = process.env.PORT || 3000;

// Sub initializations
connectDatabase()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    // You might want to handle this error more gracefully based on your application requirements
    process.exit(1); // Exit the process if the database connection fails
  });

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.status(200).json({
    message:"Hello world "
  })
})

// Router initializations
app.use("/", adminRoutes);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
