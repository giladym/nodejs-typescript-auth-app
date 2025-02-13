import StatusCode from "./config/statusCode.config";
import ErrorCode from "./config/errorCode.config";
import AppError from "./app.error";


class NotFoundError extends AppError {
    public statusCode: number = StatusCode.NOT_FOUND;
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, StatusCode.NOT_FOUND, null);
    }
}

export default NotFoundError;