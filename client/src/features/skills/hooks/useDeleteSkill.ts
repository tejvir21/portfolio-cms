import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteSkill } from "../api/skill.api";

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};
