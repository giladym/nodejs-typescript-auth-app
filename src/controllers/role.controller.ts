import { Request, Response, NextFunction } from "express";
import { RoleService } from "../services/role.service";

export class RoleController {
    private roleService: RoleService;

    constructor(roleService: RoleService) {        
        this.roleService = roleService;
    }

    // getAllRoles
    public getAllRoles = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const roles = await this.roleService.getAllRoles();
            res.status(200).json({data: roles, success: true}).send();
        } catch (error) {
            next(error);
        }
    }

    // getRoleById
    public getRoleById = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const role = await this.roleService.getRoleById(req.params.id);
            res.status(200).json({data: role, success: true}).send();
        } catch (error) {
            next(error);
        }
    }

    // updateRoleById
    public updateRoleById = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const role = await this.roleService.updateRoleById(req.params.id, req.body);
            res.status(200).json({data: role, success: true}).send();
        } catch (error) {
            next(error);
        }
    }

    /**
     * Creates a new role in the system.
     * 
     * @param role - The role information to be created.
     * @returns The created role object.
     * @throws BadRequestError if the role already exists or there is an error creating the role.
     * 
     * @example
     * POST /api/roles
     * const rolePayload = {        {
            "name":"SUPER_ADMIN",
            "permissions": ["users:view", "users:create", "users:update", "users:delete"],
            "grantAll": true
        }
     */
    public createRole = async (req: Request, res: Response, next: NextFunction) => { 
        try {      
            const role = await this.roleService.createRole(req.body);
            res.status(201).json({data: role, success: true}).send();
        } catch (error) {
            next(error);
        }
    }

    
    // deleteRoleById
    public deleteRoleById = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const role = await this.roleService.deleteRoleById(req.params.id);
            res.status(200).json({data: role, success: true}).send();
        } catch (error) {
            next(error);
        }
    }
}