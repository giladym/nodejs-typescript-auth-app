import AppError from "./app.error";
import ErrorCode from "./config/errorCode.config";
import StatusCode from "./config/statusCode.config";

class InternalServerError extends AppError {
    public statusCode: number = StatusCode.INTERNAL_SERVER_ERROR;

    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, StatusCode.INTERNAL_SERVER_ERROR, null);
    }
}   

export default InternalServerError;