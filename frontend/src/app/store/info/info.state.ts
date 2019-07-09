export interface User {
  username: string;
  sex: string;
  lastName: string;
  profileData: any;
}

export interface InfoState {
  loading: boolean;
  loggedIn: boolean;
  hasError?: boolean;
  user?: User;
  errorMessage?: string;
}

export const initialState: InfoState = {
  loading: false,
  loggedIn: false,
  hasError: false,
};
