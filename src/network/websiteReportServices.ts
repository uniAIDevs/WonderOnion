import {
  BaseResponseType,
  WebsiteReportDropdownType,
  WebsiteReportListType,
  WebsiteReportType,
  CreateOrUpdateWebsiteReportType,
} from '../types';
import queryAsync from './apiClient';

export const getWebsiteReports = (
  page: number,
  limit: number = 10,
  search?: string,
) => {
  return queryAsync<WebsiteReportListType>({
    path: `/websiteReports`,
    type: 'GET',
    queryParams: {
      page: page + 1,
      limit,
      ...(search && {
        search,
      }),
    },
  });
};

export const getWebsiteReport = (id: number) => {
  return queryAsync<WebsiteReportType>({
    path: `/websiteReports/${id}`,
    type: 'GET',
  });
};

export const createWebsiteReport = (params: CreateOrUpdateWebsiteReportType) => {
  return queryAsync<WebsiteReportType>({
    path: `/websiteReports`,
    type: 'POST',
    data: { ...params },
  });
};

export const updateWebsiteReport = (
  id: number,
  params: CreateOrUpdateWebsiteReportType,
) => {
  return queryAsync<WebsiteReportType>({
    path: `/websiteReports/${id}`,
    type: 'PUT',
    data: { ...params },
  });
};

export const deleteWebsiteReport = (id: number) => {
  return queryAsync<BaseResponseType>({
    path: `/websiteReports/${id}`,
    type: 'DELETE',
  });
};

export const getWebsiteReportDropdown = (keyword?: string) => {
  return queryAsync<WebsiteReportDropdownType[]>({
    path: `/websiteReports/dropdown`,
    type: 'GET',
    queryParams: {
      ...(keyword && { keyword }),
    },
  });
};
