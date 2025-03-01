"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_PASSWORD = void 0;
require('dotenv').config();
console.log(process.env.JWT_PASSWORD);
if (!process.env.JWT_PASSWORD) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
}
exports.JWT_PASSWORD = process.env.JWT_PASSWORD;
