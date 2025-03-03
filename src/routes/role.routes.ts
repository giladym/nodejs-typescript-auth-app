import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { RoleService } from "../services/role.service";
import { RoleRepository } from "../repositories/role.repository";

const router = Router();

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

router.post("/", roleController.createRole);
router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);
router.put("/:id", roleController.updateRoleById);
router.delete("/:id", roleController.deleteRoleById);

export default router;