import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSettings } from "../api/settings.api";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
