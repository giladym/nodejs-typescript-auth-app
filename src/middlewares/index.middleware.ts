import { NextFunction, Request, Response } from 'express';

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
}

export function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err?.message,
        stack: process.env.NODE_ENV === 'production' ? 'No Stack' : err.stack,
    });
}