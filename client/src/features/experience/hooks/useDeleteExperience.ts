import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteExperience } from "../api/experience.api";

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExperience,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
    },
  });
};
