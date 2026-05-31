import express, { Router } from "express";
import { userMiddleware } from "../middleware";
import { AccountModel } from "../db";
import mongoose from "mongoose";
import { error } from "node:console";
const accountRouter = express.Router();

//Check balance route
accountRouter.get("/balance", userMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const account = await AccountModel.findOne({
        userId: req.userId
    })

    res.json({
        balance: account?.balance
    })
})

//Transfer amount route
accountRouter.post("/transfer", userMiddleware, async (req, res) => {
    //Mongodb session.. transaction runs inside a session
    const session = await mongoose.startSession();

    try {
        const { amount, to } = req.body;

        if (!amount || amount <= 0) {
            res.status(400).json({
                message: "Invalid amount"
            });
        }

        if (to === req.userId) {
            return res.status(400).json({
                message: "Cannot transfer money to yourself"
            })
        }

        //Start the transaction.. from this point onwards all the operation associated
        //with this session become part of a single atomic unit.
        session.startTransaction();

        //Verify the recipient account exists
        const toAccount = await AccountModel.findOne({
            userId: to
        }).session(session);

        //If recipient is not present stop the transaction
        if (!toAccount) {
            throw new Error("Invalid Account");
        }

        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const debitResult = await AccountModel.updateOne({
            userId: req.userId, //sender account
            balance: { $gte: amount }, //$gte means greater than equal; sufficient account required
        }, {
            $inc: { balance: -amount }    //Substract amount
        }, {
            session     //execute inside transaction
        });

        if (debitResult.modifiedCount === 0) {
            throw new Error("Insufficent balance");
        }

        //Credit the recipient account
        await AccountModel.updateOne({
            userId: to
        }, {
            $inc: { balance: amount }
        }, {
            session
        })


        //If all operations succeeded, permanenly apply the changes
        await session.commitTransaction();

        res.json({
            message: "Transfer successful"
        });
    } catch (err) {
        await session.abortTransaction();

        res.status(400).json({
            message: err instanceof Error ? err.message : "Transfer failed"
        });
    } finally {
        await session.endSession();
    }
})

export default accountRouter;