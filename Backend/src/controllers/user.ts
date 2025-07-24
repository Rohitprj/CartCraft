import User from "../models/userSchems";
import jwt from "jsonwebtoken";
import { Request , Response } from "express";

const generateTokens = (user:any)=>{
    const accessToken = jwt.sign(
        { userId : user?._id},
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn:"2d"}
    )
    const refreshToken = jwt.sign(
        { userId : user?._id},
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn:"7d"}
    )
    return {accessToken,refreshToken};
}
 const loginOrSignup = async (req:Request, res:Response) => {
  const { address, phone } = req.body;
  try {
     let user = await User.findOne({phone});

     if(!user){
           user = new User({address,phone});
     }else{
        user.address = address;
    }
    await user.save();
  
      const {accessToken,refreshToken} = generateTokens(user.toObject());

      res.status(200).json({user,accessToken,refreshToken});

  } catch (error:unknown) {
    const err = error as Error
    res.status(500).json({error:err.message})
  }
};

export  {loginOrSignup};
