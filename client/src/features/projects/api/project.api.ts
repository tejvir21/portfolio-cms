import api from "../../../services/api";

import { type Project } from "../types/project.types";

import { type ApiResponse } from "../../../types/api.types";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ApiResponse<Project[]>>("/projects");

  return response.data.data;
};

export interface CreateProjectInput {
  title: string;
  slug: string;

  role: string;

  shortDescription: string;
  fullDescription: string;

  technologies: string[];

  category: string;
  status: "completed" | "in-progress";

  gallery: { url: string; key: string }[];

  problemStatement: string;
  architecture: string;
  challenges: string;
  learnings: string;

  imageUrl?: string;
  imageKey?: string;

  githubUrl?: string;

  liveUrl?: string;

  featured?: boolean;
}

export const createProject = async (data: CreateProjectInput) => {
  const response = await api.post("/projects", data);

  return response.data;
};
