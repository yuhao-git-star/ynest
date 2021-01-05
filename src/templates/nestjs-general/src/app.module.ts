import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { EventsModule } from './events/events.module';
import { RedisClientModule } from './redis/redis-client/redis-client.module';
import { Apiv1Module } from './apiv1/apiv1.module';
import { ServiceModule } from './services/service.module';
import { Apiv2Module } from './apiv2/apiv2.module';
import { Routes, RouterModule } from 'nest-router';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { APPWinstonModule } from './winston/appwinston.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpFilterFilter } from './filter/http-filter.filter';
import { ScheduleModule } from '@nestjs/schedule';

const routes: Routes = [
  {
    path: '/v1',
    module: Apiv1Module,
  },
  {
    path: '/v2',
    module: Apiv2Module,
  },
];

@Module({
  imports: [
    ConfigModule,
    APPWinstonModule,
    ScheduleModule.forRoot(),
    // TypeOrmConfigModule,
    // RedisClientModule,
    EventsModule,
    // ElasticsearchConfigModule,
    AuthModule,
    ServiceModule,
    RouterModule.forRoutes(routes),
    Apiv1Module,
    Apiv2Module,
    WinstonModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpFilterFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes('*');
  }
 }
