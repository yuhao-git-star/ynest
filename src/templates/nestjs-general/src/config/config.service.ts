import * as path from 'path';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { GSSearchType } from '../enum/gs-search-type';

const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024;

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly logger = new Logger(ConfigService.name);

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);

    const tempDirPath = path.resolve(__dirname, '..', 'temp');
    this.envConfig.TEMP_DIR_PATH = tempDirPath;
    if (!fs.existsSync(tempDirPath)) {
      fs.mkdirSync(tempDirPath);
      this.logger.log(`建立暫存目錄 ${tempDirPath}`);
    }
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().default(true),
      DB_HOST: Joi.string().default('localhost'),
      DB_PORT: Joi.number().default(3306),
      DB_TYPE: Joi.string().default('mysql'),
      DB_USER: Joi.string().default('localhost'),
      DB_PASSWORD: Joi.string().default('localhost'),
      DB_NAME: Joi.string().default('localhost'),
      DB_TYPEORM_SYNC: Joi.boolean().default(false),
      DB_TYPEORM_LOG: Joi.array().default(['all']),
      REDIS_PORT: Joi.number().default(process.env.REDISPORT || 6379),
      REDIS_URL: Joi.string().default(process.env.REDISHOST || 'localhost'),
      ELASRIC_HOST: Joi.string().default(''),
      ELASRIC_ID: Joi.string().default(''),
      ELASRIC_USER: Joi.string().default(''),
      ELASRIC_PASSWORD: Joi.string().default(''),
      JWT_SIGN_KEY: Joi.string().default(''),
      RABBIT_MQ_ACC: Joi.string().optional().allow('').default(''),
      RABBIT_MQ_PW: Joi.string().optional().allow('').default(''),
      RABBIT_MQ_URL: Joi.string().default(''),
      RABBIT_MQ_PORT: Joi.number().integer().default(5672),
      RABBIT_MQ_QUEUE: Joi.string().default(''),
      LOG_LEVEL: Joi.string().default('info'),
      MAILER_SENDER: Joi.string().required(),
      MAILER_SENDER_FROM: Joi.string().required(),
      MAX_FILE_SIZE: Joi.number().integer().positive().default(DEFAULT_MAX_FILE_SIZE),
      UPLOAD_LOCATION: Joi.string().default('uploads'),
      ENGINE_HOST: Joi.string().default(''),
      KEY_SALT: Joi.string().default(''),
      CRYPTO_IV: Joi.string().length(16).default(''),
      GOOGLE_KEY_FILE: Joi.string().default(),
      PROJECT_ID: Joi.string().default(),
      COP_WEB_HOST: Joi.string().default(),
      CC_CO_WEB_HOST: Joi.string().default(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);
    if (error) {
      this.logger.error(error.message);
      // throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get nodeENV(): string {
    return process.env.NODE_ENV;
  }

  get isDev(): boolean {
    return process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  }

  get isNotProd(): boolean {
    return process.env.NODE_ENV !== 'production';
  }

  get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }

  get dbHost(): string {
    return this.envConfig.DB_HOST;
  }

  get dbPort(): number {
    return Number(this.envConfig.DB_PORT);
  }

  get dbType(): string {
    return this.envConfig.DB_TYPE;
  }

  get dbUser(): string {
    return this.envConfig.DB_USER;
  }

  get dbPassword(): string {
    return this.envConfig.DB_PASSWORD;
  }

  get dbName(): string {
    return this.envConfig.DB_NAME;
  }

  get logDbName(): string {
    return this.envConfig.DB_NAME_LOG;
  }

  get adminDbName(): string {
    return this.envConfig.DB_NAME_ADMIN;
  }

  get dbSYNC(): boolean {
    return Boolean(this.envConfig.DB_TYPEORM_SYNC);
  }

  get dbLogging(): LoggerOptions {
    return this.envConfig.DB_TYPEORM_LOG as LoggerOptions;
  }

  get redisPort(): number {
    return Number(this.envConfig.REDIS_PORT);
  }

  get redisURL(): string {
    return this.envConfig.REDIS_URL;
  }

  get elasricHost(): string {
    return this.envConfig.ELASRIC_HOST;
  }

  get elasricHostID(): string {
    return this.envConfig.ELASRIC_ID;
  }

  get elasricUser(): string {
    return this.envConfig.ELASRIC_USER;
  }

  get elasricPassword(): string {
    return this.envConfig.ELASRIC_PASSWORD;
  }

  get jwtSignKey(): string {
    return this.envConfig.JWT_SIGN_KEY;
  }

  get mailerSender(): string {
    return this.envConfig.MAILER_SENDER;
  }

  get mailerSenderFrom(): string {
    return this.envConfig.MAILER_SENDER_FROM;
  }

  get maxFileSize(): number {
    return Number(this.envConfig.MAX_FILE_SIZE);
  }

  get uploadLocation(): string {
    return path.resolve(__dirname, '..', this.envConfig.UPLOAD_LOCATION);
  }

  get rabbitMqAccount(): string {
    return this.envConfig.RABBIT_MQ_ACC;
  }

  get rabbitMqPassword(): string {
    return this.envConfig.RABBIT_MQ_PW;
  }

  get rabbitMqUrl(): string {
    return this.envConfig.RABBIT_MQ_URL;
  }

  get rabbitMqPort(): number {
    return Number(this.envConfig.RABBIT_MQ_PORT);
  }

  get rabbitMqQueue(): string {
    return this.envConfig.RABBIT_MQ_QUEUE;
  }

  get engineHost(): string {
    return this.envConfig.ENGINE_HOST;
  }

  get keySalt(): string {
    return this.envConfig.KEY_SALT;
  }

  get cryptoIv(): string {
    return this.envConfig.CRYPTO_IV;
  }

  get googleKeyFile(): string {
    return this.envConfig.GOOGLE_KEY_FILE;
  }

  get projectId(): string {
    return this.envConfig.PROJECT_ID;
  }

  get bucketImage(): string {
    return this.isNotProd ? GSSearchType.TcImage : GSSearchType.TcImageProd;
  }

  get bucketFile(): string {
    return this.isNotProd ? GSSearchType.TcFile : GSSearchType.TcFileProd;
  }

  get bucketPdf(): string {
    return this.isNotProd ? GSSearchType.TcPdf : GSSearchType.TcPdfProd;
  }

  get logLevel(): string {
    return this.envConfig.LOG_LEVEL;
  }

  get copWebHost(): string {
    return this.envConfig.COP_WEB_HOST;
  }

  get ccCoWebHost(): string {
    return this.envConfig.CC_CO_WEB_HOST;
  }

  get tempDirPath(): string {
    return this.envConfig.TEMP_DIR_PATH;
  }
}
