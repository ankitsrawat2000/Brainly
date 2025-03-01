// const LOCALBE_SERVER = "http://localhost:3000";
// export const BACKEND_URL = typeof LOCALBE_SERVER === 'undefined' ? process.env.NEXT_PUBLIC_BACKEND_URL : LOCALBE_SERVER;

// const LOCALFE_SERVER = "http://localhost:5173";
// export const FRONTEND_URL = typeof LOCALFE_SERVER === 'undefined' ? process.env.NEXT_PUBLIC_FRONTEND_URL : LOCALFE_SERVER;
import dotenv from 'dotenv';
dotenv.config();



console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

if (!process.env.JWT_PASSWORD) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
}

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

// export const BACKEND_URL = "http://localhost:3000";
// export const FRONTEND_URL = "http://localhost:5173";