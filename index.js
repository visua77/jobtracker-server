import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import jobsRoute from './routes/jobs.js'
dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))

app.use('/api/users',authRoute)
app.use('/api/users/jobs',jobsRoute)


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECT_DB, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> app.listen(PORT, ()=> console.log('Server running on port 5000'))).catch((error)=>console.log(error.message))

mongoose.set('useFindAndModify',false)




