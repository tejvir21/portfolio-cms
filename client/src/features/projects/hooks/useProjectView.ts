import { useMutation } from "@tanstack/react-query";

import { incrementProjectViews } from "../api/project.api";

export const useProjectView = () => {
  return useMutation({
    mutationFn: incrementProjectViews,
  });
};
