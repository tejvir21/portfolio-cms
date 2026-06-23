import { useQuery } from "@tanstack/react-query";

import { getContacts } from "../api/contact.api";

export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });
};
