const winston = require("winston");
const util = require('util');

const combineMessageAndSplat = () => {
    return {transform: (info, opts) => {
            //combine message and args if any
            info.message =  util.format(info.message, ...info[Symbol.for('splat')]  ||  [] )
            return info;
        }
    }
}

const logger = winston.createLogger({
    format:
        winston.format.combine(
            combineMessageAndSplat(),
            winston.format.simple()
        )
});
logger.add(new winston.transports.Console({
        level: 'info'
    })
);
logger.add(new winston.transports.File({ filename: 'errors.log' }));

module.exports = logger;