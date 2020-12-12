import { BadRequestException, PayloadTooLargeException } from '@nestjs/common';
import { MulterError } from 'multer';

/**
 * 把 Multer 的錯誤轉成相對應得 HTTP 回應
 * @param error Multer 錯誤
 */
export function transformException(error: Error | undefined) {
  if (!error || !(error instanceof MulterError)) {
    // HttpException
    return error;
  }

  switch (error.code) {
    case 'LIMIT_FILE_SIZE':
      return new PayloadTooLargeException(error.message);
    case 'LIMIT_FILE_COUNT':
    case 'LIMIT_FIELD_KEY':
    case 'LIMIT_FIELD_VALUE':
    case 'LIMIT_FIELD_COUNT':
    case 'LIMIT_UNEXPECTED_FILE':
    case 'LIMIT_PART_COUNT':
      return new BadRequestException(error.message);
  }

  return error;
}
