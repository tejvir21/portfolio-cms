import { useQuery } from "@tanstack/react-query";

import { getAchievements } from "../api/achievement.api";

export const useAchievements = () => {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
  });
};
