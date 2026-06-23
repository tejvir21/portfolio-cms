import api from "../../../services/api";

import { type ApiResponse } from "../../../types/api.types";
import { type Achievement } from "../types/achievement.types";

export const getAchievements = async (): Promise<Achievement[]> => {
  const response = await api.get<ApiResponse<Achievement[]>>("/achievements");

  return response.data.data;
};

export interface AchievementPayload {
  title: string;
  organization: string;
  description: string;
  date?: string;
  imageUrl?: string;
  credentialUrl?: string;
  displayOrder: number;
}

export const createAchievement = async (data: AchievementPayload) => {
  const response = await api.post<ApiResponse<Achievement>>(
    "/achievements",
    data,
  );

  return response.data.data;
};

export const updateAchievement = async ({
  id,
  data,
}: {
  id: string;
  data: AchievementPayload;
}) => {
  const response = await api.put<ApiResponse<Achievement>>(
    `/achievements/${id}`,
    data,
  );

  return response.data.data;
};

export const deleteAchievement = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/achievements/${id}`);

  return response.data;
};
