import { Injectable, LoggerService, BadRequestException } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuidV4 } from 'uuid';
import { ConfigService } from '../config/config.service';
import { InjectWinstonLoggerService } from '../decorators/inject-winston-logger-service.decorator';
import { AppRequest } from '../interface/user-id.interface';
import { MulterFile } from '../interface/multer-file.interface';
import { FileExtensionName } from '../enum/file-extension-names';

type FileFilterCallback = (error: Error, acceptFile: boolean) => void;

const MIMETYPE_TO_EXTENSION_MAP = new Map([
  ['image/png', FileExtensionName.PNG],
  ['image/jpg', FileExtensionName.JPG],
  ['image/jpeg', FileExtensionName.JPG],
  ['image/gif', FileExtensionName.GIF],
  ['image/svg+xml', FileExtensionName.SVG],
  ['application/pdf', FileExtensionName.PDF],
  ['text/csv', FileExtensionName.CSV],
]);

function generateFilename(mimetype: string): string {
  const mainName = uuidV4();
  const extensionName = MIMETYPE_TO_EXTENSION_MAP.get(mimetype);
  if (!extensionName) {
    return mainName;
  }
  return `${mainName}.${extensionName}`;
}

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  private readonly uploadPath: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectWinstonLoggerService()
    private readonly loggerService: LoggerService
  ) {
    this.uploadPath = configService.uploadLocation;
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath);
    }
  }

  createMulterOptions(): MulterModuleOptions {
    this.loggerService.log('Creating Multer Options');

    return {
      limits: {
        fileSize: +this.configService.maxFileSize || 20 * 1000 * 1000,
      },
      fileFilter: (req: AppRequest<any>, file: MulterFile, cb: FileFilterCallback) => {
        this.loggerService.log('fileFilter Options');

        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(`Unsupported file type ${path.extname(file.originalname)}`),
            false
          );
        }
      },
      storage: diskStorage({
        destination: this.uploadPath,
        filename: (req, file, cb) => {
          this.loggerService.log('filename Options');
          cb(null, generateFilename(file.mimetype));
        },
      }),
    };
  }
}
