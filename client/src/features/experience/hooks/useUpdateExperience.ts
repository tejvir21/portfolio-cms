import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateExperience } from "../api/experience.api";

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExperience,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
    },
  });
};
