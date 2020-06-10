import { ApiProperty } from '@nestjs/swagger';
import { BaseContext } from '../../base-context.interface';

export class UserData {

    // @ApiProperty({ description: '使用者基本資料' })
    // roledata: RsRoledata;

    @ApiProperty({ description: '登入憑證' })
    token: string;
}

// tslint:disable-next-line:max-classes-per-file
export class BaseContextUserData extends BaseContext<UserData> {
    @ApiProperty({ type: UserData })
    content: UserData;
}