"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_PASSWORD = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.JWT_PASSWORD);
if (!process.env.JWT_PASSWORD) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
}
exports.JWT_PASSWORD = process.env.JWT_PASSWORD;
