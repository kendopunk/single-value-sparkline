/**
 * The server is primarily used for initial Looker authentication
 */
import express, { Request, Response } from 'express'
import cors from 'cors'
import lookerLoginHandler from './lookerLoginHandler'
import runQueryHandler from './runQueryHandler'
import createSSOEmbeUrlHandler from './createSSOEmbeUrlHandler'
import getUserByIdHandler from './getUserByIdHandler'

const { PORT = 3000 } = process.env
const app = express()
app.use(express.json())
app.use(cors())

// health check / test
app.get('/', (_req: Request, res: Response) => {
  res.send({
    message: 'hello world'
  })
})

app.get('/login', lookerLoginHandler)
app.post('/query', runQueryHandler)
app.post('/sso_embed_url', createSSOEmbeUrlHandler)
app.post('/user_by_id', getUserByIdHandler)

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT)
})
