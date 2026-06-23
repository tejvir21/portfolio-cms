import { useMutation } from "@tanstack/react-query";

import { createContact } from "../api/contact.api";

export const useCreateContact = () => {
  return useMutation({
    mutationFn: createContact,
  });
};
