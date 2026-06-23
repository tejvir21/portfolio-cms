import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profile.api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
