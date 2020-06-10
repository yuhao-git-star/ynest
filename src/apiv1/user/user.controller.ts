import { Controller, Get, Header, Query } from '@nestjs/common';
import { ApiTags, ApiForbiddenResponse, ApiCreatedResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiBusinessCode } from '../../enum/api-business-code';
import { UserService } from '../../services/user/user.service';
import { string } from 'joi';

@ApiTags('使用者')
@ApiBearerAuth()
@Controller('user')
export class UserController {

    constructor(
    ) { }

    @Get('fetchaboutmepagedata')
    @ApiOperation({
        summary: '查詢個人頁資訊',
        description: `
      Business Code 說明:\r
      ${ApiBusinessCode.normal}-> 正常
      ${ApiBusinessCode.notfind}-> 查無資料
      `
    })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: string
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Header('content-type', 'application/json')
    async fetchAboutMePageData(
    ): Promise<string> {
        return 'Ok'
    }
}
