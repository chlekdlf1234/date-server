import { ILinkedUserModel, ILinkedUserAttr } from '../../types/model';
import { IHttpRequest, ServiceFunction, ILinkIDParam } from '../../types/common';
import deleteKey from '../../helper/deleteKey';

export default (confirmInvitation: ServiceFunction<ILinkIDParam, ILinkedUserModel>) => async ({ user, params }: IHttpRequest): Promise<ILinkedUserAttr> => {
  try {
    const { linkID } = params;

    const linkedUser = await confirmInvitation({ email: user!.email, linkID });

    const result = deleteKey({ ...linkedUser });

    return result as ILinkedUserAttr;
  } catch (error) {
    throw new Error(error);
  }
};
