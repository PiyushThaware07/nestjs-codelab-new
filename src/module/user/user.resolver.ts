import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => [UserEntity])
    async getUsers(): Promise<UserEntity[]> {
        return this.userService.getUsers();
    }

    @Query(() => UserEntity)
    async getUserById(@Args('userId') userId: string): Promise<UserEntity> {
        return this.userService.getUserById(userId);
    }

    @Mutation(() => String)
    async createUser(@Args('payload') payload: CreateUserDTO): Promise<string> {
        return this.userService.createUser(payload);
    }

    @Mutation(() => String)
    async updateUserById(
        @Args('userId') userId: string,
        @Args('payload') payload: UpdateUserDTO
    ): Promise<string> {
        return this.userService.updateUserById(userId, payload);
    }

    @Mutation(() => String)
    async deleteUserById(@Args('userId') userId: string): Promise<string> {
        return this.userService.deleteUserById(userId);
    }
}
