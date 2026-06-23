import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSkill } from "../api/skill.api";

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};
