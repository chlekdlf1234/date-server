import keyPrefix from './keyPrefix.json';
import { IKeyHelperParam, IReturnKey } from '../types/helper';

export default ({ model, key }: IKeyHelperParam): boolean => {
  const modelKeyObject: IReturnKey = keyPrefix[model as keyof typeof keyPrefix];
  const modelKeys: string[] = Object.keys(modelKeyObject);

  for (let i = 0; i < modelKeys.length; i += 1) {
    const indexKey = modelKeys[i] as keyof typeof modelKeyObject;

    const keyPrefixValue = modelKeyObject[indexKey];

    if (!key[indexKey]!.includes(keyPrefixValue!)) {
      return false;
    }
  }
  return true;
};
