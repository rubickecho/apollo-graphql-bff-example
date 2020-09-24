const log4js = require('log4js');
const logInfo = require('./log-info');

const getLog = ({ env, appLogLevel, dir }, name) => {
    // log4js基本配置项
    let appenders = {
        cheese: {
            type: 'dateFile', // 输出日志类型
            filename: `${dir}/log`, // 输出日志路径
            pattern: '-yyyy-MM-dd.log', // 日志文件后缀名 (log-2020-09-24.log)
            alwaysIncludePattern: true
        }
    }

    // 如果是开发环境，则在控制台打印信息
    // if (env === 'development') { appenders.out = {type: "stdout"}; }

    // log4js配置
    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }

    log4js.configure(config);

    return log4js.getLogger(name)
}

const logger = (options) => {
    const contextLogger = {};
    const { env, appLogLevel, dir, serverIp, projectName } = Object.assign({}, options || {});
    const commonInfo = { projectName, serverIp };
    const logger = getLog({env, appLogLevel, dir}, 'cheese');

    return async(ctx, next) => {
        const start = Date.now();
        const methods = ['info', 'warn', 'error', 'debug', 'trace'];
        methods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                logger[method](logInfo(ctx, message, commonInfo));
            }
        })

        ctx.log = contextLogger;

        await next();

        const responseTime = Date.now() - start;

        logger.info(logInfo(ctx, {responseTime: `响应时间为${responseTime/1000}s`}, commonInfo));
    }
}

module.exports = logger