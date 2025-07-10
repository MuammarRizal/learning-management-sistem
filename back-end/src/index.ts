import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './routes/index.routes'
import awsServerlessExpress from 'aws-serverless-express'
import { APIGatewayProxyEvent, Context, Handler } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'

dotenv.config()

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

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`)
// })

const server = createServer(app)

export const handler = (
    event: APIGatewayProxyEvent,
    context: Context
  ): void => {
    context.callbackWaitsForEmptyEventLoop = false
    awsServerlessExpress.proxy(server, event, context)
  }
  