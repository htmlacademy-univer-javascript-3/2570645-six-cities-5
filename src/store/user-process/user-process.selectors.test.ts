import { NameSpace } from '../../const';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus, getUserEmail, getAvatarUrl } from './selectors';

describe('UserProcess selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      email: 'test@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    }
  };

  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return user email from state', () => {
    const { email } = state[NameSpace.User];
    const result = getUserEmail(state);
    expect(result).toBe(email);
  });

  it('should return avatar URL from state', () => {
    const { avatarUrl } = state[NameSpace.User];
    const result = getAvatarUrl(state);
    expect(result).toBe(avatarUrl);
  });

  it('should return null for email when state has no email', () => {
    const stateWithoutEmail = {
      [NameSpace.User]: {
        ...state[NameSpace.User],
        email: null,
      }
    };
    const result = getUserEmail(stateWithoutEmail);
    expect(result).toBeNull();
  });

  it('should return null for avatar URL when state has no avatar URL', () => {
    const stateWithoutAvatar = {
      [NameSpace.User]: {
        ...state[NameSpace.User],
        avatarUrl: null,
      }
    };
    const result = getAvatarUrl(stateWithoutAvatar);
    expect(result).toBeNull();
  });
});
