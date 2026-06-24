import { useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ExternalLink, ImagePlus, Info } from "lucide-react";

import FileUpload from "../../../components/admin/FileUpload";
import { useUpload } from "../../upload/hooks/useUpload";

export interface CertificateCompanyFormValues {
  name: string;
  logoUrl: string;
  logoKey?: string;
  active: boolean;
  sortOrder: number;
}

interface Props {
  defaultValues?: Partial<CertificateCompanyFormValues>;
  onSubmit: (values: CertificateCompanyFormValues) => void;
  loading?: boolean;
}

export default function CertificateCompanyForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const normalizedDefaultValues = useMemo<CertificateCompanyFormValues>(
    () => ({
      name: defaultValues?.name ?? "",
      logoUrl: defaultValues?.logoUrl ?? "",
      logoKey: defaultValues?.logoKey ?? "",
      active: defaultValues?.active ?? true,
      sortOrder: defaultValues?.sortOrder ?? 0,
    }),
    [defaultValues],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CertificateCompanyFormValues>({
    defaultValues: normalizedDefaultValues,
  });

  const uploadMutation = useUpload();

  const [logoUrl, setLogoUrl] = useState(defaultValues?.logoUrl ?? "");
  const [logoKey, setLogoKey] = useState(defaultValues?.logoKey ?? "");

  const companyName = watch("name");

  const handleLogoUpload = async (file: File) => {
    const result = await uploadMutation.mutateAsync({
      file,
      folder: "certificate-companies",
    });

    setLogoUrl(result.url);
    setLogoKey(result.key || "");

    setValue("logoUrl", result.url, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("logoKey", result.key || "", {
      shouldDirty: true,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3 outline-none transition focus:border-cyan-400";
  const errorClass = "mt-1 text-sm text-red-400";
  const hintClass = "mt-1 text-xs leading-5 text-slate-500";
  const labelClass = "mb-2 block text-sm font-medium text-slate-200";

  const submitHandler: SubmitHandler<CertificateCompanyFormValues> = (
    values,
  ) => {
    onSubmit({
      ...values,
      logoUrl,
      logoKey,
      sortOrder: Number(values.sortOrder) || 0,
      active: Boolean(values.active),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* Helper / guidance */}
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <div className="flex items-start gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-cyan-300" />
          <div className="text-sm text-slate-300">
            <p className="font-medium text-cyan-300">
              Company logo upload guidelines
            </p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-300">
              <li>
                Use a{" "}
                <span className="font-medium text-white">
                  transparent PNG or WebP
                </span>{" "}
                for the cleanest badge appearance.
              </li>
              <li>
                Keep the logo{" "}
                <span className="font-medium text-white">
                  square-ish and centered
                </span>{" "}
                so it looks good in certificate cards.
              </li>
              <li>
                Uploading a new logo while editing will{" "}
                <span className="font-medium text-white">
                  replace the previous company logo
                </span>
                .
              </li>
              <li>
                You only need{" "}
                <span className="font-medium text-white">
                  one logo per company
                </span>
                ; all related certificates will reuse it.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Company name */}
      <div>
        <label className={labelClass}>Company Name</label>
        <input
          {...register("name", {
            required: "Company name is required",
          })}
          placeholder="e.g. Deloitte"
          className={inputClass}
        />

        {errors.name?.message && (
          <p className={errorClass}>{errors.name.message}</p>
        )}

        <p className={hintClass}>
          This name appears in the certificate form dropdown and on public
          certificate cards.
        </p>
      </div>

      {/* Logo upload */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
        <div className="flex items-center gap-2">
          <ImagePlus size={18} className="text-cyan-300" />
          <h3 className="font-medium text-white">Company Logo</h3>
        </div>

        <p className={hintClass}>
          Recommended: transparent logo with a dark-friendly appearance. This
          logo is used as the certificate company badge.
        </p>

        <div className="mt-4">
          <FileUpload
            accept="image/*"
            preview={logoUrl}
            onSelect={handleLogoUpload}
          />
        </div>

        {uploadMutation.isPending && (
          <p className="mt-3 text-sm text-cyan-300">
            Uploading company logo...
          </p>
        )}

        {!logoUrl && !uploadMutation.isPending && (
          <p className="mt-3 text-sm text-amber-400">
            Logo is strongly recommended because certificate cards use it as the
            company badge.
          </p>
        )}

        {logoUrl && !uploadMutation.isPending && (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-sm font-medium text-white">
              Current logo preview
            </p>

            <div className="mt-3 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                <img
                  src={logoUrl}
                  alt={companyName || "Company logo"}
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-300">
                  {companyName || "Unnamed company"}
                </p>

                <a
                  href={logoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
                >
                  <ExternalLink size={14} />
                  Open uploaded logo
                </a>
              </div>
            </div>

            {defaultValues?.logoUrl && logoUrl !== defaultValues.logoUrl && (
              <p className="mt-3 text-xs text-amber-400">
                This new upload will replace the previous logo for this company
                after saving.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sort order + active */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Sort Order</label>
          <input
            type="number"
            {...register("sortOrder", {
              valueAsNumber: true,
            })}
            placeholder="0"
            className={inputClass}
          />
          <p className={hintClass}>
            Lower values appear first in dropdowns and company lists.
          </p>
        </div>

        <label className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
          <input type="checkbox" {...register("active")} />
          <div>
            <p className="font-medium text-white">Active company</p>
            <p className="text-xs text-slate-500">
              Inactive companies won’t appear in the public certificate company
              list.
            </p>
          </div>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || uploadMutation.isPending}
        className="rounded-xl bg-sky-500 px-5 py-3 font-medium text-white transition hover:bg-sky-400 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Company"}
      </button>
    </form>
  );
}
