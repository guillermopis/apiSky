/**
 * Created by dvicente@solidgear.es on 10/11/2017
 */
'use strict'

var winston = require('winston');

//generamos un espacio entre cada http-context de la peticion anterior y nueva
var getNamespace = require('continuation-local-storage').getNamespace;

var winstonLogger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'debug',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp: true
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true
    })
  ],
  exitOnError: false
});

winstonLogger.stream = {
    write: function (message, encoding) {
        winstonLogger.info(message);
    }
};


// Wrap Winston logger to print reqId in each log
var formatMessage = function(message) {
    var myRequest = getNamespace('peticion');
    message = myRequest && myRequest.get('reqId') ? message + " reqId: " + myRequest.get('reqId') : message;
    //console.log(myRequest.get('reqId'));
    return message;
};


var logger = {
    //método formatMessage que se encarga de hacer la magia
    log: function(level, message) {
        winstonLogger.log(level, formatMessage(message));
    },
    error: function(message) {
        winstonLogger.error(formatMessage(message));
    },
    warn: function(message) {
        winstonLogger.warn(formatMessage(message));
    },
    verbose: function(message) {
        winstonLogger.verbose(formatMessage(message));
    },
    info: function(message) {
        winstonLogger.info(formatMessage(message));
    },
    debug: function(message) {
        winstonLogger.debug(formatMessage(message));
    },
    silly: function(message) {
        winstonLogger.silly(formatMessage(message));
    }
};

module.exports = logger;
