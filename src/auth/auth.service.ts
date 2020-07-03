import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService
      ) {}

    async login(username: string, userId: string): Promise<{access_token: string}> {
        const payload = { username: username, sub: userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
