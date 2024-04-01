
export interface OnionWebsiteType {
  id: number;
  url: string;
    title?: string;
    description?: string;
    scannedAt?: string;
    isCloned?: boolean;
  }

export interface OnionWebsiteFormModalType {
  url: string;
    title?: string;
    description?: string;
    scannedAt?: string;
    isCloned?: boolean;
  }

export interface OnionWebsiteListItemType {
  id: number;
  url: string;
    title?: string;
    description?: string;
    scannedAt?: string;
    isCloned?: boolean;
  }

export interface OnionWebsiteListType {
  result: OnionWebsiteListItemType[];
  total: number;
}

export interface OnionWebsiteDropdownType {
  id: number;
  url: string;
}

export interface CreateOrUpdateOnionWebsiteType {
  url: string;
    title?: string;
    description?: string;
    scannedAt?: string;
    isCloned?: boolean;
  }
