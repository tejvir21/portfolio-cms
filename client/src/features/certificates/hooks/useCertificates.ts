import { useQuery } from "@tanstack/react-query";

import { getCertificates } from "../api/certificate.api";

export const useCertificates = () => {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
  });
};
