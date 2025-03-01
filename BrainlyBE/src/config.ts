import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.JWT_PASSWORD);

if (!process.env.JWT_PASSWORD) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
}

export const JWT_PASSWORD = process.env.JWT_PASSWORD;