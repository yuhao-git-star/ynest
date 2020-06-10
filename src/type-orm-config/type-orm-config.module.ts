import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { TypeOrmConfigService } from './type-orm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [
        // 宣告哪個provider或是service需要被注入
        ConfigService,
      ],
      useClass: TypeOrmConfigService,
    }),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class TypeOrmConfigModule { }
