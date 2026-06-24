export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  company: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}
