const express=require("express");
const { QuizModel } = require("../models/quiz.model");
require("dotenv").config();
const quizRouter=express.Router();

//get all quiz
quizRouter.get("/getAll", async(req,res)=>{
    try {
        const quiz = await QuizModel.find();
        res.status(200).send({"msg":"All Quiz", quiz});
    } 
    catch (error) {
        res.status(500).send({"msg":"Something went wrong!","error":error.message});
    }
})

//get one quiz by Quiz_ID
quizRouter.get("/getOne/:id", async(req,res)=>{
    try {
        const quiz = await QuizModel.findById(req.params.id);
        res.status(200).send({"msg":"Quiz found", quiz});
    } 
    catch (error) {
        res.status(500).send({"msg":"Something went wrong!","error":error.message});
    }
})

//get all quiz of particular creator
quizRouter.get("/getOne/:email", async(req,res)=>{
    try {
        const quiz = await QuizModel.find({creator :req.params.email});
        res.status(200).send({"msg":"Quiz found", quiz});
    } 
    catch (error) {
        res.status(500).send({"msg":"Something went wrong!","error":error.message});
    }
})

//delete quiz by id
quizRouter.delete("/:id", async(req,res)=>{
    try {
        await QuizModel.findByIdAndDelete(req.params.id);
        res.status(200).send({"msg":"Quiz DEleted"});
    } 
    catch (error) {
        res.status(500).send({"msg":"Something went wrong!","error":error.message});
    }
})

//update quiz by id, Title and Description only
quizRouter.patch('/update/:id', async(req,res) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        await QuizModel.findByIdAndUpdate(id, payload);
        res.status(200).send({"msg":"Quiz details updated"});
    } 
    catch (error) {
        res.status(500).send({"msg":"Something went wrong!","error":error.message});
    }
})

//POST new Quiz
quizRouter.post("/createQuiz", async (req,res) => {
    try {
            const newQ = new QuizModel(req.body);
            await newQ.save();
            res.status(201).send({"msg":"Quiz created Successfully!"});
    } 
    catch (error) {
        res.status(500).send({"msg":"Something went wrong!","Error":error})
    }
})

//new score pushed into leaderboard of particular quiz by Quiz_ID
quizRouter.patch("/newScore/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const quiz = await QuizModel.findById(id);
        quiz.leaderboard.push(payload);
        await quiz.save();
        res.status(200).send({"msg":"New Score Added", quiz});
    } 
    catch (error) {
        res.status(500).send({"msg":"Something went wrong!","error":error.message});
    }
})


module.exports = {
    quizRouter
}