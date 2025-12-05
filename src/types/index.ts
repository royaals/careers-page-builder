
export interface Company {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  banner?: string | null;
  primaryColor: string;
  secondaryColor: string;
  cultureVideo?: string | null;
  isPublished: boolean;
  sections?: Section[];
  jobs?: Job[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  type: SectionType;
  order: number;
  isVisible: boolean;
  companyId: string;
}

export type SectionType =
  | "ABOUT_US"
  | "LIFE_AT_COMPANY"
  | "VALUES"
  | "BENEFITS"
  | "CUSTOM";

export interface Job {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  workPolicy: string;
  location: string;
  department: string;
  employmentType: string;
  experienceLevel: string;
  jobType: string;
  salaryRange?: string | null;
  postedAt: Date;
  isActive: boolean;
  companyId: string;
}

export interface JobFilters {
  search?: string;
  location?: string;
  workPolicy?: string;
  department?: string;
  employmentType?: string;
  experienceLevel?: string;
}