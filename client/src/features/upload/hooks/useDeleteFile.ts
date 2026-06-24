import { deleteFile } from "@/features/upload/api/deleteFile";
import { useMutation } from "@tanstack/react-query";

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: deleteFile,
  });
};
