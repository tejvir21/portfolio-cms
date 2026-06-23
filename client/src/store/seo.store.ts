import { create } from "zustand";
import api from "@/services/api";

interface SeoData {
  homeTitle: string;
  homeDescription: string;
  keywords: string[];
}

interface SeoStore {
  seo: SeoData | null;
  loading: boolean;
  error: string | null;

  fetchSeo: (page?: string) => Promise<void>;
}

export const useSeoStore = create<SeoStore>((set) => ({
  seo: null,
  loading: false,
  error: null,

  fetchSeo: async () => {
    try {
      set({ loading: true, error: null });

      const { data } = await api.get("/settings");

      set({
        seo: data.data,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to fetch SEO data",
      });
    }
  },
}));
