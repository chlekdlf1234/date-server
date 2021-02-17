import { ILinkedUserModel } from '../../types/model';
import { IHttpRequest, ServiceFunction, ILinkIDParam } from '../../types/common';

export default (confirmInvitation: ServiceFunction<ILinkIDParam, ILinkedUserModel>) => async ({ user, params }: IHttpRequest): Promise<ILinkedUserModel> => {
  try {
    const { linkID } = params;

    const linkedUser = await confirmInvitation({ email: user!.email, linkID });

    return linkedUser;
  } catch (error) {
    throw new Error(error);
  }
};
