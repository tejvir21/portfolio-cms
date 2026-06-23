import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAchievement } from "../api/achievement.api";

export const useDeleteAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
};
