import { RootState } from '../../store';

export const webCloneList = (rootState: RootState) => rootState.webClone.list;
export const webCloneDetails = (rootState: RootState) =>
  rootState.webClone.detail;
export const webCloneDropdown = (rootState: RootState) =>
  rootState.webClone.dropdown;
