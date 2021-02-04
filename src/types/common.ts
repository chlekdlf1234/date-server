import { Request, Response } from 'express';

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
}

export interface IUserIdParam {
  userId: string;
}

export type Controller = (request: IHttpRequest) => Promise<{ [key: string]: string }>;
export type ServiceFunction<P, R> = (param: P) => Promise<R>;
