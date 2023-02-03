const customLogger = (serviceName) => {
    return (request, response, next) => {
        const args = request.params;
        console.log(`Task5.1 - Method: ${request.method}, Service: ${serviceName}, URL: ${request.url}, arguments: `, {
            ...args,
        });
        next();
    };
};
export default customLogger;
//# sourceMappingURL=customLogger.js.map