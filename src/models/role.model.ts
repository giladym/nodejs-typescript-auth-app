import mongoose, { model, Schema } from "mongoose";
import { IRole } from "../interfaces/role.interface";

const roleSchema = new mongoose.Schema<IRole>({
    name: { type: String, required: [true, "Name is required"], unique: true, index: true },
    permissions: { type: [String], required: [true, "Permissions are required"] },
    grantAll: { type: Boolean, default: false }
}, { timestamps: true });

export default model<IRole>("Role", roleSchema);