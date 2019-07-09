import { InfoState } from './info.state';

export const getUser = (state: InfoState) => state.user;
export const getLoggedIn = (state: InfoState) => state.loggedIn;
export const getErrorMessage = (state: InfoState) => state.errorMessage;
