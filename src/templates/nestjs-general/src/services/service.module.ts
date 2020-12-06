import { Module, Logger } from '@nestjs/common';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { TypeOrmConfigService } from '../type-orm-config/type-orm-config.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmConfigService.getEntities()),
    ],
    providers: [
        Logger,
        UserService,
    ],
    exports: [
        UserService,
    ],
})
export class ServiceModule {}
