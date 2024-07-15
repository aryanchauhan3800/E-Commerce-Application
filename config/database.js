import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DBconnection=()=>{
    mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
    
}

export default DBconnection;