import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { env } from '../config/enviroment';
import AppError from '../errors/app.error';
import StatusCode from '../errors/config/statusCode.config';
import ErrorMessage from '../errors/config/errorCode.config';
import ErrorCode from '../errors/config/errorCode.config';

const ErrorHandlerMiddleware : ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    // Handle all App Errors
    if (err instanceof AppError) {
        res.status(err.statusCode)
        .json( err.toResponse( env().nodeEnv) );
        return;
    }

    // Handle MongoDB validation errors
    if (err instanceof mongoose.Error.ValidationError) {
        res.status(StatusCode.BAD_REQUEST)
        .json({
            error: ErrorMessage[ErrorCode.VALIDATION_ERROR],
            errorCode: ErrorCode.VALIDATION_ERROR,
            success: false,
            details: err.errors,
        });
        return;
    }

    // Handle MongoDB duplicate key errors
    if (err.code && err.code === 11000) {
        res.status(StatusCode.CONFLICT)
        .json({
            error: ErrorMessage[ErrorCode.DUPLICATE_KEY_ERROR],
            errorCode: ErrorCode.DUPLICATE_KEY_ERROR,
            success: false,
            message: 'A record with that value already exists.',
        });
        return;
    }

      // Handle MongoDB cast errors
      if (err.name === 'CastError') {
        res.status(StatusCode.BAD_REQUEST)
        .json({
            error: ErrorMessage[ErrorCode.CAST_ERROR],
            errorCode: ErrorCode.CAST_ERROR,
            success: false,
            message: 'Invalid data type provided for a resource identifier.',
        });
        return;
    }

    // Handle other MongoDB errors
    if (err instanceof mongoose.Error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({
            error: ErrorMessage[ErrorCode.MONGODB_ERROR],
            errorCode: ErrorCode.MONGODB_ERROR,
            success: false,
            message: 'An error occurred with the MongoDB database.',
        });
        return;
    }

    // Handle unknown errors (fallback)
    res.status(StatusCode.INTERNAL_SERVER_ERROR)
    .json({
        error: ErrorMessage[ErrorCode.INTERNAL_SERVER_ERROR],
        errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'An unexpected error occurred.',
    });
   
};

export default ErrorHandlerMiddleware;