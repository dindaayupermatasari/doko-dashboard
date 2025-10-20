import api from "./api";

export const getRecommendation = async (masalah: string, detail_petani: string) => {
  const response = await api.post("/analysis/recommendation", {
    masalah,
    detail_petani,
  });
  return response.data;
};
