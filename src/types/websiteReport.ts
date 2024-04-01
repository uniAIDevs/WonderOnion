import { 
  OnionWebsiteType,
  OnionWebsiteDropdownType,
} from '.';

export interface WebsiteReportType {
  id: number;
  onionWebsite: OnionWebsiteType;
    reportContent?: string;
    reportedAt?: string;
  }

export interface WebsiteReportFormModalType {
  onionWebsite: OnionWebsiteDropdownType;
    reportContent?: string;
    reportedAt?: string;
  }

export interface WebsiteReportListItemType {
  id: number;
  onionWebsite: OnionWebsiteDropdownType;
    reportContent?: string;
    reportedAt?: string;
  }

export interface WebsiteReportListType {
  result: WebsiteReportListItemType[];
  total: number;
}

export interface WebsiteReportDropdownType {
  id: number;
}

export interface CreateOrUpdateWebsiteReportType {
  onionWebsiteId: number;
    reportContent?: string;
    reportedAt?: string;
  }
