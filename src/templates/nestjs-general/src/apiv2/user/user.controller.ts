import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserV2Controller {
    @Get()
    async find(): Promise<string> {
        return 'hello';
      }
}
