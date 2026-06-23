import api from "../../../services/api";

export const getProjectBySlug = async (slug: string) => {
  const response = await api.get(`/projects/${slug}`);

  return response.data.data;
};
