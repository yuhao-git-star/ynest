import { AccountType } from '../enum/account-type';

const ACCOUNT_TYPE_ACRONYM_DICTIONARY = {
  [AccountType.CopAccount]: 'COP',
  [AccountType.CcAccount]: 'CC',
  [AccountType.CoAccount]: 'CO',
};

/**
 * 服務、商業邏輯性質的錯誤都所屬於此類的例外錯誤之下。
 */
export class ServiceException extends Error {}

/**
 * 表示指定的資源紀錄不存在。
 */
export class ResourceNotFoundException extends ServiceException {
  /**
   * @param name 資源名稱
   * @param id 資源 Id
   */
  constructor(name?: string, id?: string | number) {
    super();
    if (name && id) {
      this.message = `id 為 ${id} 的 ${name} 紀錄不存在`;
    } else if (name) {
      this.message = `指定的 ${name} 不存在`;
    } else {
      this.message = '指定的資源不存在';
    }
  }
}

/**
 * 表示訪客登入帳戶失敗。
 */
export class SignInFailureException extends ServiceException {
  /**
   * @param accountType 訪客所嘗試登入的帳戶類型。
   */
  constructor(accountType: AccountType) {
    super();
    const acronym = ACCOUNT_TYPE_ACRONYM_DICTIONARY[accountType];
    this.message = `訪客嘗試登入 ${acronym} 帳戶失敗`;
  }
}

/**
 * 帳戶的密碼已經重置過了（帳戶狀態不在密碼重置狀態上）
 */
export class PasswordAlreadyResettedException extends ServiceException {
  constructor(accountType: AccountType, id: string) {
    super();
    const acronym = ACCOUNT_TYPE_ACRONYM_DICTIONARY[accountType];
    this.message = `${acronym} 帳戶（id: ${id}）已經完成登入密碼重置動作`;
  }
}

/**
 * 資源屬性衝突例外。如：嘗試建立具有相同電子信箱的帳號。
 */
export class ResourceConflictException extends ServiceException {
  constructor(resourceName: string, fieldName: string, value: string) {
    super();
    this.message = `資源衝撞：已有 ${resourceName} 資源在 ${fieldName} 欄位上具有值 ${value}`;
  }
}

/**
 * 嘗試取得不屬於該使用者的資源。
 */
export class OwnershipException extends ServiceException {
  constructor(resourceName: string, resourceId: string | number) {
    super();
    this.message = `使用者因不擁有或沒有被授權而無法存取 ID 為 ${resourceId} 的 ${resourceName} 資源`;
  }
}

/**
 * 發證模板的內容錯誤。
 */
export class InvalidTemplateException extends ServiceException {
  constructor(reason: string) {
    super();
    this.message = reason;
  }
}

/**
 * 指定的檔案的種類不符合需求。
 */
export class IncorrectFileTypeException extends ServiceException {
  constructor(id: string, type: string) {
    super();
    this.message = `目標檔案（id: ${id}）的種類不為 ${type}`;
  }
}

/**
 * 錯誤的 CSV 內容格式。
 */
export class InvalidCsvFormatException extends ServiceException {
  constructor(reason?: string) {
    super();
    if (typeof reason === 'string') {
      this.message = `CSV: ${reason}`;
      return;
    }
    this.message = '目標 SVG 檔案的內容格式不符合規定';
  }
}

/**
 * 擁有的特定資源數量已達或超出上限。
 */
export class ReachingMaximumResourcesException extends ServiceException {
  constructor(resourceName: string, count: number, isExceeded: boolean = false) {
    super();
    const extent = isExceeded ? '超出' : '已達';
    this.message = `所擁有的${resourceName}數量${extent}上限 ${count}`;
  }
}

/**
 * 使用者輸入的發證密碼與資料庫中儲存的不相符。
 */
export class IncorrectCertPasswordException extends ServiceException {
  constructor() {
    super();
    this.message = '輸入的發證密碼不正確';
  }
}

/**
 * 區塊鏈地址生成錯誤。
 */
export class BlockchainAddressGenerationException extends ServiceException {
  constructor() {
    super();
    this.message = '生成區塊鏈地址時發生錯誤';
  }
}

/**
 * 目標的帳戶由另一個帳戶管理。
 */
export class AccountManagedByAnotherException extends ServiceException {
  constructor(objType: string, objId: string | number, subType: string) {
    super();
    this.message = `無權限管理 ${objType} 帳戶（id: ${objId}），因為該帳戶歸屬於另一位 ${subType} 帳戶管理`;
  }
}

/**
 * 新密碼與舊密碼一致。
 */
export class IdenticalNewOldPasswordException extends ServiceException {
  constructor() {
    super();
    this.message = '新密碼與舊密碼一致，請更換成不同的密碼';
  }
}

/**
 * 目標群組的狀態為「發證中」，為了保持資料一致性，因此若有影響此性質的因素則可拋出此例外。
 */
export class CertRecordGroupNotFinishedException extends ServiceException {
  constructor(id: number | string) {
    super();
    const typeOfId = typeof id;
    if (typeOfId === 'number' || typeOfId === 'string') {
      this.message = `指定的證書群組（id: ${id}）狀態仍在「發證中」，因此無法進行此操作。`;
      return;
    }
    this.message = '指定的證書群組狀態仍在「發證中」，因此無法進行此操作。';
  }
}

/**
 * 無法撤銷指定的證書，因為該證書的狀態不為「啟用」。
 */
export class CannotRevokeCertException extends ServiceException {
  constructor(id: number) {
    super();
    this.message = `無法撤銷指定的證書（id: ${id}），因為該證書的狀態不為「啟用」。`;
  }
}

/**
 * 使用者嘗試讀取一個不公開的證書且又不為證書擁有者。
 */
export class PrivateCertificateException extends ServiceException {
  constructor(id: number | string) {
    super();
    this.message = `指定的證書紀錄（id: ${id}）並不公開且使用者不為證書擁有者，因此無法存取此資料`;
  }
}

/**
 * 使用者提供的權杖經檢驗後失敗。
 */
export class TokenVerificationFailureException extends ServiceException {
  constructor() {
    super();
    this.message = '權杖驗證失敗';
  }
}

/**
 * 取得權杖的管道不對。
 * 如原本是要由電話驗證管道所取得的權杖卻變成了電子郵件管道驗證的權杖。
 */
export class IncorrectVerificationMethodException extends ServiceException {
  constructor(methodName: string) {
    super();
    this.message = `取得權杖的管道不為 ${methodName}`;
  }
}

/**
 * 目標為更新指定資料，但使用者卻提供相同的資料。
 */
export class IdenticalValueException extends ServiceException {
  constructor(name: string) {
    super();
    this.message = `提供的 ${name} 與資料庫中的一致，請換新的 ${name} 後再操作一次`;
  }
}

/**
 * 電子信箱驗證碼驗證失敗。
 */
export class InvalidEmailVerificationException extends ServiceException {
  constructor(reason?: string) {
    super();
    if (typeof reason === 'string') {
      this.message = reason;
      return;
    }
    this.message = '電子信箱驗證碼驗證失敗';
  }
}

/**
 * 目標證書群組的狀態為「已取消」，無法進行加發證書或是再取消的動作。
 */
export class CancelledCertRecordGroupException extends ServiceException {
  constructor(id: number) {
    super();
    this.message = `目標證書群組（id: ${id}）的狀態為「已取消」，無法進行加發證書或是再取消的動作。`;
  }
}

/**
 * 不合法的 PDF 檔案內容格式。
 */
export class InvalidBackgroundPdfFormatException extends ServiceException {
  constructor(reason: string) {
    super(reason);
  }
}
