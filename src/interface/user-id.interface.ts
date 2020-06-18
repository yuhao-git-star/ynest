import { Request } from 'express';
import { Response } from 'express';

export interface AppRequest<T> extends Request {
    user: T
}


export interface AppResponse<T> extends Response {
    user: T
}
