import { isEmail } from 'class-validator';
import { InvalidCsvFormatException } from '../../../errors/service-exceptions.interface';

export const REQUIRED_COLUMN_NAMES = [
  'email',
  'title',
  'institution',
  'name',
  'content',
  'officialId',
  'date',
  'other',
  'other2',
  'other3',
];

export interface CsvRowData {
  email: string;
  title: string;
  institution: string;
  name: string;
  content: string;
  officialId: string;
  date: string;
  other: string;
  other2: string;
  other3: string;
}

/**
 * CSV 樣板內容。
 */
export const SAMPLE_CSV = REQUIRED_COLUMN_NAMES.join(',') + '\n';

export type FieldValidatorFunc = (value: string, lineNumber: number) => string | void;

export const validateEmailColumn: FieldValidatorFunc = (value, lineNumber) => {
  if (!value) {
    throw new InvalidCsvFormatException(`第 ${lineNumber} 列的 email 欄位中的值不能為未定義`);
  }

  const email = value.toLowerCase().trim();
  if (!isEmail(email)) {
    throw new InvalidCsvFormatException(
      `第 ${lineNumber} 列的 email 欄位上必須有合法的電子信箱地址`
    );
  }
  return email;
};
