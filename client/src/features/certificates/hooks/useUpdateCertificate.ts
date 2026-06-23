import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCertificate } from "../api/certificate.api";

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};
