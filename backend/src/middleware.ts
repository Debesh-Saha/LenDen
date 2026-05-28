import { NextFunction, Request, Response } from "express"
import { JWT_SECRET } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userMiddleware=(req: Request, res: Response, next: NextFunction)=>{
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(403).json({
                message: "Authorization header missing"
            });
            return;
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            res.status(403).json({
                message: "Token missing"
            });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === "string") {
            res.status(403).json({
                message: "Invalid token payload"
            });
            return;
        }

        req.userId = decoded.id;

        next();

    } catch (err) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
}