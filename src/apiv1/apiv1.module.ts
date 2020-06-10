import { Module } from '@nestjs/common';
import { ServiceModule } from '../services/service.module';
import { UserController } from './user/user.controller';

@Module({
    imports: [
        ServiceModule,
    ],
    controllers: [
        UserController
    ],
})
export class Apiv1Module { }
