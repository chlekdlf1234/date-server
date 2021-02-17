import { ILinkInvitationModel, ILinkedUserModel } from '../../types/model';
import { IHttpRequest, ServiceFunction, IEmailParam } from '../../types/common';

type InvitationInformation = ILinkInvitationModel | ILinkedUserModel;

interface IReturn {
  status: string;
  linkInformation: InvitationInformation;
}

export default (getLinkInformation: ServiceFunction<IEmailParam, IReturn>) => async ({ user }: IHttpRequest): Promise<IReturn> => {
  try {
    const linkInformation = await getLinkInformation({ email: (user!.email as unknown) as string });

    return linkInformation;
  } catch (error) {
    throw new Error(error);
  }
};
