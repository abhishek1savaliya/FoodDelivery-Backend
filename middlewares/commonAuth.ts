import { Request, Response, NextFunction } from "express";
import { authPayload } from '../dto/auth.dto';
import { validateSignature } from "../utility";

declare global {
    namespace Express{
        interface Request{
            user?: authPayload
        }
    }
}

export const authenticate = async(req: Request, res: Response, next: NextFunction)=>{

   const validate = await validateSignature(req)

   if(validate){
        next()
   }
   else{
    res.json({message:"user not Authorize"})
   }
     
}