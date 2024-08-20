import { schedule } from 'node-cron';
import Submission from '../models/submission.model.js';
import User from '../models/user.model.js';
import Question from '../models/question.model.js';
import {transporterFromEmailAuth, sendMail} from '../Services/mail.service.js'
import { Test } from '../models/test.model.js';
// Cron job that runs every hour
schedule('0 * * * *', async () => {
  console.log('Running cron job to evaluate tests...');

  try {
    // Retrieve all ungraded submissions
    const ungradedSubmissions = await Submission.find({ isDeleted: false});
    const transporter=transporterFromEmailAuth()       ///create the transport for sending emails
 
    for (const submission of ungradedSubmissions) {
      const { testId, userId, selections } = submission;

      // Logic to evaluate the test based on selections
      const testName=await Test.findById(testId); ///Get the testNameWith TestID
      const score = evaluateTest(selections); 
      // Mark the submission as graded and store the score
      submission.isDeleted = true;
      console.log(score)
      await submission.save();

      // Send email to the user with the score
      const user = await User.findById(userId);
       
////////////////////// user Mail Server here to send mail ///////////////////////////////////
             sendMail(transporter,testName,score,user.email)

      console.log(`Score emailed to user ${user.email}`);
    }
  } catch (error) {
    console.error('Error:: jobs/cronJob.jobs.js ::', error.message);
    res.status(500).json({Error:"Internal Server Error"})
  }
});

// Function to evaluate test (sample)
const evaluateTest = async(selections)=> {
  let score = 0;

  selections.forEach((selection) => {
    if (selection.option === getCorrectAnswer(selection.questionId)) {
      score += selection.marks; // Add the question's marks if correct
    }
  });

  return score;
}

// Function to get correct answer for a question
const getCorrectAnswer= async (questionId)=> {
  // Implement logic to retrieve correct answer based on questionId
  const question=await Question.find({_id:questionId})
  return question.correctOption; //return the correct option of the question
}
