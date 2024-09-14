import { Test } from "../models/test.model.js";
import Submission from "../models/submission.model.js";
import User from "../models/user.model.js";
const getTests = async (req, res) => {
  try {
    const test = await Test.find().select("-questions");

    if (!test) {
      res.status(404).json({ Error: "No Test Present" });
    }
    res.status(200).json(test);
  } catch (err) {
    console.log("Error getTests::test.controller.js ", err.message);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

const getTestsAndQuestions = async (req, res) => {
  try {
    const testId = req.params.testId; //get the testId from frontend
    const testData = await Test.findById(testId).populate({
      path: "questions",
      select: "-correctOption", // Exclude correctOption field
    });
    if (!testData) {
      res.status(404).json({ Error: "No Such test Present" });
    }
    res.status(200).json({ Questions: testData.questions });
  } catch (err) {
    console.log("Error getTestsAndQuestions::test.controller.js ", err.message);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

const submitTest = async (req, res) => {
  try {
    const { email, testId } = req.query;
    // const {selections,endedAt}=req.body
    const user = await User.findOne({ email });
    const userId = user._id;

    const answers = req.body.answers;
    //format the answers to the required answers format
    const selections = answers.map(({ questionId, answer }) => ({
      questionId, // Assuming this is already in the correct format
      option: answer, // Rename 'answer' to 'option'
      savedAt: new Date() // Add current date/time
    }));


    const newsubmission = new Submission({
      testId,
      userId,
      selections,
      endedAt: null,
      isDeleted: false,
    });
    await newsubmission.save();

    res
      .status(200)
      .json({ Success: true, message: "Test Submitted Successfully" });
  } catch (err) {
    console.log("Error :test.controller.js::submitTest", err.message);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

export { getTests, getTestsAndQuestions, submitTest };
