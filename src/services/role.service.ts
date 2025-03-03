import { IRole } from "../interfaces/role.interface";
import ErrorCode from "../errors/config/errorCode.config";
import { BadRequestError } from "../errors";
import { RoleRepository } from "../repositories/role.repository";

export class RoleService {
    private roleRepository: RoleRepository;

    constructor( roleRepository: RoleRepository ) {
        this.roleRepository = roleRepository;
    }

    // getAllRoles
    public async getAllRoles() {
        try {
            return await this.roleRepository.getAllRoles();
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.ROLE_GET_ERROR, error);
        }
    }

     // getRoleById
     public async getRoleById(id: string) {
        try {
            return await this.roleRepository.getRoleById(id);
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.ROLE_GET_ERROR, error);
        }
     }

     // updateRoleById
     public async updateRoleById(id: string, role: Partial<IRole>) {
        try {
            const { name, permissions } = role;
            return await this.roleRepository.updateRoleById(id, { name, permissions });
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.ROLE_UPDATE_ERROR, error);
        }
     }

    public async createRole(role: Partial<IRole>) {
        console.log(' role service1: ', role);
        try {
            // Check if the role already exists
            const existingRole = await this.roleRepository.findRole({ name: role.name });
            if (existingRole) {
                throw new BadRequestError(null, ErrorCode.ROLE_ALREADY_EXISTS);
            }

            const { name, permissions } = role;
            console.log(' role service: ', name, permissions);

            // Create a new role in the repository
            return await this.roleRepository.createRole({ name, permissions });
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.ROLE_CREATE_ERROR, error);
        }        
    }

    // deleteRoleById
    public async deleteRoleById(id: string) {
        try {
            return await this.roleRepository.deleteRoleById(id);
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.ROLE_DELETE_ERROR, error);
        }
    }
}