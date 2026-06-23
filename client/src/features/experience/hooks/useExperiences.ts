import { useQuery } from "@tanstack/react-query";

import { getExperiences } from "../api/experience.api";

export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });
};
