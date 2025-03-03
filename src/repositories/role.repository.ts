import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import { BadRequestError, NotFoundError } from "../errors";
import { IRole } from "../interfaces/role.interface";
import RoleModel from "../models/role.model";
import ErrorCode from "../errors/config/errorCode.config";

export class RoleRepository {
    public async getAllRoles(): Promise<IRole[]> {
        try {
            return await RoleModel.find({});    
        } catch (error) {
            throw new NotFoundError(`Error finding role: ${error.message}`, ErrorCode.ROLE_NOT_FOUND);
        }        
    }

    public async getRoleById( id: string): Promise<IRole | null> {
        try {
            return await RoleModel.findById(id);    
        } catch (error) {
            throw new NotFoundError(`Error finding role: ${error.message}`, ErrorCode.ROLE_NOT_FOUND);
        }   
    }

    public async findRole( 
        query: FilterQuery<IRole>, 
        options: QueryOptions = {lean: true} 
    ): Promise<IRole | null> {
        return await RoleModel.findOne(query, {}, options);
    }   

    public async createRole(
        role: Partial<IRole>    
    ): Promise<IRole> {
        try {
            return await RoleModel.create(role);    
        } catch (error) {
            throw new BadRequestError(`Error creating  role: ${error.message}`, ErrorCode.ROLE_CREATE_ERROR);
        }                
    }   

    public async updateRoleById(
        id: string, 
        update: UpdateQuery<IRole>,
        options: QueryOptions = { new: true }
    ): Promise<IRole> {
        try {
            return await RoleModel.findByIdAndUpdate(id, update, options);  
        } catch (error) {
            throw new BadRequestError(`Error updating  role: ${error.message}`, ErrorCode.ROLE_UPDATE_ERROR);
        }    
    }

    public async deleteRoleById(id: string): Promise<any> {
        try {
            return await RoleModel.deleteOne({ _id: id });    
        } catch (error) {
            throw new BadRequestError(`Error deleting role: ${error.message}`, ErrorCode.ROLE_DELETE_ERROR)
        }
    }
}