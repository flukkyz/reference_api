const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

morgan.token('level', () => {
  return 'info';
});

const accessLogStream = rfs.createStream('access.log', {
  size: "10M",
  maxFiles: 30,
  interval: '1d',
  path: path.join(__dirname, '../logs')
})

module.exports = morgan('combined', { stream: accessLogStream })