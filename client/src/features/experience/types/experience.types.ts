export interface Experience {
  _id: string;
  company: string;
  position: string;
  employmentType: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  location?: string;
  description?: string;
  technologies: string[];
  companyLogo?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}
