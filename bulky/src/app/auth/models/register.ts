import { Company } from "src/app/pages/company/models/company";

export interface Register {
    email?: string;
    username?: string;
    password?: string;
    role?: string;
    name?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    phoneNumber?: string;
    CompanyId?: number;
  }
  