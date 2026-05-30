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

const AccountSchema= new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    balance: {type: Number, required: true}
})


export const UserModel= model("user", UserSchema)
export const AccountModel= model("account", AccountSchema)