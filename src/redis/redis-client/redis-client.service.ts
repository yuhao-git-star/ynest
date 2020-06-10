import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { createClient, RedisClient } from 'redis';

@Injectable()
export class RedisClientService {
    private static client: RedisClient;
    constructor(private readonly configService: ConfigService) {
        RedisClientService.client = createClient(this.configService.redisPort, process.env.REDISHOST || this.configService.redisURL);
    }

    get client(): RedisClient {
        if (!RedisClientService.client) {
            RedisClientService.client = createClient(this.configService.redisPort, process.env.REDISHOST || this.configService.redisURL);
        }
        return RedisClientService.client;
    }
}
