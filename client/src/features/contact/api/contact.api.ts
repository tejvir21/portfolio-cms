import api from "../../../services/api";

import { type ApiResponse } from "../../../types/api.types";
import { type ContactMessage } from "../types/contact.types";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const getContacts = async (): Promise<ContactMessage[]> => {
  const response = await api.get<ApiResponse<ContactMessage[]>>("/contact");

  return response.data.data;
};

export const createContact = async (data: ContactPayload) => {
  const response = await api.post<ApiResponse<ContactMessage>>("/contact", data);

  return response.data.data;
};

export const deleteContact = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/contact/${id}`);

  return response.data;
};
