export interface CompanyInformation {
  id: string;
  name: string;
  description: string;
  location: string;
  industry: string;
  size: string;
  website: string;
  logo: string;
}

export interface CompanyState {
  companies: CompanyInformation[];
  selectedCompany: CompanyInformation | null;
  loading: boolean;
  error: string | null;
}
