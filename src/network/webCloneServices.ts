import {
  BaseResponseType,
  WebCloneDropdownType,
  WebCloneListType,
  WebCloneType,
  CreateOrUpdateWebCloneType,
} from '../types';
import queryAsync from './apiClient';

export const getWebClones = (
  page: number,
  limit: number = 10,
  search?: string,
) => {
  return queryAsync<WebCloneListType>({
    path: `/webClones`,
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

export const getWebClone = (id: number) => {
  return queryAsync<WebCloneType>({
    path: `/webClones/${id}`,
    type: 'GET',
  });
};

export const createWebClone = (params: CreateOrUpdateWebCloneType) => {
  return queryAsync<WebCloneType>({
    path: `/webClones`,
    type: 'POST',
    data: { ...params },
  });
};

export const updateWebClone = (
  id: number,
  params: CreateOrUpdateWebCloneType,
) => {
  return queryAsync<WebCloneType>({
    path: `/webClones/${id}`,
    type: 'PUT',
    data: { ...params },
  });
};

export const deleteWebClone = (id: number) => {
  return queryAsync<BaseResponseType>({
    path: `/webClones/${id}`,
    type: 'DELETE',
  });
};

export const getWebCloneDropdown = (keyword?: string) => {
  return queryAsync<WebCloneDropdownType[]>({
    path: `/webClones/dropdown`,
    type: 'GET',
    queryParams: {
      ...(keyword && { keyword }),
    },
  });
};
