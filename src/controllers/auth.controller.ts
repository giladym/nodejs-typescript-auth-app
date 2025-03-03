import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { registerUserInput } from "../validations/auth.validation";
export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public regiaterUser = async (req: Request<object, object, registerUserInput>, res: Response, next: NextFunction) => {
        try {            
            const user = await this.authService.registerUser(req.body);
            // TODO:: send email
            res.status(200).json({data: user, success: true}).send();
        } catch (error) {
            next(error);
        }
    }
}