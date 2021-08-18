import { Body, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * login func
   * @param request email and password
   * @returns token
   */
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() request: any) {
    return this.authService.login(request);
  }
}
