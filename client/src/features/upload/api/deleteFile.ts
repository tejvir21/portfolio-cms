import api from "../../../services/api";

export const deleteFile = async (key: string) => {
  return api.delete("/upload", {
    data: {
      key,
    },
  });
};
