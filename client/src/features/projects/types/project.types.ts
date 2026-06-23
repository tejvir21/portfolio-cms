export interface Project {
  _id: string;

  title: string;
  slug: string;

  category: string;

  status: "completed" | "in-progress";

  role: string;

  shortDescription: string;
  fullDescription: string;

  technologies: string[];

  imageUrl: string;
  imageKey: string;

  // gallery: string[];
  gallery: {
    url: string;
    key: string;
  }[];

  githubUrl: string;
  liveUrl: string;

  featured: boolean;

  views: number;

  problemStatement: string;
  architecture: string;
  challenges: string;
  learnings: string;

  displayOrder?: number;

  createdAt: string;
  updatedAt: string;
}
