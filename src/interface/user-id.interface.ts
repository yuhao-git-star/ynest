import { Request } from 'express';
import { Response } from 'express';

export interface AppRequest<T> extends Request {
    user: T
    trackingId: string;
}


export interface AppResponse<T> extends Response {
    user: T
}
