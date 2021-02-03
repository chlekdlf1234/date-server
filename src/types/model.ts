interface IBaseModel {
  PK: string;
  SK: string;
  createdAt?: string;
  updatedAt?: string;
  GSI1PK?: string;
  GSI1SK?: string;
  GSI2PK?: string;
}

export interface IUserModel extends IBaseModel {
  name: string;
  birthday: string;
  job: string;
  userId: string;
}

export interface IUserDailyStatusModel extends IBaseModel {
  status: 'study' | 'pause' | 'wait';
  dailyStudySeconds: number;
  statusStartTime: Date;
  userId: string;
}
