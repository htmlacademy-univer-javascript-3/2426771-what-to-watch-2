import { AuthorizationError, AuthorizationStatus } from '../../../types/authorization';
import { authFailed, signedIn, signedOut, userReducer } from './user';

describe('userSlice Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      error: null,
      name: null,
      avatarUrl: null,
      email: null,
      token: null
    };

    const result = userReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      error: null,
      name: null,
      avatarUrl: null,
      email: null,
      token: null
    };

    const result = userReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set user info with "signedIn" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      error: null,
      name: null,
      avatarUrl: null,
      email: null,
      token: null
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      error: null,
      name: 'name',
      avatarUrl: 'url',
      email: 'email',
      token: 'token'
    };

    const result = userReducer(initialState, signedIn({
      name: 'name',
      avatarUrl: 'url',
      email: 'email',
      token: 'token'
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set user info with "authFailed" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      error: null,
      name: null,
      avatarUrl: null,
      email: null,
      token: null
    };

    const error: AuthorizationError = {
      errorType: 'type',
      message: 'message',
      details: [{
        property: 'property',
        value: 'value',
        messages: ['message']
      }]
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      error: error,
      name: null,
      avatarUrl: null,
      email: null,
      token: null
    };

    const result = userReducer(initialState, authFailed(error));

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationStatus to NoAuth with "signedOut" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      error: null,
      name: null,
      avatarUrl: null,
      email: null,
      token: null
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      error: null,
      name: null,
      avatarUrl: null,
      email: null,
      token: null
    };

    const result = userReducer(initialState, signedOut);

    expect(result).toEqual(expectedState);
  });

});
