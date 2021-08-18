import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const validPass = await bcrypt.compare(password, user.password);

      if (validPass) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = await this.validateUser(user.email, user.password);
    if (!payload) {
      return { message: 'error' };
    }
    return {
      access_token: this.jwtService.sign({
        sub: payload.id,
        email: payload.email,
      }),
    };
  }
}
