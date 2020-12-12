import { unlinkSync, writeFileSync, readFileSync } from 'fs';
import createCsvParser = require('csv-parse');
import parseCsv = require('csv-parse/lib/sync');
import stringifyCsv = require('csv-stringify');
import { InvalidCsvFormatException } from '../../../errors/service-exceptions.interface';
import { TrackerLogger } from '../../../winston/logger-helper.service';
import { validateEmailColumn, CsvRowData, REQUIRED_COLUMN_NAMES } from './field-validator';

export const CSV_PARSER_OPTIONS: createCsvParser.Options = {
  columns: REQUIRED_COLUMN_NAMES,
  skipEmptyLines: true,
  trim: true,
};

/**
 * 讀取並解析目標 CSV 檔案
 * @param filePath CSV 檔案位址
 * @param logger Logger
 * @returns 解析完後的 CSV 資料列
 */
export function readAndParseCsvFile(filePath: string, logger: TrackerLogger): CsvRowData[] {
  try {
    const fileContent = readFileSync(filePath, { flag: 'r+', encoding: 'utf8' });
    const csvRows = parseCsv(fileContent, CSV_PARSER_OPTIONS) as CsvRowData[];
    return csvRows;
  } catch (err) {
    logger.error(err);

    // 非 CSV 解析錯誤
    if (!(err instanceof createCsvParser.CsvError)) {
      logger.error('讀取 CSV 檔案時發生錯誤');
      throw new InvalidCsvFormatException('讀取 CSV 檔案時發生錯誤');
    }

    // 以下為 CSV 解析錯誤
    const { code, lines, column } = err;
    let message: string;
    if (code === 'CSV_RECORD_DONT_MATCH_COLUMNS_LENGTH') {
      message = `第 ${lines} 列上的欄位數量不為規定的 ${REQUIRED_COLUMN_NAMES.length} 個欄`;
    } else if (code === 'CSV_QUOTE_NOT_CLOSED') {
      message = `第 ${lines} 列上的欄位 ${column} 的字串引號沒有閉合`;
    } else {
      message = 'CSV 檔案內容格式錯誤';
    }

    logger.error(message);
    throw new InvalidCsvFormatException(message);
  }
}

/**
 * 格式化 CSV 資料列陣列至字串
 * @param csvDataRows CSV 資料列陣列
 * @param logger Logger
 * @returns 格式化成字串後的 CSV 內容
 */
function formatCsv(csvDataRows: CsvRowData[], logger: TrackerLogger): Promise<string> {
  logger.log('格式化 CSV 資料列陣列 ...');
  return new Promise((resolve, reject) => {
    stringifyCsv(
      csvDataRows,
      {
        header: true,
        columns: REQUIRED_COLUMN_NAMES,
      },
      (err, csvContent) => {
        if (err) {
          logger.error(`格式化 CSV 資料列陣列時候發生了錯誤:\n${err}`);
          reject(err);
          return;
        }
        resolve(csvContent);
      }
    );
  });
}

/**
 * 驗證 CSV 中每個資料列中的資料
 * @param csvRows CSV 資料列陣列
 * @param logger Logger
 * @return 格式化後的 CSV 內容（字串）
 */
async function validateCsvRows(csvRows: CsvRowData[], logger: TrackerLogger): Promise<string> {
  logger.log('檢查資料列的總數是否大於 0 ...');
  const rowLength = csvRows.length;
  if (rowLength <= 1) {
    logger.error('CSV 只有標頭欄位，沒有任何資料欄位');
    throw new InvalidCsvFormatException('CSV 只有標頭欄位，沒有任何資料欄位');
  }

  logger.log('檢查標頭列（Headers）欄位格式 ...');
  const headers = csvRows[0];
  REQUIRED_COLUMN_NAMES.forEach((key, index) => {
    if (headers[key] !== key) {
      throw new InvalidCsvFormatException(`標頭列（Headers）的第 ${index + 1} 欄位應為 ${key}`);
    }
  });

  logger.log('檢查每個資料列 ...');
  const emailSet = new Set<string>();
  for (let i = 1; i < rowLength; i++) {
    const rowNumber = i + 1;
    const csvData = csvRows[i];

    logger.log(`檢查第 ${rowNumber} 列的資料 ...`);
    validateEmailColumn(csvData.email, rowNumber);
    if (emailSet.has(csvData.email)) {
      throw new InvalidCsvFormatException(`第 ${rowNumber} 列上的 email 欄位與前面的欄位重複`);
    }
    emailSet.add(csvData.email);
  }

  logger.log('資料檢查完成');
  return formatCsv(csvRows.slice(1), logger);
}

/**
 * 更新 CSV 檔案內容
 * @param filePath CSV 檔案位址
 * @param csvContent 要寫入的 CSV 內容
 * @param logger Logger
 */
function updateFile(filePath: string, csvContent: string, logger: TrackerLogger) {
  console.log(csvContent);
  logger.log(`更新 CSV 檔案（${filePath}）的內容 ...`);
  unlinkSync(filePath);
  writeFileSync(filePath, csvContent, { encoding: 'utf8' });
  logger.log('更新成功');
}

/**
 * CSV 檔案內容檢查者。
 */
export async function validateCsvContent(filePath: string, logger: TrackerLogger) {
  const csvRows = readAndParseCsvFile(filePath, logger);
  const formattedCsvContent = await validateCsvRows(csvRows, logger);
  updateFile(filePath, formattedCsvContent, logger);
}
