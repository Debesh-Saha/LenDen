import express, { Router } from "express";
import { userMiddleware } from "../middleware";
import { AccountModel } from "../db";
const accountRouter= express.Router();

//Check balance route
accountRouter.get("/balance", userMiddleware, async (req, res)=>{
    if(!req.userId){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const account= await AccountModel.findOne({
        userId: req.userId
    })

    res.json({
        balance: account?.balance
    })
})

export default accountRouter;