import { RootState } from '../../store';

export const accountDetails = (rootState: RootState) =>
  rootState.account.details;
