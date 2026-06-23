import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FileUpload from "../../../components/admin/FileUpload";
import { useUpload } from "../../upload/hooks/useUpload";
import {
  certificateSchema,
  type CertificateFormValues,
} from "../validation/certificate.schema";

interface Props {
  defaultValues?: Partial<CertificateFormValues>;
  loading?: boolean;
  onSubmit: (values: CertificateFormValues) => void;
}

const toDateInputValue = (value?: string) => value?.slice(0, 10) ?? "";

export default function CertificateForm({
  defaultValues,
  loading,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      issuer: defaultValues?.issuer ?? "",
      issueDate: toDateInputValue(defaultValues?.issueDate),
      credentialId: defaultValues?.credentialId ?? "",
      credentialUrl: defaultValues?.credentialUrl ?? "",
      imageUrl: defaultValues?.imageUrl ?? "",
      featured: defaultValues?.featured ?? false,
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
      folder: "certificates",
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
      <p className={hintClass}>Use the exact certificate/course title.</p>
      {errors.title?.message && (
        <p className="text-sm text-red-400">{errors.title.message}</p>
      )}

      <input
        {...register("issuer")}
        placeholder="Issuer"
        className={inputClass}
      />
      <p className={hintClass}>
        Example: Kaggle, Accenture, Deloitte, Coursera.
      </p>
      {errors.issuer?.message && (
        <p className="text-sm text-red-400">{errors.issuer.message}</p>
      )}

      <input type="date" {...register("issueDate")} className={inputClass} />
      <p className={hintClass}>Use the certificate issue date.</p>
      {errors.issueDate?.message && (
        <p className="text-sm text-red-400">{errors.issueDate.message}</p>
      )}

      <input
        {...register("credentialId")}
        placeholder="Credential ID"
        className={inputClass}
      />
      <p className={hintClass}>Optional, if the certificate provides an ID.</p>

      <input
        {...register("credentialUrl")}
        placeholder="Credential URL"
        className={inputClass}
      />
      <p className={hintClass}>Optional public verification link.</p>

      <FileUpload accept="image/*" preview={imageUrl} onSelect={handleUpload} />
      <input type="hidden" {...register("imageUrl")} />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register("featured")}
          className="h-4 w-4 rounded border-slate-700 bg-slate-900"
        />
        Featured Certificate
      </label>

      <button
        disabled={loading || uploadMutation.isPending}
        type="submit"
        className="rounded-xl bg-sky-500 px-5 py-3 font-medium disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Certificate"}
      </button>
    </form>
  );
}
