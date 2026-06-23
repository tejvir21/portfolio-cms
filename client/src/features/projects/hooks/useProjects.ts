import { useQuery } from "@tanstack/react-query";

import { getProjects } from "../api/project.api";
import { getProjectBySlug } from "../api/getProjectBySlug";

export const useProjects = (slug?: string) => {
  if (slug) {
    return useQuery({
      queryKey: ["project", slug],

      queryFn: () => getProjectBySlug(slug),

      enabled: !!slug,
    });
  }

  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};
