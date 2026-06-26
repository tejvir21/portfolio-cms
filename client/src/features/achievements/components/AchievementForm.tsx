import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FileUpload from "../../../components/admin/FileUpload";
import { useUpload } from "../../upload/hooks/useUpload";
import {
  achievementSchema,
  type AchievementFormValues,
} from "../validation/achievement.schema";

interface Props {
  defaultValues?: Partial<AchievementFormValues>;
  loading?: boolean;
  onSubmit: (values: AchievementFormValues) => void;
  totalAchievements?: number;
}

const toDateInputValue = (value?: string) => value?.slice(0, 10) ?? "";

export default function AchievementForm({
  defaultValues,
  loading,
  onSubmit,
  totalAchievements = 0,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      organization: defaultValues?.organization ?? "",
      description: defaultValues?.description ?? "",
      date: toDateInputValue(defaultValues?.date),
      credentialUrl: defaultValues?.credentialUrl ?? "",
      imageUrl: defaultValues?.imageUrl ?? "",
      displayOrder: defaultValues?.displayOrder ?? totalAchievements,
    },
  });

  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl ?? "");
  const uploadMutation = useUpload();

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3";
  const hintClass = "mt-1 text-xs text-slate-500";

  const handleUpload = async (file: File) => {
    // const result = await uploadMutation.mutateAsync(file);

    const result = await uploadMutation.mutateAsync({
      file,
      folder: "achievements",
    });

    setImageUrl(result.url);
    setValue("imageUrl", result.url, { shouldDirty: true });
  };

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit({ ...values, imageUrl }))}
      className="space-y-4"
    >
      <input
        {...register("title")}
        placeholder="Title"
        className={inputClass}
      />
      <p className={hintClass}>
        Example: Hackathon Finalist, Coding Contest Winner.
      </p>
      {errors.title?.message && (
        <p className="text-sm text-red-400">{errors.title.message}</p>
      )}

      <input
        {...register("organization")}
        placeholder="Organization"
        className={inputClass}
      />
      <p className={hintClass}>
        Organization, platform, college, or company behind it.
      </p>
      {errors.organization?.message && (
        <p className="text-sm text-red-400">{errors.organization.message}</p>
      )}

      <textarea
        {...register("description")}
        placeholder="Description"
        className={`${inputClass} h-28`}
      />
      <p className={hintClass}>Mention what you achieved and why it matters.</p>
      {errors.description?.message && (
        <p className="text-sm text-red-400">{errors.description.message}</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <input type="date" {...register("date")} className={inputClass} />

        <input
          type="number"
          {...register("displayOrder", { valueAsNumber: true })}
          placeholder="Display Order"
          className={inputClass}
        />
      </div>
      <p className={hintClass}>
        Use display order to prioritize your strongest achievements.
      </p>

      <input
        {...register("credentialUrl")}
        placeholder="Credential URL"
        className={inputClass}
      />
      <p className={hintClass}>
        Optional proof link, certificate URL, or announcement URL.
      </p>

      <FileUpload accept="image/*" preview={imageUrl} onSelect={handleUpload} />
      <input type="hidden" {...register("imageUrl")} />

      <button
        disabled={loading || uploadMutation.isPending}
        type="submit"
        className="rounded-xl bg-sky-500 px-5 py-3 font-medium disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Achievement"}
      </button>
    </form>
  );
}
