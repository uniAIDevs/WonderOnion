import {
  BaseResponseType,
  OnionWebsiteDropdownType,
  OnionWebsiteListType,
  OnionWebsiteType,
  CreateOrUpdateOnionWebsiteType,
} from '../types';
import queryAsync from './apiClient';
import { TOR_PROXY_CONFIG } from './torConfig';
import { SocksProxyAgent } from 'socks-proxy-agent';

export const getOnionWebsites = (
  page: number,
  limit: number = 10,
  search?: string,
) => {
  const agent = new SocksProxyAgent(`socks5h://${TOR_PROXY_CONFIG.host}:${TOR_PROXY_CONFIG.port}`);
  return queryAsync<OnionWebsiteListType>({ agent,
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
  const agent = new SocksProxyAgent(`socks5h://${TOR_PROXY_CONFIG.host}:${TOR_PROXY_CONFIG.port}`);
  return queryAsync<OnionWebsiteType>({ agent,
    path: `/onionWebsites/${id}`,
    type: 'GET',
  });
};

export const createOnionWebsite = (params: CreateOrUpdateOnionWebsiteType) => {
  const agent = new SocksProxyAgent(`socks5h://${TOR_PROXY_CONFIG.host}:${TOR_PROXY_CONFIG.port}`);
  const agent = new SocksProxyAgent(`socks5h://${TOR_PROXY_CONFIG.host}:${TOR_PROXY_CONFIG.port}`);
  return queryAsync<OnionWebsiteType>({ agent, agent,
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
  const agent = new SocksProxyAgent(`socks5h://${TOR_PROXY_CONFIG.host}:${TOR_PROXY_CONFIG.port}`);
  return queryAsync<BaseResponseType>({ agent,
    path: `/onionWebsites/${id}`,
    type: 'DELETE',
  });
};

export const getOnionWebsiteDropdown = (keyword?: string) => {
  const agent = new SocksProxyAgent(`socks5h://${TOR_PROXY_CONFIG.host}:${TOR_PROXY_CONFIG.port}`);
  return queryAsync<OnionWebsiteDropdownType[]>({ agent,
    path: `/onionWebsites/dropdown`,
    type: 'GET',
    queryParams: {
      ...(keyword && { keyword }),
    },
  });
};
