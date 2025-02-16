import AppError from "./app.error";
import ErrorCode from "./config/errorCode.config";
import StatusCode from "./config/statusCode.config";

class ForbiddenError extends AppError {
    public statusCode: number = StatusCode.FORBIDDEN
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, StatusCode.FORBIDDEN, null);        
    }
}

export default ForbiddenError;