import api from "../../../services/api";
import { type ApiResponse } from "../../../types/api.types";

export interface CertificateCompany {
  _id: string;
  name: string;
  slug: string;
  logoUrl: string;
  logoKey?: string;
  active: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CertificateCompanyInput {
  name: string;
  logoUrl: string;
  logoKey?: string;
  active?: boolean;
  sortOrder?: number;
}

export const getCertificateCompanies = async (): Promise<
  CertificateCompany[]
> => {
  const response = await api.get<ApiResponse<CertificateCompany[]>>(
    "/certificate-companies",
  );

  return response.data.data;
};

export const createCertificateCompany = async (
  data: CertificateCompanyInput,
) => {
  const response = await api.post("/certificate-companies", data);
  return response.data;
};

export const updateCertificateCompany = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<CertificateCompanyInput>;
}) => {
  const response = await api.put(`/certificate-companies/${id}`, data);
  return response.data;
};

export const deleteCertificateCompany = async (id: string) => {
  const response = await api.delete(`/certificate-companies/${id}`);
  return response.data;
};
