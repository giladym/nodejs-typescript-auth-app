import { Document, Schema } from "mongoose";

export interface IProfile extends Document {
    firstName?: string;
    lastName?: string;
    age?: number;
    address: string;
    email: string;
    phoneNumber: string;
    userId: Schema.Types.ObjectId;
}