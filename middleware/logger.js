const winston = require('winston');
const path = require('path');
const expressWinston = require('express-winston');

const logDir = 'logs';

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'request.log') }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'error.log') }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
