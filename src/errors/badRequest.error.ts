import AppError from "./app.error";
import ErrorCode from './config/errorCode.config';
import StatusCode from './config/statusCode.config'; 

class BadRequestError extends AppError {
    public statusCode: number = StatusCode.BAD_REQUEST;
    constructor(message: string, errorCode: ErrorCode, error?: any) {
        super(message, errorCode, StatusCode.BAD_REQUEST, error);        
    }
}

export default BadRequestError;