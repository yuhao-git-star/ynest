import { ArgumentMetadata, BadRequestException, PipeTransform, Type } from '@nestjs/common';

export class StringPipeOptions {
  minLength?: number;
  maxLength?: number;
  whiteList?: string[];
  regex?: RegExp;
  optional?: boolean;
  default?: string;
}

export class StringPipe implements PipeTransform {
  private readonly minLength?: number;
  private readonly maxLength?: number;
  private readonly whiteList?: Set<string>;
  private readonly regex?: RegExp;
  private readonly optional?: boolean;
  private readonly default?: string;

  constructor(options: StringPipeOptions = {}) {
    this.minLength = this.checkIntegerOptionValue('minLength', options.minLength);
    this.maxLength = this.checkIntegerOptionValue('maxLength', options.maxLength);
    this.regex = options.regex;
    this.optional = options.optional;

    if (this.minLength > this.maxLength) {
      throw new Error('minLength should be less than or equal to maxLength');
    }

    if (options.whiteList) {
      this.whiteList = new Set<string>(options.whiteList);
    }

    if (typeof options.default === 'string') {
      this.check('default', options.default, Error);
      this.default = options.default;
    }
  }

  private checkIntegerOptionValue(optionName: string, value: number | undefined) {
    const type = typeof value;
    if (type === 'undefined') return;
    if (type !== 'number') throw new Error(`${optionName} should be a number or undefined`);
    if (!this.validateIsNonNegativeInteger(value))
      throw new Error(`${optionName} should be an non-negative integer`);
    return value;
  }

  private validateIsNonNegativeInteger(value: number): boolean {
    return !isNaN(value) && Number.isInteger(value) && value >= 0;
  }

  private check(name: string, value: string, ErrorType: Type<Error>) {
    if (typeof this.minLength === 'number' && value.length < this.minLength) {
      throw new ErrorType(
        `The length of ${name} should be greater than or equal to ${this.minLength}`
      );
    }

    if (typeof this.maxLength === 'number' && value.length > this.maxLength) {
      throw new ErrorType(
        `The length of ${name} should be less than or equal to ${this.maxLength}`
      );
    }

    if (this.whiteList && !this.whiteList.has(value)) {
      throw new ErrorType(`${name} should be one of the white list`);
    }

    if (this.regex instanceof RegExp && !this.regex.test(value)) {
      throw new ErrorType(`${name} should match the regular expression pattern: ${this.regex}`);
    }
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined' && this.optional) return this.default ?? value;

    const { data, type } = metadata;
    const name = data ?? `a ${type}`;

    if (typeof value !== 'string') {
      throw new BadRequestException(`${name} should be a string`);
    }

    this.check(name, value, BadRequestException);
    return value;
  }
}
