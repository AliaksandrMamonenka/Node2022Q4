const errorHandler = (error, request, response, next) => {
    const { name, message, stack } = error;
    console.error(`Error log: ${name}, ${message}, ${stack}`);
    response.status(500).json(error);
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map