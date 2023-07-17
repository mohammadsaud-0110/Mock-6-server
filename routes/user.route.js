const express=require("express");
const { UserModel }=require("../models/user.model");
require("dotenv").config();
const jwt=require("jsonwebtoken");

const userRouter=express.Router();
userRouter.use(express.json());

userRouter.get("/allusers", async(req,res)=>{
    try {
        const user = await UserModel.find()
        res.status(200).send({"msg":"All registered Users", "data": user});
    } 
    catch (error) {
        res.status(500).send({"msg":"Something went wrong!","error":error.message});
    }
})

userRouter.post("/signup",async(req,res)=>{
    const {email,username}=req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '2hr' })
            res.status(200).send({"msg":"Email already present!", user, token})
        }
        else{
            const user=new UserModel({email,username})
            await user.save();
            const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '2hr' })
            res.status(201).send({"msg":"User Registered Successfully", user,token})
        }
    } 
    catch (error) {
        res.status(500).send({"msg":"Something went wrong","Error":error})
    }
})

module.exports={
    userRouter
}