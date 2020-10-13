const loglevel = require("loglevel");
const log4js = require('log4js');

const getLog = ({ appLogLevel, dir }, name) => {
    // log4js基本配置项
    let appenders = {
        cheese: {
            type: 'dateFile', // 输出日志类型
            filename: `${dir}/log`, // 输出日志路径
            pattern: '-yyyy-MM-dd.log', // 日志文件后缀名 (log-2020-09-24.log)
            alwaysIncludePattern: true
        }
    }
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

const parseLogInfo = ({ request, response }) => {
    const responseData = response.data;
    const host = request.http.headers.get('host');
    const referer = request.http.headers.get('referer');
    const userAgent = request.http.headers.get('user-agent');

    let info = {
        host,
        referer,
        userAgent,
        query: request.query,
        data: responseData
    }
    return JSON.stringify(info);
}

const ReportForbiddenOperationsPlugin = function ReportForbiddenOperationsPlugin(options) {
	const apolloLogger = loglevel.getLogger(`apollo-server:report-forbidden-operations-plugin`);
    const { log } = options;
    const openLog = !log ? false : true;
    if (options.debug === true) apolloLogger.enableAll();

    Object.freeze(options);
    
    let logger;
    if (openLog) {
        logger = getLog({
                env: log.env, 
                appLogLevel: log.appLogLevel, 
                dir: log.dir
            }, 
            'server'
        );
    }
    /**
     * 生命周期requestContext：GraphQLRequestContext
     * https://github.com/apollographql/apollo-server/blob/main/packages/apollo-server-types/src/index.ts
     */
	return () => ({
		requestDidStart(requestContext) {
            //We now know the operation running will be forbidden
            //There will me a max of 1 ForbiddenError per GraphQL Operation
            const { request } = requestContext;
            let clientInfo = {
                name: request.http.headers.get("apollographql-client-name") || "",
                version: request.http.headers.get("apollographql-client-version") || "",
            };
			return {
				didEncounterErrors({ errors, request, operation, operationName, queryHash }) {
					errors.map((error) => {
						if (error) {
							//ForbiddenError Data to be reported
							let forbiddenErrorData = {
								clientInfo,
								operation,
								operationName,
								queryHash,
							};

							//Depending on client identity information attached, you might want to change how you report ForbiddenErrors
							if (forbiddenErrorData.clientInfo.name && forbiddenErrorData.clientInfo.version) {
								apolloLogger.error(`ForbiddenError for ${forbiddenErrorData.clientInfo.name}@${forbiddenErrorData.clientInfo.version}`);
								//Send error to external observability
							} else if (forbiddenErrorData.clientInfo.name) {
								apolloLogger.error(`ForbiddenError for ${forbiddenErrorData.clientInfo.name} with no version attached`);
								//Send error to external observability
							} else {
								apolloLogger.error(`ForbiddenError from unidentified client`);
								//Send error to external observability
							}
						}
					});
                },
                /**
                 * The parsingDidStart event fires whenever Apollo Server will 
                 * parse a GraphQL request to create its associated document AST.
                 */
                parsingDidStart() {
                },
                /**
                 * The validationDidStart event fires whenever Apollo Server will 
                 * validate a request's document AST against your GraphQL schema.
                 */
                validationDidStart() {
                },
                /**
                 * The executionDidStart event fires whenever Apollo Server begins executing 
                 * the GraphQL operation specified by a request's document AST.
                 */
                executionDidStart() {
                },
                /**
                 * The willSendResponse event fires whenever Apollo Server is about to send a response for a
                 * GraphQL operation. This event fires (and Apollo Server sends a response) even if the GraphQL
                 * peration encounters one or more errors.
                 */
                willSendResponse(requestContext) {
                    if (openLog) logger.info(parseLogInfo(requestContext));
                }
			};
        }
	});
}

module.exports = ReportForbiddenOperationsPlugin
