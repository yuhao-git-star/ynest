import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserSigninDataQuery {

    @ApiProperty({ description: '使用者 OpenId 的辨識號' })
    @IsNotEmpty()
    openID: string;
}