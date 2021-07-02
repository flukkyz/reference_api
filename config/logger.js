const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

morgan.token('date', function() {
  const p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
  return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5] );
});

const accessLogStream = rfs.createStream('access.log', {
  size: "10M",
  maxFiles: 30,
  interval: '1d',
  path: path.join(__dirname, '../logs')
})

module.exports = morgan('combined', { stream: accessLogStream })