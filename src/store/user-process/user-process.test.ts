import { userProcess, setAuthorizationStatus, saveEmail, saveAvatarUrl } from './user-process';
import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../const';

describe('UserProcess Slice', () => {
  const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    email: null,
    avatarUrl: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change authorization status with "setAuthorizationStatus" action', () => {
    const newAuthStatus = AuthorizationStatus.Auth;
    const expectedState = { ...initialState, authorizationStatus: newAuthStatus };

    const result = userProcess.reducer(initialState, setAuthorizationStatus(newAuthStatus));

    expect(result).toEqual(expectedState);
  });

  it('should save email with "saveEmail" action', () => {
    const userEmail = 'test@example.com';
    const expectedState = { ...initialState, email: userEmail };

    const result = userProcess.reducer(initialState, saveEmail(userEmail));

    expect(result).toEqual(expectedState);
  });

  it('should clear email with "saveEmail" action with null', () => {
    const stateWithEmail = { ...initialState, email: 'test@example.com' };
    const expectedState = { ...initialState, email: null };

    const result = userProcess.reducer(stateWithEmail, saveEmail(null));

    expect(result).toEqual(expectedState);
  });

  it('should save avatar URL with "saveAvatarUrl" action', () => {
    const avatarUrl = 'https://example.com/avatar.jpg';
    const expectedState = { ...initialState, avatarUrl };

    const result = userProcess.reducer(initialState, saveAvatarUrl(avatarUrl));

    expect(result).toEqual(expectedState);
  });

  it('should clear avatar URL with "saveAvatarUrl" action with null', () => {
    const stateWithAvatar = { ...initialState, avatarUrl: 'https://example.com/avatar.jpg' };
    const expectedState = { ...initialState, avatarUrl: null };

    const result = userProcess.reducer(stateWithAvatar, saveAvatarUrl(null));

    expect(result).toEqual(expectedState);
  });
});
