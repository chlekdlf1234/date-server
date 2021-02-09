interface IBaseModel {
  PK: string;
  SK?: string;
  createdAt?: string;
  updatedAt?: string;
  GSI1PK?: string;
  GSI1SK?: string;
  GSI2PK?: string;
}

export interface IAuthAttr {
  email: string;
  password: string;
}
export interface IAuthModel extends IBaseModel, IAuthAttr {}

export interface IUserAttr {
  name: string;
  birthday: string;
  job: string;
  email: string;
}
export interface IUserModel extends IBaseModel, IUserAttr {}

export interface IUserDailyStatusAttr {
  status: 'study' | 'pause' | 'wait';
  period: 'day';
  dailyStudySeconds: number;
  statusStartTime: string;
  email: string;
}

export interface IUserDailyStatusModel extends IBaseModel, IUserDailyStatusAttr {}
