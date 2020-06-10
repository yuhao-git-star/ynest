import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    private readonly logger = new Logger(TypeOrmConfigService.name);
    constructor(private readonly configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
      return {
        type: this.configService.dbType as any,
        host: this.configService.dbHost,
        port: this.configService.dbPort,
        username: this.configService.dbUser,
        password: this.configService.dbPassword,
        database: this.configService.dbName,
        entities: TypeOrmConfigService.getEntities(),
        synchronize: this.configService.dbSYNC,
        logging: this.configService.dbLogging,
      };
    }

    static getEntities() {
      return [
      ]
    }
  }
