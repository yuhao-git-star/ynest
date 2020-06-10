import { ApiProperty } from '@nestjs/swagger';

export class BaseContext<T> {
    @ApiProperty({ description: 'API 是否成功' })
    success: boolean;
    @ApiProperty({ description: 'API 狀態代號' })
    code: number;
    @ApiProperty({ description: 'API 商業邏輯狀態代號' })
    businessCode: number;
    @ApiProperty({ description: 'API 訊息' })
    message: string;
    @ApiProperty({ description: 'API 內容' })
    content: T;
}
