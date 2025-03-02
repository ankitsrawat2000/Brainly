import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const userMiddleware = (req: Request, res: Response,
    next: NextFunction) =>{
        const header = req.headers["authorization"];
        try{
            const decoded = jwt.verify(header as string, JWT_PASSWORD) as {id: string}
            req.userId = decoded.id;
            next();
        } catch(error){
            res.status(403).json({
                message: "You are not logged in",
            });
        }
    }

    //override the types of the express request object
