import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './routes/index.route'
import authRoutes from './routes/auth.route'
import connectDB from './utils/database'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

app.get("/", (req: Request, res: Response) => {
    res.send("Buku Bersama!");
})

app.use("/api", router)
app.use("/api", authRoutes)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    console.log("Tahap : ",process.env.NODE_ENV)
})

export default app