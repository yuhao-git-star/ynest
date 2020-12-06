import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../type-orm-config/type-orm-config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
      TypeOrmModule.forFeature(TypeOrmConfigService.getEntities()),
      StrategyModule,
    ],
    providers: [JwtStrategy],
    exports: [JwtStrategy],
  })
export class StrategyModule {}
