import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import todoRoute from '../backend/routes/todo.routes.js'
import cors from 'cors'

const app = express()
dotenv.config();

app.use(express.json())
app.use(express.urlencoded())
// app.use(cors({
//   origin : "*",
//   credentials : true,
//   methods : "GET,POST,PUT,DELETE",
//   allowedHeaders:["Content-Type","Authorization"]
// }))
app.use(cors());


try {
  mongoose.connect(process.env.MONGODB_URI)
  console.log("Connected to MONGO DB")
} catch (error) {
  console.log("MONGODB ERROR : ",error)
}

app.use("/todo",todoRoute)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})