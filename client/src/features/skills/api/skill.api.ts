import api from "../../../services/api";

import { type ApiResponse } from "../../../types/api.types";
import { type Skill } from "../types/skill.types";

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get<ApiResponse<Skill[]>>("/skills");

  return response.data.data;
};

export interface SkillPayload {
  name: string;
  category: string;
  icon?: string;
  proficiency: number;
  displayOrder: number;
}

export const createSkill = async (data: SkillPayload) => {
  const response = await api.post<ApiResponse<Skill>>("/skills", data);

  return response.data.data;
};

export const updateSkill = async ({
  id,
  data,
}: {
  id: string;
  data: SkillPayload;
}) => {
  const response = await api.put<ApiResponse<Skill>>(`/skills/${id}`, data);

  return response.data.data;
};

export const deleteSkill = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/skills/${id}`);

  return response.data;
};
