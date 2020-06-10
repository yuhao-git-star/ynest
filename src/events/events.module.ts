import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user/user.service';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../type-orm-config/type-orm-config.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature(TypeOrmConfigService.getEntities()),
  ],
  providers: [
    UserService,
    EventsGateway
  ],
})
export class EventsModule { }
