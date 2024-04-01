import {
  BaseResponseType,
  OnionWebsiteDropdownType,
  OnionWebsiteListType,
  OnionWebsiteType,
  CreateOrUpdateOnionWebsiteType,
} from '../types';
import queryAsync from './apiClient';

export const getOnionWebsites = (
  page: number,
  limit: number = 10,
  search?: string,
) => {
  return queryAsync<OnionWebsiteListType>({
    path: `/onionWebsites`,
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

export const getOnionWebsite = (id: number) => {
  return queryAsync<OnionWebsiteType>({
    path: `/onionWebsites/${id}`,
    type: 'GET',
  });
};

export const createOnionWebsite = (params: CreateOrUpdateOnionWebsiteType) => {
  return queryAsync<OnionWebsiteType>({
    path: `/onionWebsites`,
    type: 'POST',
    data: { ...params },
  });
};

export const updateOnionWebsite = (
  id: number,
  params: CreateOrUpdateOnionWebsiteType,
) => {
  return queryAsync<OnionWebsiteType>({
    path: `/onionWebsites/${id}`,
    type: 'PUT',
    data: { ...params },
  });
};

export const deleteOnionWebsite = (id: number) => {
  return queryAsync<BaseResponseType>({
    path: `/onionWebsites/${id}`,
    type: 'DELETE',
  });
};

export const getOnionWebsiteDropdown = (keyword?: string) => {
  return queryAsync<OnionWebsiteDropdownType[]>({
    path: `/onionWebsites/dropdown`,
    type: 'GET',
    queryParams: {
      ...(keyword && { keyword }),
    },
  });
};
