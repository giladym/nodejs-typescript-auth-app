import bcrypt from 'bcryptjs';
import { env } from "../config/enviroment";
import { generateRandom6DigitString } from "../utils/util";
import { IUser } from "../interfaces/user.interface";
import { ERoles } from "../interfaces/role.interface";
import ErrorCode from "../errors/config/errorCode.config";
import { BadRequestError } from "../errors";
import { UserRepository } from "../repositories/user.repository";
import { RoleService } from "./role.service";

export class AuthService {
    private userRepository: UserRepository;
    private roleService: RoleService;

    constructor( userRepository: UserRepository, roleService: RoleService ) {
        this.userRepository = userRepository;        
        this.roleService = roleService;
    }
   
    public async registerUser(user: Partial<IUser>) {
        try {            
            // check if user exists
            const existingUser = await this.userRepository.findUser({email: user.email});
            if (existingUser) {
                throw new BadRequestError(null, ErrorCode.USER_ALREADY_EXISTS);
            }

            // set role             
            const roles = await this.roleService.getAllRoles();
            const role = roles.find(r => r.name === ERoles.SUPER_ADMIN);

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(user.password, salt);
            
            // Generate OTP code
            const code = generateRandom6DigitString();
            const verificationExpires = (env().verificationExpires ?? 30) * 1000 * 60;
            
            console.log("RegisterUser user: ", user);
            console.log("RegisterUser role: ", role);
            return await this.userRepository.createUser({
                ...user,
                role: role,
                password: hashPassword,
                OTPCode: code,
                OTPCodeExpires: Date.now() + verificationExpires,
            });
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_CREATE_ERROR, error);
        }        
    }

    // deleteRoleById
    public async deleteUserById(id: string) {
        try {
            return await this.userRepository.deleteUserById(id);
        } catch (error) {
            throw new BadRequestError(error.message, ErrorCode.USER_DELETE_ERROR, error);
        }
    }
}