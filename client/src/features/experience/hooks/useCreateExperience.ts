import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createExperience } from "../api/experience.api";

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExperience,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
    },
  });
};
