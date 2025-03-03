import AppError from "./app.error";
import ErrorCode from "./config/errorCode.config";
import StatusCode from "./config/statusCode.config";

class UnAuthenticatedError extends AppError {
    public statusCode: number = StatusCode.UNAUTHORIZED;
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, StatusCode.UNAUTHORIZED, null);
    }
}

export default UnAuthenticatedError;