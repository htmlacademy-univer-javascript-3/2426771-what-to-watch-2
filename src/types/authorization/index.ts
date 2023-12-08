export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown'
}

export interface AuthorizationError {
  errorType: string;
  message: string;
  details: {
    property: string;
    value: string;
    messages: [string];
  }[];
}

export interface AuthorizationResponse {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
}

export interface AuthorizationRequest {
  email: string;
  password: string;
}
