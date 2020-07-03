import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { StrategyModule } from './domain/strategy.module';

@Module({
    imports: [
      PassportModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.jwtSignKey,
          signOptions: { expiresIn: '3d' },
        }),
        inject: [ConfigService],
    }),
      StrategyModule,
    ],
    providers: [AuthService],
    exports: [AuthService],
  })
export class AuthModule {}
