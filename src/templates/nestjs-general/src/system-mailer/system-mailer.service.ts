import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import path = require('path');
import url = require('url');
import {
  LoggerHelperService,
  TrackerLogger,
  TrackerLoggerCreator,
} from '../winston/logger-helper.service';
import { ConfigService } from '../config/config.service';

interface CcAccountInformMailParams {
  title: string;
  itemName1: string;
  itemValue1: string;
  itemName2: string;
  itemValue2: string;
}

const TURING_CHAIN_LOGO_ATTACHMENT = {
  filename: 'turing-logo@3x.png',
  path: path.resolve(__dirname, '..', 'assets', 'images', 'turing-logo@3x.png'),
  cid: 'imagename',
};

@Injectable()
export class SystemMailerService {
  private readonly trackerLoggerCreator: TrackerLoggerCreator;
  private readonly ccCoWebLoginPageUrl: string;
  private readonly copWebLoginPageUrl: string;
  private readonly customerService: string = 'service@turingchain.tech';

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    loggerHelperService: LoggerHelperService
  ) {
    this.trackerLoggerCreator = loggerHelperService.makeCreator(SystemMailerService.name);
    this.ccCoWebLoginPageUrl = url.resolve(configService.ccCoWebHost, 'login');
    this.copWebLoginPageUrl = url.resolve(configService.copWebHost, 'login');
  }
}
