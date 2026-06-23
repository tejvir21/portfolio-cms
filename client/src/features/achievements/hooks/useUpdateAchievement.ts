import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAchievement } from "../api/achievement.api";

export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
};
