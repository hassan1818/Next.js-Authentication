import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!) // ! means it will never be null or undefined
        
        const connection = mongoose.connection;

        connection.on("connected", ()=>{
            console.log("MongoDB connected successfully")
        })

        connection.on("error", (err)=>{
            console.log("MongoDB connection failed" + err);
            process.exit();
        })
    }
    catch(error){
        console.log("MongoDB connection error")
        console.log(error)
    }
}