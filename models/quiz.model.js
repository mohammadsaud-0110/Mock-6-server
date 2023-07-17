const mongoose = require('mongoose');

const quizSchema=mongoose.Schema({
    creator: { type:String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      questions: [{
        title: String ,
        answerOptions: [{ type: String}],
        correctOptions: [{type: Number}]
      }],
      leaderboard: [{
        email : String,
        score: Number
      }]
})

const QuizModel =new mongoose.model('quiz',quizSchema)

module.exports={
    QuizModel
}