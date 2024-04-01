import { 
  OnionWebsiteType,
  OnionWebsiteDropdownType,
} from '.';

export interface WebCloneType {
  id: number;
  onionWebsite: OnionWebsiteType;
    cloneUrl: string;
    clonedAt?: string;
  }

export interface WebCloneFormModalType {
  onionWebsite: OnionWebsiteDropdownType;
    cloneUrl: string;
    clonedAt?: string;
  }

export interface WebCloneListItemType {
  id: number;
  onionWebsite: OnionWebsiteDropdownType;
    cloneUrl: string;
    clonedAt?: string;
  }

export interface WebCloneListType {
  result: WebCloneListItemType[];
  total: number;
}

export interface WebCloneDropdownType {
  id: number;
}

export interface CreateOrUpdateWebCloneType {
  onionWebsiteId: number;
    cloneUrl: string;
    clonedAt?: string;
  }
