// Cloudinary Setup

// import {
//   useMutation,
// } from "@tanstack/react-query";

// import {
//   uploadFile,
// } from "../api/upload.api";

// export const useUpload = () => {
//   return useMutation({
//     mutationFn: uploadFile,
//   });
// };

// R2 Setup

import { useMutation } from "@tanstack/react-query";

import { uploadFile } from "../api/upload.api";

export const useUpload = () => {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) =>
      uploadFile(file, folder),
  });
};
