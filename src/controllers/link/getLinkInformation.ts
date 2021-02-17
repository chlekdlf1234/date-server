import { ILinkInvitationModel, ILinkedUserModel, ILinkInvitationAttr, ILinkedUserAttr } from '../../types/model';
import { IHttpRequest, ServiceFunction, IEmailParam } from '../../types/common';

import deleteKey from '../../helper/deleteKey';

type InvitationInformation = ILinkInvitationModel | ILinkedUserModel | undefined;
type InvitationAttrInformation = ILinkInvitationAttr | ILinkedUserAttr;
interface IServiceReturn {
  status: string;
  linkInformation: InvitationInformation;
}
interface IControllerReturn {
  status: string;
  linkInformation: InvitationAttrInformation;
}

export default (getLinkInformation: ServiceFunction<IEmailParam, IServiceReturn>) => async ({ user }: IHttpRequest): Promise<IControllerReturn> => {
  try {
    const { status, linkInformation } = await getLinkInformation({ email: (user!.email as unknown) as string });

    let result;

    if (linkInformation) {
      result = deleteKey(linkInformation);
    }

    return { status, linkInformation: result as InvitationAttrInformation };
  } catch (error) {
    throw new Error(error);
  }
};
