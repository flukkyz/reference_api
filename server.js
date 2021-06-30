require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { notFound, handleError } = require('./middlewares')
const routes = require('./routes')

const port = process.env.PORT || 3000;

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({
  extended: false
}))

app.use('/api',routes)

app.use(notFound)
app.use(handleError)

app.listen(port,() => {
    console.log('server run listening on port '+port)
})