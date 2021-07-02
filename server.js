require('dotenv').config()
const express = require('express')
const cors = require('cors')

const { notFound, handleError } = require('./middlewares')
const routes = require('./routes')
const logger = require('./config/logger')

const port = process.env.PORT || 5000;
const apiDir = process.env.API_DIR || '/api';

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger)
app.use(express.urlencoded({
  extended: false
}))

app.use(apiDir,routes)

app.use(notFound)
app.use(handleError)

app.listen(port,() => {
    console.log('server run listening on port '+port)
})