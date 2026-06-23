import { useQuery } from "@tanstack/react-query";

import { getSkills } from "../api/skill.api";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
};
