import { object, string } from "zod";
import { validatorsRegex } from "../config/validation";

export const createUserSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string"
            })
            .email("Invalid email"),
        password: string({
            required_error: "Password is required",
            })
            .min(6, "Password must be at least 6 characters long"),
        name: string({
            required_error: "Name is required",
            }),
        phoneNumber: string({
                required_error: "Phone number is required",
                invalid_type_error: "Phone number must be a string"
            })
            .regex( validatorsRegex.phoneNumber, "Invalid phone number format")
            .optional(),
        role: string({
            required_error: "Role is required"
        })
    })
})