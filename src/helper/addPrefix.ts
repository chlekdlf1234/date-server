import keyPrefix from './keyPrefix.json';
import { IKeyHelperParam, IReturnKey } from '../types/helper';

export default ({ model, key }: IKeyHelperParam): IReturnKey => {
  const modelKeyObject = keyPrefix[model as keyof typeof keyPrefix];
  const modelKeys: string[] = Object.keys(modelKeyObject);

  const targetKey = key;

  for (let i = 0; i < modelKeys.length; i += 1) {
    const indexKey = modelKeys[i] as keyof typeof modelKeyObject;

    const keyPrefixValue = modelKeyObject[indexKey];

    if (!targetKey[indexKey]) {
      if (keyPrefixValue.slice(-1) === '#') {
        throw new Error(`Need ${indexKey} value`);
      }
      targetKey[indexKey] = '';
    }

    targetKey[indexKey] = keyPrefixValue.concat(targetKey[indexKey]!);
  }

  return targetKey as IReturnKey;
};
