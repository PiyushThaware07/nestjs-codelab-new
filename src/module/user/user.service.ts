import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { In, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdateUserDTO } from "./dto/update.user.dto";
import { filter, find, map } from "rxjs";
import { create } from "domain";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }




    async getUsers() {
        return await this.userRepository.find();
    }



    async getUserById(userId: string): Promise<UserEntity> {
        const existingUser = await this.userRepository.findOne({ where: { id: userId } });
        if (!existingUser) throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        return existingUser;
    }



    async createUser(payload: CreateUserDTO): Promise<string> {
        const { email } = payload;
        const existingUser = await this.userRepository.findOne({ where: { email: email } });
        if (existingUser) throw new HttpException("user already exist", HttpStatus.CONFLICT);
        const newUser = this.userRepository.create(payload);
        await this.userRepository.save(newUser);
        return "created successfully!"
    }

    async createBulkUser(userId: string, payload: CreateUserDTO[]): Promise<string> {
        if (!Array.isArray(payload) || payload.length === 0) throw new HttpException("Invalid Payload", HttpStatus.BAD_REQUEST);
        const extractEmails = payload.map((user) => user.email);
        const existingUsers = await this.userRepository.find({
            where: { email: In(extractEmails) },
            select: ["email"]
        })
        const existingUserEmailsSet = new Set(existingUsers.map(user => user.email));
        // Filter out users that already exist
        const newUsers = payload.filter(user => !existingUserEmailsSet.has(user.email));
        if (newUsers.length === 0) throw new HttpException("All users already exist", HttpStatus.CONFLICT);
        // Create user entities
        const userEntities = this.userRepository.create(newUsers.map(user => ({
            ...user,
            created_by: userId,
        })));
        await this.userRepository.save(userEntities);
        return "Bulk users created successfully!";
    }



    async updateUserById(userId: string, payload: UpdateUserDTO): Promise<string> {
        const existingUser = await this.userRepository.findOne({ where: { id: userId } });
        if (!existingUser) throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        await this.userRepository.update(existingUser.id, payload);
        return "update successfully!";
    }


    async deleteUserById(userId: string): Promise<string> {
        const existingUser = await this.userRepository.findOne({ where: { id: userId } });
        if (!existingUser) throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        await this.userRepository.delete(existingUser.id);
        return "delete successfully!";
    }
}