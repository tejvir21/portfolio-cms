import { useQuery } from "@tanstack/react-query";

import { getProjectBySlug } from "../api/getProjectBySlug";

export const useProject = (slug: string) => {
  return useQuery({
    queryKey: ["project", slug],

    queryFn: () => getProjectBySlug(slug),

    enabled: !!slug,
  });
};
