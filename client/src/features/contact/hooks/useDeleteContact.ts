import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteContact } from "../api/contact.api";

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};
