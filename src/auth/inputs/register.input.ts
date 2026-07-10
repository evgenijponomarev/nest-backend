import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
  name: string;

  @Field(() => String)
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field(() => String)
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(4, 8, { message: 'Password must be between 4 and 8 characters' })
  password: string;
}
