import { Injectable } from '@nestjs/common';
import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '../../config/config.service';
import * as path from 'path';

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createMailerOptions(): Promise<MailerOptions> {
    const location = path.resolve(__dirname, '..', '..', 'assets', 'templates');

    return {
      transport: this.configService.mailerSender,
      defaults: {
        from: this.configService.mailerSenderFrom,
      },
      template: {
        dir: location,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
