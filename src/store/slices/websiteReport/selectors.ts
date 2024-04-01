import { RootState } from '../../store';

export const websiteReportList = (rootState: RootState) => rootState.websiteReport.list;
export const websiteReportDetails = (rootState: RootState) =>
  rootState.websiteReport.detail;
export const websiteReportDropdown = (rootState: RootState) =>
  rootState.websiteReport.dropdown;
