import express, { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../db";
import mongoose from "mongoose";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware";
const userRouter = express.Router();

//Signup Route
userRouter.post("/signup", async (req, res) => {
    const requirebody = z.object({
        username: z.string().trim().toLowerCase().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/, { message: "Password must contain 8-20 characters, at least one uppercase letter, one lowercase letter, one number, and one special character", }),

        firstName: z.string().trim().min(3, "First name must be at least 3 characters").max(20, "First name must be less than 20 characters"),

        lastName: z.string().trim().min(3, "Last name must be at least 3 characters").max(20, "Last name must be less than 20 characters"),
    });


    const parseDataWithSuccess = requirebody.safeParse(req.body);

    if (!parseDataWithSuccess.success) {
        const errorMessage = parseDataWithSuccess.error.issues.map(issue => issue.message);

        res.status(411).json({
            message: "Incorrect format for credential",
            error: errorMessage,
        });
        return;
    }

    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            username: username,
            password: hashedPassword,
            firstName: firstname,
            lastName: lastname
        })

        res.json({
            messsage: "You are signed up"
        })
    } catch (e) {
        res.status(403).json({
            message: "User already exists"
        })
    }
})

//Signin Route
userRouter.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const response = await UserModel.findOne({
        username: username
    })

    if(!response){
        res.json({
            message: "User is not present in the database"
        })
        return;
    }
    
    const passwordMatch= await bcrypt.compare(password, response.password as string);

    if(passwordMatch){
        const token= jwt.sign({
            id: response._id
        }, JWT_SECRET);
        res.json({
            message: "You are succesfully signed in!",
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect signin credential! Signin failed!"
        })
    }
})

//Update User Details
userRouter.put("/", userMiddleware, async (req, res)=>{
    const updateBody = z.object({
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/, { message: "Password must contain 8-20 characters, at least one uppercase letter, one lowercase letter, one number, and one special character", }).optional(),

        firstName: z.string().trim().min(3, "First name must be at least 3 characters").max(20, "First name must be less than 20 characters").optional(),

        lastName: z.string().trim().min(3, "Last name must be at least 3 characters").max(20, "Last name must be less than 20 characters").optional(),
    });

    const parseDataWithSuccess= updateBody.safeParse(req.body);

    if (!parseDataWithSuccess.success) {
        const errorMessage = parseDataWithSuccess.error.issues.map(issue => issue.message);

        res.status(411).json({
            message: "Incorrect format for credential",
            error: errorMessage,
        });
        return;
    }

    await UserModel.updateOne({
        _id: req.userId
    },req.body)

    res.json({
        message: "Your credentials are updated successfully"
    })
})

userRouter.get("/bulk", async (req, res)=>{
    try{
        const filter = typeof req.query.filter === "string" ? req.query.filter.trim() : "";
        if(!filter){
            return res.status(400).json({
                message: "Filter is required"
            });
        }

        const users= await UserModel.find({
            $or: [
                {
                    firstName: {
                        $regex: filter,
                        $options: "i"
                    }
                },
                {
                    lastName: {
                        $regex: filter,
                        $options: "i"
                    }
                }
            ]
        }).select("username firstName lastName");

        res.json({
            users
        })
    }catch (err){
        res.status(500).json({
            message: "Interal server error"
        })
    }
})

export default userRouter;