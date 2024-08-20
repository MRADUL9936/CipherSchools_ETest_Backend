import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { connectToMongoDb } from './db/connectToMongodb.js';
import authrouter from './routes/auth.route.js'
import testroute from './routes/test.route.js'

import './jobs/cronJob.jobs.js'

dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/user",authrouter)
app.use("/Test",testroute)



connectToMongoDb().then(()=>{
    app.listen(process.env.PORT||3000,()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
})
}).catch((err)=>{
    console.log("error connecting to database",err.message)
})