import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserEmail = (state: Pick<State, NameSpace.User>): string | null => state[NameSpace.User].email;
export const getAvatarUrl = (state: Pick<State, NameSpace.User>): string | null => state[NameSpace.User].avatarUrl;
