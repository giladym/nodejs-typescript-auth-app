import  ErrorCode from './config/errorCode.config';
import ErrorMessage from './config/errorMessage.config';

abstract class AppError extends Error {
    abstract statusCode: number

    public message: string
    public errorCode: ErrorCode    
    public error: any
    constructor(message: string, errorCode: ErrorCode, statusCode: number, error: any) {
        super(message);
        this.message = this.getMessage(message, errorCode);
        this.errorCode = errorCode;
        this.error = error;
        
    }

    getMessage( message: string, errorCode: ErrorCode) {
        return message || ErrorMessage[errorCode] || ErrorMessage[ErrorCode.INTERNAL_SERVER_ERROR];
    }

    toResponse(nodeEnv: string) {
        return { 
            error: this.message, 
            errorCode: this.errorCode, 
            success: false,
            stack: nodeEnv === 'development' ? this.stack : null
        };
    }
}

export default AppError;