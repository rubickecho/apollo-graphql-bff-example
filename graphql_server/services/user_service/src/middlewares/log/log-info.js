const logInfo = (ctx, message, commonInfo) => {
    const {
        method, //请求方法
        url, //请求地址
        host, //客户端host
        headers //请求头
    } = ctx.request;
    const client = {
        method,
        url,
        host,
        message,
        referer: headers['referer'], //请求的源地址
        userAgent: headers['user-agent'] // 客户端信息、设备、浏览器信息
    }

    return JSON.stringify(Object.assign(commonInfo, client));
}

module.exports = logInfo;