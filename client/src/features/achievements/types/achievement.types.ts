export interface Achievement {
  _id: string;

  title: string;

  organization: string;

  description: string;

  date: string;

  imageUrl?: string;

  credentialUrl?: string;

  displayOrder: number;

  createdAt: string;

  updatedAt: string;
}
