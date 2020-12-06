import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

export class IntegerPipeOptions {
  minimum?: number;
  maximum?: number;
  optional?: boolean;
  default?: number;
}

export class IntegerPipe implements PipeTransform {
  private readonly minimum?: number;
  private readonly maximum?: number;
  private readonly optional?: boolean;
  private readonly default?: number;

  constructor(options: IntegerPipeOptions = {}) {
    this.maximum = this.checkIntegerOptionValue('maximum', options.maximum);
    this.minimum = this.checkIntegerOptionValue('minimum', options.minimum);
    this.optional = options.optional ?? false;
    this.default = this.checkIntegerOptionValue('default', options.maximum);

    this.checkIsGreaterOrEqualTo(this.maximum, 'maximum', this.minimum, 'minimum');
    this.checkIsGreaterOrEqualTo(this.default, 'default', this.minimum, 'minimum');
    this.checkIsGreaterOrEqualTo(this.maximum, 'maximum', this.default, 'default');
  }

  private checkIntegerOptionValue(optionName: string, value: number | undefined) {
    const type = typeof value;
    if (type === 'undefined') return;
    if (type !== 'number') throw new Error(`${optionName} should be a number or undefined`);
    if (!this.validateIsInteger(value)) throw new Error(`${optionName} should be an integer`);
    return value;
  }

  private checkIsGreaterOrEqualTo(
    valueA: number | undefined,
    nameA: string,
    valueB: number | undefined,
    nameB: string
  ) {
    if (typeof valueA === 'undefined' || typeof valueB === 'undefined') return;
    if (valueA < valueB) throw new Error(`${nameA} should be greater than or equal to ${nameB}`);
  }

  private validateIsInteger(value: number): boolean {
    return !isNaN(value) && Number.isInteger(value);
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined' && this.optional) return this.default ?? value;

    const { data, type } = metadata;
    const name = data ?? `a ${type}`;

    const result = Number(value);
    if (!this.validateIsInteger(result)) {
      throw new BadRequestException(`${name} should be an integer`);
    }

    if (typeof this.maximum === 'number' && result > this.maximum) {
      throw new BadRequestException(`${name} should be less than or equal to ${this.maximum}`);
    }

    if (typeof this.minimum === 'number' && result < this.minimum) {
      throw new BadRequestException(`${name} should be greater than or equal to ${this.minimum}`);
    }

    return result;
  }
}

export const OffsetPipe = new IntegerPipe({
  minimum: 0,
  optional: true,
  default: 0,
});

export const LimitPipe = new IntegerPipe({
  minimum: 1,
  maximum: 100,
  optional: true,
  default: 10,
});

export const IdPipe = new IntegerPipe();

export const OptionalIdPipe = new IntegerPipe({
  optional: true,
});
