import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';
import { Request, Response } from 'express';
import { isDev } from 'src/utils/is-dev.util';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: ms.StringValue;
  private readonly JWT_REFRESH_TOKEN_TTL: ms.StringValue;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<ms.StringValue>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<ms.StringValue>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async register(res: Response, input: RegisterInput) {
    const existsUser = await this.prismaService.user.findUnique({
      where: { email: input.email },
    });

    if (existsUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.prismaService.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: await argon2.hash(input.password),
      },
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, input: LoginInput) {
    const user = await this.prismaService.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, input.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.auth(res, user.id);
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.auth(res, user.id);
    }
  }

  logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));

    return true;
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + ms(this.JWT_REFRESH_TOKEN_TTL)),
    );

    return { accessToken };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      maxAge: expires.getTime() - Date.now(),
      sameSite: isDev(this.configService) ? 'lax' : 'lax',
    });
  }
}
