import { ChangePasswordType, MyAccountType } from '../types';
import queryAsync from './apiClient';

export const getMyAccount = () => {
  return queryAsync<MyAccountType>({
    path: `/users/me`,
    type: 'Get',
  });
};

export const updateMyAccount = (params: MyAccountType) => {
  return queryAsync<void>({
    path: `/users/me`,
    type: 'PUT',
    data: { ...params },
  });
};

export const changePassword = (params: ChangePasswordType) => {
  return queryAsync<void>({
    path: `/auth/change-password`,
    type: 'PUT',
    data: { ...params },
  });
};
