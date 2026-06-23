import api from "../../../services/api";

import { type ApiResponse } from "../../../types/api.types";

export interface Settings {
  _id?: string;
  homeTitle: string;
  homeDescription: string;
  keywords: string[];
  engineeringHighlights: string[];
  ogImage: string;
}

export interface SettingsFormValues {
  homeTitle: string;
  homeDescription: string;
  keywords: string;
  engineeringHighlights: string;
  ogImage: string;
}

const splitLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

export const getSettings = async (): Promise<Settings | null> => {
  const response = await api.get<ApiResponse<Settings | null>>("/settings");

  return response.data.data;
};

export const updateSettings = async (data: SettingsFormValues) => {
  const response = await api.put<ApiResponse<Settings>>("/settings", {
    homeTitle: data.homeTitle,
    homeDescription: data.homeDescription,
    keywords: data.keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    engineeringHighlights: splitLines(data.engineeringHighlights),
    ogImage: data.ogImage,
  });

  return response.data.data;
};
