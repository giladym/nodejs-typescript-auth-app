import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import UserModel from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { BadRequestError, NotFoundError } from "../errors";
import ErrorCode from "../errors/config/errorCode.config";
export class UserRepository {

    public async getAllUsers() {
        try {
            return await UserModel.find({});
        } catch (error) {
            throw new NotFoundError(`Error finding user: ${error.message}`, ErrorCode.USER_NOT_FOUND);
        }
    }

    public async getUserById(id: string) {
        try {
            return await UserModel.findById(id);
        } catch (error) {
            throw new NotFoundError(`Error finding user: ${error.message}`, ErrorCode.USER_NOT_FOUND);
        }
    }

    public async findExtendedUserById(id: string) {
        try {
            return await UserModel.findById(id).populate('role').exec();
        } catch (error) {
            throw new NotFoundError(`Error finding user: ${error.message}`, ErrorCode.USER_NOT_FOUND);
        }
    }

    public async findUser( 
        query: FilterQuery<IUser>, 
        options: QueryOptions = {lean: true}
        ): Promise<IUser | null> {
            try {
                return await UserModel.findOne(query, {}, options);    
            } catch (error) {
                throw new NotFoundError(`Error finding user: ${error.message}`, ErrorCode.USER_NOT_FOUND);
            }
    }

    public async createUser(user: Partial<IUser>) {
        try {
            console.log('user: ', user.role);
            return await UserModel.create(user);
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_CREATE_ERROR);
        }
    }

    public async updateUserById(
        id: string,
        update: UpdateQuery<IUser>,
        options: QueryOptions = { new: true }
    ) {
        try {
            return await UserModel.findByIdAndUpdate(id, update, options);
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_UPDATE_ERROR);
        }
    }

    public async deleteUserById(id: string) {
        try {
            return await UserModel.deleteOne({ _id: id });
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_DELETE_ERROR);
        }
    }
}
