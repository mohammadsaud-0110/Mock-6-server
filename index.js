const express = require("express");
const { connection } = require('./config/db');
const { userRouter } = require("./routes/user.route");
const { quizRouter } = require("./routes/quiz.route");
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send("home page for Quiz App - Mock - 6");
})

app.use("/user", userRouter);

app.use("/quiz", quizRouter);

app.listen(process.env.PORT, async ()=>{
    try {
        await connection.then(() => {
            console.log(`Successfully connected to DB`);
          }).catch((e) => {
            console.log(`Not connected`);
          });
        console.log("Server :",process.env.PORT);   
    }
    catch(error){
        console.log("Error:",error.message);
    }
})