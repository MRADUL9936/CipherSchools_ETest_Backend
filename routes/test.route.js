import express from 'express';
import {getTests,getTestsAndQuestions,submitTest} from '../controllers/test.controller.js'
import protectRoute from '../middleware/protectRoot.js'
const router=express.Router()

router.route('/').get(getTests)
router.route('/:testId').get(getTestsAndQuestions)
router.route('/submit').post(submitTest)


export default router;
