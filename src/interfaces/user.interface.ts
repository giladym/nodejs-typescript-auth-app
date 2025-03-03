import { Document } from "mongoose";
import  { Request } from "express";
import { IRole } from "./role.interface";

export interface IUser extends Document {
    password: string;
    phoneNumber: string;
    email: string;
    name: string;
    isActive: boolean;
    OTPCode?: string;
    OTPCodeExpires?: number;
    passwordResetCode?: string;
    role: IRole;
}


export interface IUserDataType {
    userId: string;
    permission?: IRole["permissions"]
    role?: IRole
}

export interface IUserMessage<TParams = any, TQuery = any, TBody = any> extends Request<TParams, TQuery, TBody> {
    userData: IUserDataType;
}

export type ExtendedUser = IUser & {
    permission?: IRole
}