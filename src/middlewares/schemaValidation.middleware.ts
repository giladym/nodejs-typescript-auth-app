import { Request, Response,NextFunction } from "express";
import { AnyZodObject } from "zod"
import StatusCode from "../errors/config/statusCode.config";


const validateSchema = (schema: AnyZodObject) => 
    async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) :Promise<void> => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params                
            });
            next();
        } catch (error) {   
            const message = error.errorsmap( (err: any) => err.message);
            res.status(StatusCode.BAD_REQUEST).json({ message });
        }
   };

export default validateSchema;
