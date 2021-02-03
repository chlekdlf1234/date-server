import { Request, Response } from 'express';
import { IUserModel } from './model';

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

export type Controller = (request: IHttpRequest) => Promise<{ [key: string]: string }>;

export type AddUser = (param: IAddUserParam) => Promise<IUserModel>;

export type GetUser = (param: IGetUserParam) => Promise<IUserModel>;

interface IAddUserParam {
  userId: string;
  name: string;
  birthday: string;
  job: string;
}

interface IGetUserParam {
  userId: string;
}
