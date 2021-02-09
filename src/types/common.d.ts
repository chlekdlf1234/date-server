import { Request, Response } from 'express';

import { IAuthModel } from './model';

declare global {
  namespace Express {
    export interface User extends IAuthModel {}
  }
}

export interface ICallbackParam {
  req: Request;
  res: Response;
}

export interface IHttpRequest {
  body: Request['body'];
  query: Request['query'];
  params: Request['params'];
  method: Request['method'];
  path: Request['path'];
  user?: IAuthModel;
}

export interface IEmailParam {
  email: string;
}
export interface IPeriodParam {
  email: string;
  period: string;
}

export type Controller = (request: IHttpRequest) => Promise<{ [key: string]: string }>;
export type ServiceFunction<P, R> = (param: P) => Promise<R>;
