import { ILinkInvitationModel } from '../../types/model';
import { IHttpRequest, ServiceFunction, IInvitationParam } from '../../types/common';

export default (addInvitation: ServiceFunction<IInvitationParam, ILinkInvitationModel>) => async ({ user, body }: IHttpRequest): Promise<ILinkInvitationModel> => {
  try {
    const { guestEmail } = body;
    const invitation = await addInvitation({ hostEmail: (user!.email as unknown) as string, guestEmail });

    return invitation;
  } catch (error) {
    throw new Error(error);
  }
};
