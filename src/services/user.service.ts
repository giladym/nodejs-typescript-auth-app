import { IUser } from "../interfaces/user.interface";
import ErrorCode from "../errors/config/errorCode.config";
import { BadRequestError } from "../errors";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor( userRepository: UserRepository ) {
        this.userRepository = userRepository;
    }

    // getAllUsers
    public async getAllUsers() {
        try {
            return await this.userRepository.getAllUsers();
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_GET_ERROR, error);
        }
    }

     // getUserById
     public async getUserById(id: string) {
        try {
            return await this.userRepository.getUserById(id);
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_GET_ERROR, error);
        }
     }

     // updateUserById
     public async updateUserById(id: string, user: Partial<IUser>) {
        try {
            const { name, email } = user;
            return await this.userRepository.updateUserById(id, { name, email });
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_UPDATE_ERROR, error);
        }
     }

     // createUser
    public async createUser(user: Partial<IUser>) {
        try {
            // check if user exists
            const existingUser = await this.userRepository.findUser({email: user.email});
            if (existingUser) {
                throw new BadRequestError(null, ErrorCode.USER_ALREADY_EXISTS);
            }
            const {name, email } = user;
            return await this.userRepository.createUser({name, email});
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_CREATE_ERROR, error);
        }        
    }

    // deleteUserById
    public async deleteUserById(id: string) {
        try {
            return await this.userRepository.deleteUserById(id);
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_DELETE_ERROR, error);
        }
    }
}