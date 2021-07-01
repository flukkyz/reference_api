require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const dayjs = require('dayjs')
const rfs = require('rotating-file-stream')

const { notFound, handleError } = require('./middlewares')
const routes = require('./routes')

const port = process.env.PORT || 5000;
const apiDir = process.env.API_DIR || '/api';

const app = express()

morgan.token('date', function() {
  var p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
  return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5] );
});

app.use(express.json())
app.use(cors())
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs')
})
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.urlencoded({
  extended: false
}))

app.use(apiDir,routes)

app.use(notFound)
app.use(handleError)

app.listen(port,() => {
    console.log('server run listening on port '+port)
})