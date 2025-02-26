import mongoose from "mongoose";
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

console.log(mongoUrl);

if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
}


mongoose.connect(mongoUrl).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


const UserSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true}
})

export const  UserModel = mongoose.model("users",UserSchema);

const ContentSchema = new mongoose.Schema({
    title: String,
    link: String,
    tags: [{type : mongoose.Types.ObjectId, ref: 'Tag'}], // references to other collections
    type: String,
    userId: {type : mongoose.Types.ObjectId, ref: 'users', required : true} // references to other collections
})

export const ContentModel = mongoose.model("content", ContentSchema);

const LinkSchema = new mongoose.Schema({
    hash : String,
    userId: {type : mongoose.Types.ObjectId, ref: 'users', required: true,
        unique: true //only one entry for a user
    },
})

export const LinkModel = mongoose.model("links",LinkSchema);
