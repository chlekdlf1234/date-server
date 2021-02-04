interface IBaseModel {
  PK: string;
  SK: string;
  createdAt?: string;
  updatedAt?: string;
  GSI1PK?: string;
  GSI1SK?: string;
  GSI2PK?: string;
}

export interface IUserAttr {
  name: string;
  birthday: string;
  job: string;
  userId: string;
}
export interface IUserModel extends IBaseModel, IUserAttr {}

export interface IUserDailyStatusAttr {
  status: 'study' | 'pause' | 'wait';
  period: 'day';
  dailyStudySeconds: number;
  statusStartTime: string;
  userId: string;
}

export interface IUserDailyStatusModel extends IBaseModel, IUserDailyStatusAttr {}
