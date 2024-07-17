import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LocalAuthGuard} from "./guards/local-auth.guards";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login/google')
  async googleLogin(@Request() req) {
    return this.authService.googleLogin(req.body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user, +req.user.id);
  }

  @Post('refresh')
  async refreshPass(@Request() req) {
    return this.authService.refreshPass(req.body.email);
  }
}
