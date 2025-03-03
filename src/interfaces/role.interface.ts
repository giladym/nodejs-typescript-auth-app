import { Document } from "mongoose";


export interface IRole extends Document {
    name: keyof typeof ERoles;
    permissions: string[];
    grantAll?: boolean; // Indicates whether the role has all permissions by default
}

export enum ERoles {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN'
}