import api from "../../../services/api";

import { type ApiResponse } from "../../../types/api.types";
import { type Experience } from "../types/experience.types";

export interface ExperiencePayload {
  company: string;
  position: string;
  employmentType: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  location?: string;
  description: string;
  technologies: string[];
  companyLogo?: string;
  displayOrder: number;
}

export const getExperiences = async (): Promise<Experience[]> => {
  const response = await api.get<ApiResponse<Experience[]>>("/experience");

  return response.data.data;
};

export const createExperience = async (data: ExperiencePayload) => {
  const response = await api.post<ApiResponse<Experience>>("/experience", data);

  return response.data.data;
};

export const updateExperience = async ({
  id,
  data,
}: {
  id: string;
  data: ExperiencePayload;
}) => {
  const response = await api.put<ApiResponse<Experience>>(
    `/experience/${id}`,
    data,
  );

  return response.data.data;
};

export const deleteExperience = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/experience/${id}`);

  return response.data;
};
