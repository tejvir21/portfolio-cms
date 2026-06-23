import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../api/settings.api";

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
};
