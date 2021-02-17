import { ILinkInvitationModel, ILinkInvitationAttr } from '../../types/model';
import { IHttpRequest, ServiceFunction, IInvitationParam } from '../../types/common';
import deleteKey from '../../helper/deleteKey';

export default (addInvitation: ServiceFunction<IInvitationParam, ILinkInvitationModel>) => async ({ user, body }: IHttpRequest): Promise<ILinkInvitationAttr> => {
  try {
    const { guestEmail } = body;
    const invitation = await addInvitation({ hostEmail: (user!.email as unknown) as string, guestEmail });

    const result = deleteKey({ ...invitation });

    return result as ILinkInvitationAttr;
  } catch (error) {
    throw new Error(error);
  }
};
