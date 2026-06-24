import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCertificateCompany } from "../api/certificateCompany.api";

export const useDeleteCertificateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCertificateCompany,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificate-companies"],
      });
    },
  });
};
