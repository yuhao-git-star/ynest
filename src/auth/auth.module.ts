import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../services/user/user.service';

@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: '',
        signOptions: { expiresIn: '60s' },
      }),
    ],
    providers: [UserService, AuthService],
    exports: [AuthService],
  })
export class AuthModule {}
