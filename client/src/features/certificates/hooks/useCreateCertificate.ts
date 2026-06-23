import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCertificate } from "../api/certificate.api";

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};
