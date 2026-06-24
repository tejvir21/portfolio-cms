import api from "@/services/api";

export interface Profile {
  _id?: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  leetcode?: string;
  twitter?: string;
  portfolio?: string;
  resumeUrl: string;
  resumeKey: string;
  bio: string;
  imageUrl?: string;
  imageKey?: string;
  profileImage?: string;
}

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data.data;
};

export const updateProfile = async (data: Profile) => {
  const response = await api.put("/profile", data);

  return response.data.data;
};
