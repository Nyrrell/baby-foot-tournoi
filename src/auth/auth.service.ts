import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, admin: user.admin };
    return { access_token: this.jwtService.sign(payload) };
  }
}
