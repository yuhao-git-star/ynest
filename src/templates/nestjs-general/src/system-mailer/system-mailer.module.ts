import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigService } from './mailer-config/mailer-config.service';
import { ConfigModule } from '../config/config.module';
import { SystemMailerService } from './system-mailer.service';
import { APPWinstonModule } from '../winston/appwinston.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MailerConfigService,
    }),
    APPWinstonModule,
  ],
  providers: [SystemMailerService],
  exports: [SystemMailerService],
})
export class SystemMailerModule {}
