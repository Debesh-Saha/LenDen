import mongoose, {model, Schema} from "mongoose";
import { required } from "zod/mini";
mongoose.connect("mongodb+srv://debesh:gFLC1wekzTXT9by2@cluster0.vudsruh.mongodb.net/lenden");

const UserSchema= new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String,  required: true},
    firstName: {type: String,  required: true},
    lastName: {type: String,  required: true},
})

export const UserModel= model("user", UserSchema)