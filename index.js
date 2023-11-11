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

app.get('/', async (req, res) => {
  try {
    // Assuming ProductModel.create() requires some data to be passed
    const newData = { /* provide data here */ name:"sidin"};
    await ProductModel.create(newData);
    res.status(200).json({
      message: "Data created successfully",
    });
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Router initializations
app.use("/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
