const ApiError = (statusCode, message = "Something went wrong", errors = [], stack = "") => {
    const error = new Error(); 
    error.message = message;    
    error.statusCode = statusCode; 
    error.data = null;        
    error.success = false;      
    error.errors = errors;      
    if (!stack) {
        Error.captureStackTrace(error, ApiError);
    } else {
        error.stack = stack; 
    }

    return error; 
};

export { ApiError };
