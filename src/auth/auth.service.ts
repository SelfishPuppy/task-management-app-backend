import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    try {
      const hash: string = await argon.hash(dto.password);

      const user = await this.userService.create({ email: dto.email, hash });

      const tokens = await this.signTokens(user.id, user.email);

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async login(dto: AuthDto) {
    const user = await this.userService.findOne(dto.email);
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const passwordMatches = await argon.verify(user.hash, dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const tokens = await this.signTokens(user.id, user.email);

    return tokens;
  }

  async refresh(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const tokens = await this.signTokens(user.id, user.email);

    return tokens;
  }

  private async signTokens(userId: number, email: string) {
    const access_token = await this.generateAccessToken(userId, email);
    const refresh_token = await this.generateRefreshToken(userId, email);

    return { access_token, refresh_token };
  }

  private generateRefreshToken(userId: number, email: string) {
    const refresh_secret = this.config.get('JWT_REFRESH_SECRET');

    return this.signToken(userId, email, '1h', refresh_secret);
  }

  private generateAccessToken(userId: number, email: string) {
    const access_secret = this.config.get('JWT_ACCESS_SECRET');

    return this.signToken(userId, email, '15m', access_secret);
  }

  private async signToken(
    userId: number,
    email: string,
    expiresIn: string,
    secret: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const token = this.jwt.signAsync(payload, {
      expiresIn: expiresIn,
      secret: secret,
    });

    return token;
  }
}
