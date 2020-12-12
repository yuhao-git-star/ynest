import {
  UseInterceptors,
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Inject,
  mixin,
  NestInterceptor,
  Optional,
  Type,
} from '@nestjs/common';
import { MULTER_MODULE_OPTIONS } from '@nestjs/platform-express/multer/files.constants';
import { MulterModuleOptions } from '@nestjs/platform-express/multer';
import * as fs from 'fs';
import * as multer from 'multer';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Multer, FileFilterCallback } from 'multer';
import { Request, Response } from 'express';
import { transformException } from '../../errors/multer-transform-exception';
import { MulterFile } from '../../interface/multer-file.interface';
import {
  LoggerHelperService,
  TrackerLogger,
  TrackerLoggerCreator,
} from '../../winston/logger-helper.service';
import { AppRequest } from '../../interface/user-id.interface';

/**
 * 圖片檔案攔截器。用於檢測使用者是否上傳正確的圖片檔案。
 * @param fieldName 檔案放在 `multipart/form-data` 中的欄位名稱。
 * @param deleteFileAfterwards 是否在一回 Request/Response 處理完成後將檔案刪除。預設為 `true`。
 */
export function ImageInterceptor(
  fieldName: string,
  deleteFileAfterwards: boolean = true
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    private trackerLoggerCreator: TrackerLoggerCreator;
    protected multer: Multer;

    constructor(
      @Optional()
      @Inject(MULTER_MODULE_OPTIONS)
      options: MulterModuleOptions = {},
      loggerHelperService: LoggerHelperService
    ) {
      // 與 Global 的設定合併並複寫檔案篩檢的函式
      this.multer = multer({
        ...options,
        ...{
          fileFilter: this.fileFilter,
        },
      });
      this.trackerLoggerCreator = loggerHelperService.makeCreator('Images');
    }

    /**
     * 檢測上傳的檔案的副檔名是否為可接受的圖像種類
     * @param req Express 的 Request 物件
     * @param file Multer 的檔案物件
     * @param cb 結果回呼函式
     */
    fileFilter(req: Request, file: MulterFile, cb: FileFilterCallback) {
      if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException(`${fieldName} 欄位只接受 JPG, PNG 或 GIF 檔案類型`));
      }
      cb(null, true);
    }

    /**
     * 透過 Multer 自 Request Body 中抽出檔案，並將結果放置到 Request 上
     * @param request Express 的 Request 物件
     * @param response Express 的 Response 物件
     */
    extractFileFromRequest(request: Request, response: Response): Promise<void> {
      return new Promise((resolve, reject) => {
        const handler = this.multer.single(fieldName);
        handler(request, response, (err: any) => {
          if (err) {
            const error = transformException(err);
            return reject(error);
          }
          resolve();
        });
      });
    }

    /**
     * 檢查檔案是否有被上傳。
     * @param file Multer 的檔案物件
     * @throws `BadRequestException`
     */
    checkIfFileExists(file: MulterFile | undefined) {
      if (!file) {
        throw new BadRequestException(`必須上傳一份圖像檔案（欄位 ${fieldName} 為空）`);
      }
    }

    /**
     * 建立完成一回 Request/Response 的後續動作。
     * @param file 上傳的檔案
     * @param logger Logger 物件。
     */
    createCleanUp(file: MulterFile, logger: TrackerLogger) {
      if (!deleteFileAfterwards) return () => {};
      return () => {
        if (fs.existsSync(file.path)) {
          logger.log(`刪除檔案 ${file.path}`);
          fs.unlinkSync(file.path);
        }
      };
    }

    /**
     * 執行自 Request 中將圖像檔案抽出、轉換並檢查的工作
     * @param context 前後文執行物件
     * @param next 呼叫對應的 Controller 上的 handler
     */
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<AppRequest<any>>();
      const response = ctx.getResponse<Response>();
      const logger = this.trackerLoggerCreator.create(request.trackingId);
      await this.extractFileFromRequest(request, response);
      this.checkIfFileExists(request.file);

      const cleanUp = this.createCleanUp(request.file, logger);
      return next.handle().pipe(finalize(cleanUp));
    }
  }

  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}

/**
 * 裝飾器。用於 Controller Method 上，擷取並檢測使用者是否上傳正確的圖像檔案。
 * @param fieldName 檔案放在 `multipart/form-data` 中的欄位名稱。
 * @param deleteFileAfterwards 是否在一回 Request/Response 處理完成後將檔案刪除。預設為 `true`。
 */
export function UploadImageFile(fieldName: string, deleteFileAfterwards: boolean = true) {
  return UseInterceptors(ImageInterceptor(fieldName, deleteFileAfterwards));
}
