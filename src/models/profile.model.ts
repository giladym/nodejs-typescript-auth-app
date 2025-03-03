import  mongoose, { Schema } from "mongoose";
import { IProfile } from "../interfaces/profile.interface";
import { validators } from "../config/validation";

const profileSchema = new mongoose.Schema<IProfile>({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number, min: [0, "Age must be greater than 0"] },
    address: { type: String },
    email: { 
        type: String, 
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        validate: {
            validator: validators.email,
            message: props => `${props.value} is not a valid email`
        }
     },
    phoneNumber: { 
        type: String, 
        unique: [true, "Phone number already exists"],
        validate: {
            validator: validators.phoneNumber,
            message: props => `${props.value} is not a valid phone number`
        }},
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: [true, "User ID is required"],
        unique: true,
        index: true
    },
}, { timestamps: true });

export default mongoose.model<IProfile>("Profile", profileSchema);