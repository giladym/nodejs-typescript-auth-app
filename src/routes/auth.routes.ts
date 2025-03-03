import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { RoleService } from "../services/role.service";
import { RoleRepository } from "../repositories/role.repository";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import validateSchema from "../middlewares/schemaValidation.middleware";
import { registerUserSchema } from "../validations/auth.validation";

const router = Router();

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const authService = new AuthService(userRepository, roleService);
const authController = new AuthController(authService);

const validationMiddleware = validateSchema(registerUserSchema);

router.post("/register", validationMiddleware, authController.regiaterUser);


export default router;