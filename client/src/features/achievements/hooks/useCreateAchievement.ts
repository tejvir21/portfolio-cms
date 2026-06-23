import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAchievement } from "../api/achievement.api";

export const useCreateAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
};
