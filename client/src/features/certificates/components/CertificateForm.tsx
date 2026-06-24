import { useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, Info } from "lucide-react";
import { z } from "zod";

import FileUpload from "../../../components/admin/FileUpload";
import { useUpload } from "../../upload/hooks/useUpload";
import {
  certificateSchema,
  type CertificateFormValues,
} from "../validation/certificate.schema";
import { useCertificateCompanies } from "../hooks/useCertificateCompanies";

type CertificateFormInput = z.input<typeof certificateSchema>;

interface Props {
  defaultValues?: Partial<CertificateFormValues>;
  onSubmit: (values: CertificateFormValues) => void;
  loading?: boolean;
}

export default function CertificateForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const normalizedDefaultValues = useMemo<CertificateFormInput>(
    () => ({
      title: defaultValues?.title ?? "",
      issuer: defaultValues?.issuer ?? "",
      company: defaultValues?.company ?? "",
      issueDate: defaultValues?.issueDate ?? "",
      credentialId: defaultValues?.credentialId ?? "",
      credentialUrl: defaultValues?.credentialUrl ?? "",
      imageUrl: defaultValues?.imageUrl ?? "",
      featured: defaultValues?.featured ?? false,
    }),
    [defaultValues],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CertificateFormInput>({
    resolver: zodResolver(certificateSchema),
    defaultValues: normalizedDefaultValues,
  });

  const uploadMutation = useUpload();
  const { data: companies, isLoading: companiesLoading } =
    useCertificateCompanies();

  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl || "");

  const selectedCompany = watch("company");
  const selectedIssuer = watch("issuer");
  const selectedTitle = watch("title");

  const handleUpload = async (file: File) => {
    const result = await uploadMutation.mutateAsync({
      file,
      folder: "certificates",
    });

    setImageUrl(result.url);

    setValue("imageUrl", result.url, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3 outline-none transition focus:border-cyan-400";
  const errorClass = "mt-1 text-sm text-red-400";
  // const hintClass = "mt-1 text-xs leading-5 text-slate-500";
  const labelClass = "mb-2 block text-sm font-medium text-slate-200";

  const submitHandler: SubmitHandler<CertificateFormInput> = (values) => {
    onSubmit({
      title: values.title.trim(),
      issuer: values.issuer.trim(),
      company: values.company.trim(),
      issueDate: values.issueDate,
      credentialId: values.credentialId?.trim() || "",
      credentialUrl: values.credentialUrl?.trim() || "",
      imageUrl: imageUrl || values.imageUrl || "",
      featured: Boolean(values.featured),
    });
  };

  // const showCompanyHint =
  //   !selectedCompany && !!companies?.length && !companiesLoading;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <div className="flex items-start gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-cyan-300" />
          <div className="text-sm text-slate-300">
            <p className="font-medium text-cyan-300">
              How to fill certificates correctly
            </p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-300">
              <li>
                <span className="font-medium text-white">Title:</span> Use the
                full certificate/program name. Example:{" "}
                <span className="text-slate-200">
                  Deloitte Australia Technology Job Simulation
                </span>
              </li>
              <li>
                <span className="font-medium text-white">Issuer:</span> Use the
                issuing platform/organization. Example:{" "}
                <span className="text-slate-200">Forage</span>
              </li>
              <li>
                <span className="font-medium text-white">Company:</span> Use the
                brand shown on the public card. Example:{" "}
                <span className="text-slate-200">Deloitte</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Certificate Title</label>
        <input
          {...register("title")}
          placeholder="e.g. Deloitte Australia Technology Job Simulation"
          className={inputClass}
        />
        {errors.title?.message && (
          <p className={errorClass}>{errors.title.message}</p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass}>Issuer</label>
          <input
            {...register("issuer")}
            placeholder="e.g. Forage"
            className={inputClass}
          />
          {errors.issuer?.message && (
            <p className={errorClass}>{errors.issuer.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Company / Brand</label>
          <select {...register("company")} className={inputClass}>
            <option value="">
              {companiesLoading ? "Loading companies..." : "Select company"}
            </option>

            {companies?.map((company) => (
              <option key={company._id} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>

          {errors.company?.message && (
            <p className={errorClass}>{errors.company.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass}>Issue Date</label>
          <input
            {...register("issueDate")}
            type="date"
            className={inputClass}
          />
          {errors.issueDate?.message && (
            <p className={errorClass}>{errors.issueDate.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Credential ID</label>
          <input
            {...register("credentialId")}
            placeholder="Optional credential / certificate ID"
            className={inputClass}
          />
          {errors.credentialId?.message && (
            <p className={errorClass}>{errors.credentialId.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Credential URL</label>
        <input
          {...register("credentialUrl")}
          placeholder="https://..."
          className={inputClass}
        />
        {errors.credentialUrl?.message && (
          <p className={errorClass}>{errors.credentialUrl.message}</p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
        <label className={labelClass}>Certificate Image</label>

        <div className="mt-4">
          <FileUpload
            accept="image/*"
            preview={imageUrl}
            onSelect={handleUpload}
          />
        </div>

        {uploadMutation.isPending && (
          <p className="mt-3 text-sm text-cyan-300">
            Uploading certificate image...
          </p>
        )}

        {imageUrl && !uploadMutation.isPending && (
          <a
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
          >
            <ExternalLink size={14} />
            View uploaded image
          </a>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="text-sm font-semibold text-white">Quick fill preview</h3>
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          <p>
            <span className="font-medium text-white">Title:</span>{" "}
            {selectedTitle || "—"}
          </p>
          <p>
            <span className="font-medium text-white">Issuer:</span>{" "}
            {selectedIssuer || "—"}
          </p>
          <p>
            <span className="font-medium text-white">Company Badge:</span>{" "}
            {selectedCompany || "—"}
          </p>
        </div>
      </div>

      <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
        <div>
          <p className="font-medium text-white">Featured certificate</p>
          <p className="text-xs text-slate-500">
            Featured certificates are shown first in the public section.
          </p>
        </div>

        <input type="checkbox" {...register("featured")} className="h-4 w-4" />
      </label>

      <button
        type="submit"
        disabled={loading || uploadMutation.isPending}
        className="rounded-xl bg-sky-500 px-5 py-3 font-medium text-white transition hover:bg-sky-400 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Certificate"}
      </button>
    </form>
  );
}

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import FileUpload from "../../../components/admin/FileUpload";
// import { useUpload } from "../../upload/hooks/useUpload";
// import {
//   certificateSchema,
//   type CertificateFormValues,
// } from "../validation/certificate.schema";

// interface Props {
//   defaultValues?: Partial<CertificateFormValues>;
//   loading?: boolean;
//   onSubmit: (values: CertificateFormValues) => void;
// }

// const toDateInputValue = (value?: string) => value?.slice(0, 10) ?? "";

// export default function CertificateForm({
//   defaultValues,
//   loading,
//   onSubmit,
// }: Props) {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<CertificateFormValues>({
//     resolver: zodResolver(certificateSchema),
//     defaultValues: {
//       title: defaultValues?.title ?? "",
//       issuer: defaultValues?.issuer ?? "",
//       issueDate: toDateInputValue(defaultValues?.issueDate),
//       credentialId: defaultValues?.credentialId ?? "",
//       credentialUrl: defaultValues?.credentialUrl ?? "",
//       imageUrl: defaultValues?.imageUrl ?? "",
//       featured: defaultValues?.featured ?? false,
//     },
//   });

//   const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl ?? "");
//   const uploadMutation = useUpload();

//   const inputClass =
//     "w-full rounded-xl border border-slate-700 bg-slate-900 p-3";
//   const hintClass = "mt-1 text-xs text-slate-500";

//   const handleUpload = async (file: File) => {
//     // const result = await uploadMutation.mutateAsync(file);

//     const result = await uploadMutation.mutateAsync({
//       file,
//       folder: "certificates",
//     });

//     setImageUrl(result.url);
//     setValue("imageUrl", result.url, { shouldDirty: true });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit((values) => onSubmit({ ...values, imageUrl }))}
//       className="space-y-4"
//     >
//       <input
//         {...register("title")}
//         placeholder="Title"
//         className={inputClass}
//       />
//       <p className={hintClass}>Use the exact certificate/course title.</p>
//       {errors.title?.message && (
//         <p className="text-sm text-red-400">{errors.title.message}</p>
//       )}

//       <input
//         {...register("issuer")}
//         placeholder="Issuer"
//         className={inputClass}
//       />
//       <p className={hintClass}>
//         Example: Kaggle, Accenture, Deloitte, Coursera.
//       </p>
//       {errors.issuer?.message && (
//         <p className="text-sm text-red-400">{errors.issuer.message}</p>
//       )}

//       <input type="date" {...register("issueDate")} className={inputClass} />
//       <p className={hintClass}>Use the certificate issue date.</p>
//       {errors.issueDate?.message && (
//         <p className="text-sm text-red-400">{errors.issueDate.message}</p>
//       )}

//       <input
//         {...register("credentialId")}
//         placeholder="Credential ID"
//         className={inputClass}
//       />
//       <p className={hintClass}>Optional, if the certificate provides an ID.</p>

//       <input
//         {...register("credentialUrl")}
//         placeholder="Credential URL"
//         className={inputClass}
//       />
//       <p className={hintClass}>Optional public verification link.</p>

//       <FileUpload accept="image/*" preview={imageUrl} onSelect={handleUpload} />
//       <input type="hidden" {...register("imageUrl")} />

//       <label className="flex items-center gap-3">
//         <input
//           type="checkbox"
//           {...register("featured")}
//           className="h-4 w-4 rounded border-slate-700 bg-slate-900"
//         />
//         Featured Certificate
//       </label>

//       <button
//         disabled={loading || uploadMutation.isPending}
//         type="submit"
//         className="rounded-xl bg-sky-500 px-5 py-3 font-medium disabled:opacity-60"
//       >
//         {loading ? "Saving..." : "Save Certificate"}
//       </button>
//     </form>
//   );
// }
