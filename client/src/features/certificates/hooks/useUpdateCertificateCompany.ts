import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCertificateCompany } from "../api/certificateCompany.api";

export const useUpdateCertificateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCertificateCompany,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificate-companies"],
      });
    },
  });
};
