const mongoose = require("mongoose")
require("dotenv").config()

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected")
    }catch(error){
        console.log(`Erro connecting ${error}`)
        process.exit(1)
    }
}

module.exports = connectdb