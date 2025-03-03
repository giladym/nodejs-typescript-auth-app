import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { ForbiddenError, NotFoundError, UnAuthenticatedError } from "../errors";
import ErrorCode from "../errors/config/errorCode.config";
import { IUserMessage, IUserDataType } from "../interfaces/user.interface";
import { env } from "../config/enviroment";
import { extractTokenFromHeader } from "../utils/util";
import { findExtendedUserById } from "../repositories/user.repository";




const authJWT = (req: IUserMessage, res: Response, next: NextFunction) => {
   try {
        const jwtConfig = env().jwtconfig;
        const token = extractTokenFromHeader(req);    
        if (!token) {
            return next(new UnAuthenticatedError("Provide token",ErrorCode.TOKEN_NOT_FOUND));
        }
        jwt.verify(token, jwtConfig, async (err, decoded) => {
            if (err) {
                return next(new ForbiddenError("Invalid token",ErrorCode.TOKEN_EXPIRE));         
            }
            const decodedToken = decoded as IUserDataType;
            const user = await findExtendedUserById(decodedToken.userId);
            if (!user) {
                return next(new NotFoundError("User not found",ErrorCode.USER_NOT_FOUND));
            }
            req.userData = {
                userId: user._id,
                permission: user.role?.permissions,
                role: user.role
            } as IUserDataType;
            next();
        });        
    } catch (err) {
        throw new UnAuthenticatedError("Provide token", ErrorCode.TOKEN_NOT_FOUND);
    }
};

export default authJWT;