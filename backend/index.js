const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// const sampleEasy = require('./questions/sampleEasy');
// const sampleMed = require('./questions/sampleMed');
// const sampleHard = require('./questions/sampleHard');

//connect database questionGenerator

mongoose
  .connect("mongodb://127.0.0.1:27017/questionGenerator", {
    //   useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

//define collection
const questionSchema = new mongoose.Schema({
  question: String,
  subject: String,
  difficulty: String,
  marks: Number,
});
const questions = mongoose.model("questions", questionSchema);

//This would be used to create a generator which gives questions according to marks fetched by frontend

app.post("/generate", async (req, res) => {
  const { totalMarks, difficultyDistribution } = req.body;
  const { easy, medium, hard } = difficultyDistribution;


  const totalEasyMarks = easy;
  const totalMediumMarks = medium;
  const totalHardMarks = hard;

  try {
    const easyQuestions = await questions
      .find({ difficulty: "easy", marks: 2 })
      .limit(Math.floor(totalEasyMarks / 2));

    const mediumQuestions = await questions
      .find({ difficulty: "medium", marks: 5 })
      .limit(Math.floor(totalMediumMarks / 5));

    const hardQuestions = await questions
      .find({ difficulty: "hard", marks: 6 })
      .limit(Math.floor(totalHardMarks / 6));

    const selectedQuestions = [
      ...easyQuestions,
      ...mediumQuestions,
      ...hardQuestions,
    ];

    res.json(selectedQuestions);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/", (req, res) => {
  // insertEasy();
  // insertMed();
  // insertHard();
  res.send("Hello from Backend!");
});

app.listen(8000, () => {
  console.log("Connected to backend on port 8000");
});

//This was used to insert questions in database

// const insertEasy = async () => {
//   try {
//     const insertedQuestions = await questions.insertMany(sampleEasy);
//     console.log('Easy Questions Inserted!');
//   } catch (err) {
//     console.error('Error inserting questions:', err.message);
//   }
// };
// const insertMed = async () => {
//   try {
//     const insertedQuestions = await questions.insertMany(sampleMed);
//     console.log('Med Questions Inserted!');
//   } catch (err) {
//     console.error('Error inserting questions:', err.message);
//   }
// };
// const insertHard = async () => {
//   try {
//     const insertedQuestions = await questions.insertMany(sampleHard);
//     console.log('Hard Questions Inserted!');
//   } catch (err) {
//     console.error('Error inserting questions:', err.message);
//   }
// };
