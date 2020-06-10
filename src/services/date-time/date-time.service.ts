import { Injectable, Logger } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class DateTimeService {

    private readonly logger = new Logger(DateTimeService.name);

    /**
     * 取得 Duel Revenge Index
     *
     * @private
     * @param {DateTime} nowDate
     * @returns {string}
     * @memberof GoddessDuelTaskService
     */
    culcIndexByDuelRevenge(nowDate: DateTime): string {

        this.logger.log(`Week ${nowDate.weekday} Start Work!`);

        const year = nowDate.year
        const month = nowDate.month
        const weekOfYear = nowDate.weekNumber

        const indexData = `duel-revenge-report-${year}-${month}-${weekOfYear}`;
        this.logger.debug(`${indexData}`);

        return indexData;
    }

    /**
     * 取得一週的第一日
     *
     * @private
     * @param {DateTime} nowDate
     * @returns {DateTime}
     * @memberof GoddessDuelTaskService
     */
    weekStart(nowDate: DateTime): DateTime {
        const weekDay = nowDate.weekday;

        // 週一就等於偏移(1 - 當週任意星期)(1 - n)
        const weekMonday = nowDate.plus({ day: 1 - weekDay }).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        this.logger.debug(`lastWeekDate monday: ${weekMonday}`);
        return weekMonday;
    }

    /**
     * 取得一週的最後一日
     *
     * @private
     * @param {DateTime} nowDate
     * @returns {DateTime}
     * @memberof GoddessDuelTaskService
     */
    weekEnd(nowDate: DateTime): DateTime {
        const weekday = nowDate.weekday;

        // 取得上週日
        // 週日就等於偏移(7- 當週任意星期)(7 - n))
        const weekSunday = nowDate.plus({ day: 7 - weekday }).set({
            hour: 22,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        this.logger.debug(`lastWeekDate sunday: ${weekSunday}`);
        return weekSunday;
    }

    /**
     * 根據星期取得一週的某一日
     *
     * @private
     * @param {DateTime} nowDate
     * @returns {DateTime}
     * @memberof GoddessDuelTaskService
     */
    weekDateTime(
        nowDate: DateTime,
        targetWeekDay: number,
        h: number = 0,
        m: number = 0,
        s: number = 0, ): DateTime {
        const weekday = nowDate.weekday;

        // 取得上週日
        // 依照現在時間就等於偏移(targetWeekDay - n) or (n -targetWeekDay)
        const offset = weekday > targetWeekDay ?
            weekday - targetWeekDay : targetWeekDay - weekday
        const weekTarget = nowDate.plus({ day: offset }).set({
            hour: h,
            minute: m,
            second: s,
            millisecond: 0
        });
        this.logger.debug(`lastWeekDate sunday: ${weekTarget}`);
        return weekTarget;
    }

    /**
     * 取得 Duel Normal Index
     *
     * @private
     * @param {DateTime} nowDate
     * @returns {string}
     * @memberof GoddessDuelTaskService
     */
    culcIndexByDuelNormal(nowDate: DateTime): string {

        this.logger.log(`Week ${nowDate.weekday} Start Work!`);

        const year = nowDate.year
        const month = nowDate.month
        const lastWeekOfYear = nowDate.weekNumber
        const indexData = `veve-duel-${year}-${month}-${lastWeekOfYear}`;

        this.logger.debug(`${indexData}`);
        return indexData;
    }

}
