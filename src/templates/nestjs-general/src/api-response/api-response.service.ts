import { Injectable, Type } from '@nestjs/common';
import { BaseContext } from '../interface/base-context.interface';
import { ApiBusinessCode, ApiDuelRewardCode } from '../enum/api-business-code';

@Injectable()
export class ApiResponseService {

    static generateResponse<T>(
        data: T,
        message: string = 'Success',
        isSuccess = true,
        code = 200,
        businessCode: ApiBusinessCode | ApiDuelRewardCode = ApiBusinessCode.normal): BaseContext<T> {
        return {
            success: isSuccess,
            code,
            businessCode,
            message,
            content: data
        };
    }
}
