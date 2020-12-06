import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as elasticsearch from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchConfigService {

  private readonly logger = new Logger(ElasticsearchConfigService.name);

  client: elasticsearch.Client;
  constructor(private readonly configService: ConfigService) {
    this.client = new elasticsearch.Client({
      node: this.configService.elasricHost,
      cloud: {
        id: this.configService.elasricHostID
      },
      auth: {
        username: this.configService.elasricUser,
        password: this.configService.elasricPassword
      }
    });
  }
}
