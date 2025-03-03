import { boolean, object, string } from "zod"


export const createRoleSchema = object({
    body: object({
        name: string({ required_error: "Name is required" }),
        permissions: string({ required_error: "Permissions are required" }),
        grantAll: boolean().optional()        
    })
})