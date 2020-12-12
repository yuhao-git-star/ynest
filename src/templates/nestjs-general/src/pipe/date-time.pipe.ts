import { ArgumentMetadata, BadRequestException, PipeTransform, Type } from '@nestjs/common';
import { DateTime } from 'luxon';

export interface ISOFormat {
  type: 'iso';
}

export interface CustomFormat {
  type: 'custom';
  format: string;
}

export type DateTimePipeFormatter = ISOFormat | CustomFormat;
export type DateTimePipeOutput = 'original' | 'DateTime';

export interface DateTimePipeOptions {
  formatter?: DateTimePipeFormatter;
  output?: DateTimePipeOutput;
  optional?: boolean;
}

export class DateTimePipe implements PipeTransform {
  private readonly formatter: DateTimePipeFormatter;
  private readonly output: DateTimePipeOutput;
  private readonly optional: boolean;

  constructor(options: DateTimePipeOptions = {}) {
    this.formatter = options.formatter ?? { type: 'iso' };
    this.output = options.output ?? 'original';
    this.optional = options.optional ?? false;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined' && this.optional) return value;

    const { data, type } = metadata;
    const name = data ?? `a ${type}`;

    if (typeof value !== 'string') {
      throw new BadRequestException(`${name} must be string`);
    }

    let dateTime: DateTime;
    if (this.formatter.type === 'iso') {
      dateTime = DateTime.fromISO(value);
    } else if (this.formatter.type === 'custom') {
      dateTime = DateTime.fromFormat(value, this.formatter.format, { zone: 'utc' });
    } else {
      throw new Error('Unknown formatter type');
    }

    if (!dateTime.isValid) {
      throw new BadRequestException(`${name} is in invalid date time format`);
    }

    return this.output === 'original' ? value : dateTime;
  }
}
