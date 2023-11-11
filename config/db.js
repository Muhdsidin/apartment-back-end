const mongoose = require("mongoose");
const URL = process.env.MONGO_DB_URL || 'mongodb+srv://bsidin79:booking@zedro.josllbg.mongodb.net/?retryWrites=true&w=majority';

const connectDatabase = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Server is connected to MongoDB");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    }
}

module.exports = connectDatabase;
