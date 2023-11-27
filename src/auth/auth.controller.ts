import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GetUser } from './decorator/user.decorator';
import { User } from '@prisma/client';
import { JwtRefreshGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@GetUser() user: User) {
    return this.authService.refresh(user);
  }
}
