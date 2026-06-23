import { useEffect } from "react";
import { useForm } from "react-hook-form";

import FileUpload from "../../components/admin/FileUpload";
import PageHeader from "../../components/admin/PageHeader";
import { type SettingsFormValues } from "../../features/settings/api/settings.api";
import { useSettings } from "../../features/settings/hooks/useSettings";
import { useUpdateSettings } from "../../features/settings/hooks/useUpdateSettings";
import { useUpload } from "../../features/upload/hooks/useUpload";
import { showError, showSuccess } from "../../utils/toast";

export default function Settings() {
  const { data } = useSettings();
  const updateMutation = useUpdateSettings();
  const uploadMutation = useUpload();

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<SettingsFormValues>({
      defaultValues: {
        homeTitle: "",
        homeDescription: "",
        keywords: "",
        engineeringHighlights: "",
        ogImage: "",
      },
    });

  const ogImage = watch("ogImage");

  useEffect(() => {
    if (!data) return;

    reset({
      homeTitle: data.homeTitle ?? "",
      homeDescription: data.homeDescription ?? "",
      keywords: data.keywords?.join(", ") ?? "",
      engineeringHighlights: data.engineeringHighlights?.join("\n") ?? "",
      ogImage: data.ogImage ?? "",
    });
  }, [data, reset]);

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3";
  const hintClass = "mt-1 text-xs text-slate-500";

  return (
    <>
      <PageHeader title="Settings" description="Manage application settings." />

      <form
        onSubmit={handleSubmit((values) => {
          updateMutation.mutate(values, {
            onSuccess: () => showSuccess("Settings updated"),
            onError: () => showError("Update failed"),
          });
        })}
        className="max-w-3xl space-y-5"
      >
        <input
          {...register("homeTitle")}
          placeholder="Home Title"
          className={inputClass}
        />
        <p className={hintClass}>
          Used for SEO/browser metadata later. Example: Tejvir Chauhan - Full
          Stack Developer.
        </p>

        <textarea
          {...register("homeDescription")}
          placeholder="Home Description"
          className={`${inputClass} h-32`}
        />
        <p className={hintClass}>Short summary for search/social previews.</p>

        <input
          {...register("keywords")}
          placeholder="Keywords, comma separated"
          className={inputClass}
        />
        <p className={hintClass}>
          Example: React, Node.js, MongoDB, Full Stack Developer.
        </p>

        <textarea
          {...register("engineeringHighlights")}
          placeholder="Engineering highlights, one per line"
          className={`${inputClass} h-40`}
        />
        <p className={hintClass}>
          One highlight per line. These render on the public homepage.
        </p>

        <FileUpload
          accept="image/*"
          preview={ogImage}
          onSelect={async (file) => {
            // const result = await uploadMutation.mutateAsync(file);

            const result = await uploadMutation.mutateAsync({
              file,
              folder: "settings",
            });

            setValue("ogImage", result.url, { shouldDirty: true });
            showSuccess("Image uploaded");
          }}
        />

        <input type="hidden" {...register("ogImage")} />

        <button
          disabled={updateMutation.isPending || uploadMutation.isPending}
          type="submit"
          className="rounded-xl bg-sky-500 px-5 py-3 font-medium disabled:opacity-60"
        >
          {updateMutation.isPending ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </>
  );
}
