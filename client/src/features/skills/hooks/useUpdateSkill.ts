import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSkill } from "../api/skill.api";

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};
