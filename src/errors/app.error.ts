import  ErrorCode from './config/errorCode.config';

abstract class AppError extends Error {
    abstract statusCode: number

    public message: string
    public errorCode: ErrorCode    
    public error: any
    constructor(message: string, errorCode: ErrorCode, statusCode: number, error: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.error = error;
        
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