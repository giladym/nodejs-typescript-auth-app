import { object, string, number } from "zod";
import { validatorsRegex } from "../config/validation";

export const createProfileSchema = object({
    body: object({
        firstName: string().optional(),
        lastName: string().optional(),
        age: number().min(0, { message: "Age must can't be negative"}).optional(),
        address: string().optional(),
        email: string({ required_error: "Email is required"}).email("Invalid email format"),
        phoneNumber: string().regex( validatorsRegex.phoneNumber, "Invalid phone number format").optional(),
        userId: string({ required_error: "User ID is required" })   
    })
})