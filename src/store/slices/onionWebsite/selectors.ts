import { RootState } from '../../store';

export const onionWebsiteList = (rootState: RootState) => rootState.onionWebsite.list;
export const onionWebsiteDetails = (rootState: RootState) =>
  rootState.onionWebsite.detail;
export const onionWebsiteDropdown = (rootState: RootState) =>
  rootState.onionWebsite.dropdown;
