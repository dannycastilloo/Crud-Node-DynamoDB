import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import contact from './routes.js'

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.get("/", (req, res)=>{
    res.json({"Hi":"Hello World"})
})

app.use('/api', contact)

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
});

