const mongooose = require("mongoose")
const URL = process.env.MONGO_DB_URL || "mongodb+srv://bsidin79:student-portal@developers.zqcxpks.mongodb.net/"

const connectDatabase = async()=>{
    try {
        mongooose.connect(URL)
        console.log("server is conected")
        
    } catch (error) {
        console.log(`error${error}`)
    }

}

module.exports = connectDatabase