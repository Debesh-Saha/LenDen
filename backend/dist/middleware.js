"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "Invalid token payload"
            });
            return;
        }
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
};
exports.userMiddleware = userMiddleware;
//# sourceMappingURL=middleware.js.map