import { supabase } from "../config/supabase";

const BUCKET = process.env.SUPABASE_BUCKET_NAME!;

export const removeFileFromStorage = async (key: string) => {
  if (!key) return;

  const { error } = await supabase.storage.from(BUCKET).remove([key]);

  if (error) {
    throw error;
  }
};
