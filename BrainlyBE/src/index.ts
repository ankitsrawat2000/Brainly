import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
import bcrypt from "bcrypt";
import { CreateUserSchema, SigninSchema } from "./types";

const app = express();

app.use(express.json());

app.use(cors());

app.post("/api/v1/signup", async (req,res) =>{

    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    const username = parsedData.data?.username;
    const password = parsedData.data?.password;

    
    try{
        const hashedPassword = await bcrypt.hash(password, 5);
        await UserModel.create({
            username: username,
            password: hashedPassword
        })
    
        res.json({
            message: "user signed up"
        })

    }catch(e){
        res.status(411).json({
            message: "user already exist"
        })
    }
});

app.post("/api/v1/signin",async (req,res) =>{
    console.log("Signin API hit", req.body);

    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    const username = parsedData.data?.username;
    const password = parsedData.data?.password;

    const existingUser = await UserModel.findOne({
        username
    });

    if(!existingUser){
        res.status(403).json({
            message: "user does not exist in our db"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if(passwordMatch){
        const token = jwt.sign({
            id: existingUser._id
        },JWT_PASSWORD)

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }

});

app.post("/api/v1/content",userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "content added"
    })
});

//GET: retrieve parsedData from a server
app.get("/api/v1/content",userMiddleware, async (req,res)=>{
    const userId = req.userId;
    const content = await ContentModel.find({
        userId : userId
    }).populate("userId", "username");//not password 1:40
    res.json({
        content
    })
});

//DELETE- remove a resource from the server
app.delete("/api/v1/content", userMiddleware, async (req,res)=>{

    const contentId = req.body.contentId;

    console.log(req.userId);
    
    await ContentModel.deleteMany({
        _id : contentId,
        userId : req.userId
    })

    res.json({
        message: "Deleted"
    })
});

//end point needs to be authenticated i.e only a person who is logged in
//should be allowed to hit this endpoint that's why we use userMiddleware

app.post("/api/v1/brain/share",userMiddleware,async (req,res)=>{
    const share = req.body.share;
    if(share){
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        })      
        
        if(existingLink){
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            userId: req.userId,
            hash: hash
        })

        res.json({
            hash 
        })//we might see race condition here-----will do it later when making advance projects
    }
    else{//if the user wants to disable the url
        await LinkModel.deleteOne({
            userId: req.userId
        }) //will delete entry of this user in links model

        res.json({
            message: "remove link"
        })
    }
});

app.get("/api/v1/brain/:shareLink",async (req,res)=>{
    const hash = req.params.shareLink;

    //find the link by hash
    const link = await LinkModel.findOne({
        hash
    });

    if(!link){
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // fetch content of the user (userId)
    const content = await ContentModel.find({
        userId: link.userId
    })

    //fetch the user
    const user = await UserModel.findOne({
        _id : link.userId
    })
    
    if(!user){
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
