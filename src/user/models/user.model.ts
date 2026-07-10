import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { User, UserRole } from '../../generated/prisma/client';
import { BaseModel } from 'src/common/models/base.model';

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType({
  description: 'User model',
})
export class UserModel extends BaseModel implements User {
  @Field(() => String, {
    description: 'User name',
  })
  name: string;

  @Field(() => String, {
    description: 'User email',
  })
  email: string;

  @Field(() => String, {
    description: 'User password',
  })
  password: string;

  @Field(() => UserRole, {
    description: 'User role',
  })
  role: UserRole;
}
