"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;
console.log(mongoUrl);
if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
}
mongoose_1.default.connect(mongoUrl).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.UserModel = mongoose_1.default.model("users", UserSchema);
const ContentSchema = new mongoose_1.default.Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }], // references to other collections
    type: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'users', required: true } // references to other collections
});
exports.ContentModel = mongoose_1.default.model("content", ContentSchema);
const LinkSchema = new mongoose_1.default.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'users', required: true,
        unique: true //only one entry for a user
    },
});
exports.LinkModel = mongoose_1.default.model("links", LinkSchema);
