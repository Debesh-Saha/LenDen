import mongoose, {model, Schema} from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGO_URL!);

const UserSchema= new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String,  required: true},
    firstName: {type: String,  required: true},
    lastName: {type: String,  required: true},
})

export const UserModel= model("user", UserSchema)