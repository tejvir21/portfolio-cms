import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCertificateCompany } from "../api/certificateCompany.api";

export const useCreateCertificateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCertificateCompany,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificate-companies"],
      });
    },
  });
};
