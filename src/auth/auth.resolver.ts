import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import type { GqlContext } from 'src/common/interfaces/gql-context.interface';
import { AuthModel } from './models/auth.model';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  test(@Context() context: GqlContext) {
    console.log(context);

    return 'Test method';
  }

  @Mutation(() => AuthModel)
  async register(
    @Context() { res }: GqlContext,
    @Args('data') input: RegisterInput,
  ) {
    return this.authService.register(res, input);
  }

  @Mutation(() => AuthModel)
  async login(@Context() { res }: GqlContext, @Args('data') input: LoginInput) {
    return this.authService.login(res, input);
  }

  @Mutation(() => AuthModel)
  async refresh(@Context() { req, res }: GqlContext) {
    return this.authService.refreshToken(req, res);
  }

  @Mutation(() => Boolean)
  logout(@Context() { res }: GqlContext) {
    return this.authService.logout(res);
  }
}
