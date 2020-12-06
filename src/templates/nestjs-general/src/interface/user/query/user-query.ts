import { ApiProperty } from "@nestjs/swagger";

export class UserDeviceData {
    @ApiProperty({ description: 'IP' })
    ip: string;
    @ApiProperty({ description: 'iOS / Android' })
    os: string;
    @ApiProperty({ description: '獲取系统版本' })
    osVersion: string;
    @ApiProperty({ description: '獲取設備型號' })
    device: string;
    @ApiProperty({ description: '獲取 App 的版本' })
    appVersion: string;
}

export class UserDeviceQueryData {
    @ApiProperty({ description: 'openId' })
    openId: string;
    @ApiProperty({ description: 'UserDeviceData' })
    userDeviceData: UserDeviceData;
}

