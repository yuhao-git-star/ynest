import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly logger = new Logger(ConfigService.name);

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
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
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
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
    return this.envConfig.ELASRIC_HOST
  }

  get elasricHostID(): string {
    return this.envConfig.ELASRIC_ID
  }

  get elasricUser(): string {
    return this.envConfig.ELASRIC_USER
  }

  get elasricPassword(): string {
    return this.envConfig.ELASRIC_PASSWORD
  }

  get jwtSignKey(): string {
    return this.envConfig.JWT_SIGN_KEY;
  }
}
