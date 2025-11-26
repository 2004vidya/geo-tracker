import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET as string;

export function signtoken(payload:any){
    return jwt.sign(payload,SECRET,{expiresIn:"7d"})
}

export function verifytoken(token:string){
    try{
        return jwt.verify(token,SECRET);
    }
    catch(error){
        return null;
    }
}