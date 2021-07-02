const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

if(process.env.NODE_ENV === 'development'){
  morgan.token('date', () => {
    const p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
    return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5] );
  });
}

morgan.token('level', () => {
  return 'info';
});

const accessLogStream = rfs.createStream('access.log', {
  size: "10M",
  maxFiles: 30,
  interval: '1d',
  path: path.join(__dirname, '../logs')
})

module.exports = morgan(':level :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms', { stream: accessLogStream })