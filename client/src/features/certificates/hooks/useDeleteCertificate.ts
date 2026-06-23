import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCertificate } from "../api/certificate.api";

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};
