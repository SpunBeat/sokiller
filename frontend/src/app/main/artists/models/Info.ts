import { User } from '../store/states/info/info.reducer';

export interface UserInfo {
  user: User;
  token: string;
}
