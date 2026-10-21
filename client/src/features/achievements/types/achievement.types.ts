export interface Achievement {
  _id: string;

  title: string;

  organization: string;

  description: string;

  date: string;

  imageUrl?: string;

  credentialUrl?: string;

  display: boolean;

  displayOrder: number;

  createdAt: string;

  updatedAt: string;
}
