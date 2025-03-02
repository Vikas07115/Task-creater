class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // Fixed variable name (was incorrectly "Message")
        this.statusCode = statusCode; // Fixed variable name (was "statuscode")
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Example of specific error handling (modify as needed)
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}: ${err.value}`;
        err = new ErrorHandler(message, 400);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;
