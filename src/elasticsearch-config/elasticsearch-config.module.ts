import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ElasticsearchConfigService } from './elasticsearch-config.service';

@Module({
    imports: [ConfigModule],
    providers: [ElasticsearchConfigService],
    exports: [ElasticsearchConfigService],
})
export class ElasticsearchConfigModule { }
