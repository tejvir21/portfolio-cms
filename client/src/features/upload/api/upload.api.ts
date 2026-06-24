import api from "../../../services/api";

// For Cloudinary Server Upload

// export interface UploadResponse {
//   url: string;
//   publicId: string;
// }

// For R2 Server Upload

export interface UploadResponse {
  url: string;
  key: string;
}

export const uploadFile = async (
  file: File,
  folder = "misc",
): Promise<UploadResponse> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/upload?folder=${encodeURIComponent(folder)}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.data;
};
