export interface IKeyHelperParam {
  model: string;
  key: IInputKey;
}

export interface IInputKey {
  PK?: string;
  SK?: string;
  GSI1PK?: string;
  GSI1SK?: string;
  GSI2PK?: string;
}

export interface IReturnKey {
  PK?: string;
  SK?: string;
  GSI1PK?: string;
  GSI1SK?: string;
  GSI2PK?: string;
}

export type IsValidKey = ({ model, key }: IKeyHelperParam) => boolean;

export type AddPrefix = ({ model, key }: IKeyHelperParam) => IReturnKey;
