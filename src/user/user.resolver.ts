import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UserRole } from 'src/generated/prisma/client';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Query(() => UserModel, {
    name: 'getMe',
    description: 'Get current user',
  })
  getMe(@Authorized() user: UserModel) {
    return user;
  }

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel])
  async getUsers() {
    return await this.userService.findAll();
  }
}
