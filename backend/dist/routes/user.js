"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const userRouter = express_1.default.Router();
userRouter.post("/signup", async (req, res) => {
    const requirebody = zod_1.z.object({
        username: zod_1.z.string().trim().toLowerCase().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
        password: zod_1.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/, { message: "Password must contain 8-20 characters, at least one uppercase letter, one lowercase letter, one number, and one special character", }),
        firstName: zod_1.z.string().trim().min(3, "First name must be at least 3 characters").max(20, "First name must be less than 20 characters"),
        lastName: zod_1.z.string().trim().min(3, "Last name must be at least 3 characters").max(20, "Last name must be less than 20 characters"),
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
        const hashedPassword = await bcrypt_1.default.hash(password, 5);
        await db_1.UserModel.create({
            username: username,
            password: hashedPassword,
            firstName: firstname,
            lastName: lastname
        });
        res.json({
            messsage: "You are signed up"
        });
    }
    catch (e) {
        res.status(403).json({
            message: "User already exists"
        });
    }
});
userRouter.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const response = await db_1.UserModel.findOne({
        username: username
    });
    if (!response) {
        res.json({
            message: "User is not present in the database"
        });
        return;
    }
    const passwordMatch = await bcrypt_1.default.compare(password, response.password);
    if (passwordMatch) {
        const token = jsonwebtoken_1.default.sign({
            id: response._id
        }, config_1.JWT_SECRET);
        res.json({
            message: "You are succesfully signed in!",
            token: token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect signin credential! Signin failed!"
        });
    }
});
userRouter.put("/", middleware_1.userMiddleware, async (req, res) => {
    const updateBody = zod_1.z.object({
        password: zod_1.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/, { message: "Password must contain 8-20 characters, at least one uppercase letter, one lowercase letter, one number, and one special character", }).optional(),
        firstName: zod_1.z.string().trim().min(3, "First name must be at least 3 characters").max(20, "First name must be less than 20 characters").optional(),
        lastName: zod_1.z.string().trim().min(3, "Last name must be at least 3 characters").max(20, "Last name must be less than 20 characters").optional(),
    });
    const parseDataWithSuccess = updateBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        const errorMessage = parseDataWithSuccess.error.issues.map(issue => issue.message);
        res.status(411).json({
            message: "Incorrect format for credential",
            error: errorMessage,
        });
        return;
    }
    await db_1.UserModel.updateOne({
        _id: req.userId
    }, req.body);
    res.json({
        message: "Your credentials are updated successfully"
    });
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map