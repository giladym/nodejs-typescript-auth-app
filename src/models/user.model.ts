import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { validators } from "../config/validation";


const userSchema = new Schema<IUser>({
    password: {
        type: String,
        minlength: [ 6, 'Password must be at least 6 characters long' ],
        required: [ true, 'Password is required' ],
        select: false
    },
    phoneNumber: {
        type: String,
        unique: true,
        validate: {
            validator:  validators.phoneNumber,
            message: props => `${props.value} is not a valid phone number`
        }        
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'Email is required' ],
        validate: {
            validator: validators.email,
            message: props => `${props.value} is not a valid email`
        }        
    },
    name: {
        type: String,
        required: [ true, 'Name is required' ]
    },
    isActive: {
        type: Boolean,
        default: false
    },
    OTPCode: {
        type: String,
        select: false,
      },
    OTPCodeExpires: {
    type: Number,
    select: false,
    },
    passwordResetCode: {
        type: String,
        select: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Role is required'],
    }
}, { timestamps: true });

export default model<IUser>('User', userSchema);