import api from "../../../services/api";

import { type ApiResponse } from "../../../types/api.types";
import { type Certificate } from "../types/certificate.types";

export interface CertificatePayload {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export const getCertificates = async (): Promise<Certificate[]> => {
  const response = await api.get<ApiResponse<Certificate[]>>("/certificates");

  return response.data.data;
};

export const createCertificate = async (data: CertificatePayload) => {
  const response = await api.post<ApiResponse<Certificate>>(
    "/certificates",
    data,
  );

  return response.data.data;
};

export const updateCertificate = async ({
  id,
  data,
}: {
  id: string;
  data: CertificatePayload;
}) => {
  const response = await api.put<ApiResponse<Certificate>>(
    `/certificates/${id}`,
    data,
  );

  return response.data.data;
};

export const deleteCertificate = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/certificates/${id}`);

  return response.data;
};
