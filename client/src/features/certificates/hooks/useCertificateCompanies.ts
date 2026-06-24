import { useQuery } from "@tanstack/react-query";
import { getCertificateCompanies } from "../api/certificateCompany.api";

export const useCertificateCompanies = () => {
  return useQuery({
    queryKey: ["certificate-companies"],
    queryFn: getCertificateCompanies,
  });
};
