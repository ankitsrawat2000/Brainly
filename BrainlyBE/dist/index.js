"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const types_1 = require("./types");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const parsedData = types_1.CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }
    const username = (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.username;
    const password = (_b = parsedData.data) === null || _b === void 0 ? void 0 : _b.password;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        yield db_1.UserModel.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            message: "user signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "user already exist"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const parsedData = types_1.SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }
    const username = (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.username;
    const password = (_b = parsedData.data) === null || _b === void 0 ? void 0 : _b.password;
    const existingUser = yield db_1.UserModel.findOne({
        username
    });
    if (!existingUser) {
        res.status(403).json({
            message: "user does not exist in our db"
        });
        return;
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
    if (passwordMatch) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASSWORD);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "content added"
    });
}));
//GET: retrieve parsedData from a server
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username"); //not password 1:40
    res.json({
        content
    });
}));
//DELETE- remove a resource from the server
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    console.log(req.userId);
    yield db_1.ContentModel.deleteMany({
        _id: contentId,
        userId: req.userId
    });
    res.json({
        message: "Deleted"
    });
}));
//end point needs to be authenticated i.e only a person who is logged in
//should be allowed to hit this endpoint that's why we use userMiddleware
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        }); //we might see race condition here-----will do it later when making advance projects
    }
    else { //if the user wants to disable the url
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        }); //will delete entry of this user in links model
        res.json({
            message: "remove link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    //find the link by hash
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    // fetch content of the user (userId)
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    //fetch the user
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
