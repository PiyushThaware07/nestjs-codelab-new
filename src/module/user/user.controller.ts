import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdateUserDTO } from "./dto/update.user.dto";


@ApiTags("user")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Get()
    async getUsers(): Promise<UserEntity[]> {
        return await this.userService.getUsers();
    }



    @Get(":userId")
    async getUserById(@Param("userId") userId: string): Promise<UserEntity> {
        return await this.userService.getUserById(userId);
    }


    @Post()
    async createUser(@Body() payload: CreateUserDTO): Promise<string> {
        return await this.userService.createUser(payload);
    }


    @Post("bulk")
    async createBulkUser(@Body() payload: CreateUserDTO[], @Request() req): Promise<string> {
        const userId = req.user.id;
        return await this.userService.createBulkUser(userId, payload);
    }





    @Put(":userId")
    async updateUserById(
        @Param("userId") userId: string,
        @Body() payload: UpdateUserDTO): Promise<string> {
        return await this.userService.updateUserById(userId, payload);
    }


    @Delete(":userId")
    async deleteUserById(@Param("userId") userId: string): Promise<string> {
        return await this.userService.deleteUserById(userId);
    }
}