import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FileUpload from "../../../components/admin/FileUpload";
import { useUpload } from "../../upload/hooks/useUpload";
import {
  experienceSchema,
  type ExperienceFormValues,
} from "../validation/experience.schema";

type ExperienceFormDefaults = Omit<
  Partial<ExperienceFormValues>,
  "technologies"
> & {
  technologies?: string | string[];
};

interface Props {
  defaultValues?: ExperienceFormDefaults;
  loading?: boolean;
  onSubmit: (values: ExperienceFormValues) => void;
  totalExperiences?: number;
}

const toDateInputValue = (value?: string) => {
  if (!value) return "";

  return value.slice(0, 10);
};

export default function ExperienceForm({
  defaultValues,
  loading,
  onSubmit,
  totalExperiences = 0,
}: Props) {
  const normalizedDefaultValues = useMemo(
    () => ({
      company: defaultValues?.company ?? "",
      position: defaultValues?.position ?? "",
      employmentType: defaultValues?.employmentType ?? "",
      startDate: toDateInputValue(defaultValues?.startDate),
      endDate: toDateInputValue(defaultValues?.endDate),
      currentlyWorking: defaultValues?.currentlyWorking ?? false,
      location: defaultValues?.location ?? "",
      description: defaultValues?.description ?? "",
      technologies: Array.isArray(defaultValues?.technologies)
        ? defaultValues.technologies.join(", ")
        : (defaultValues?.technologies ?? ""),
      companyLogo: defaultValues?.companyLogo ?? "",
      displayOrder: defaultValues?.displayOrder ?? totalExperiences,
    }),
    [defaultValues],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: normalizedDefaultValues,
  });

  const [companyLogo, setCompanyLogo] = useState(
    normalizedDefaultValues.companyLogo || "",
  );

  const uploadMutation = useUpload();

  const currentlyWorking = watch("currentlyWorking");

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3";
  const textareaClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3";
  const errorClass = "mt-1 text-sm text-red-400";
  const hintClass = "mt-1 text-xs text-slate-500";

  const fieldError = (name: keyof ExperienceFormValues) =>
    errors[name]?.message ? (
      <p className={errorClass}>{errors[name]?.message}</p>
    ) : null;

  const handleLogoUpload = async (file: File) => {
    // const result = await uploadMutation.mutateAsync(file);

    const result = await uploadMutation.mutateAsync({
      file,
      folder: "experiences",
    });

    setCompanyLogo(result.url);

    setValue("companyLogo", result.url, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit((values) =>
        onSubmit({
          ...values,
          companyLogo,
          endDate: values.currentlyWorking ? "" : values.endDate,
        }),
      )}
      className="space-y-5"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <input
            {...register("company")}
            placeholder="Company"
            className={inputClass}
          />
          <p className={hintClass}>Company or organization name.</p>
          {fieldError("company")}
        </div>

        <div>
          <input
            {...register("position")}
            placeholder="Position"
            className={inputClass}
          />
          <p className={hintClass}>
            Example: Frontend Developer, Full Stack Trainer.
          </p>
          {fieldError("position")}
        </div>

        <div>
          <input
            {...register("employmentType")}
            placeholder="Employment Type"
            className={inputClass}
          />
          <p className={hintClass}>
            Example: Full-time, Internship, Contract, Training.
          </p>
          {fieldError("employmentType")}
        </div>

        <div>
          <input
            type="number"
            {...register("displayOrder", { valueAsNumber: true })}
            placeholder="Display Order"
            className={inputClass}
          />
          <p className={hintClass}>
            Lower numbers can be used to prioritize ordering later.
          </p>
          {fieldError("displayOrder")}
        </div>

        <div>
          <input
            type="date"
            {...register("startDate")}
            className={inputClass}
          />
          {fieldError("startDate")}
        </div>

        <div>
          <input
            type="date"
            {...register("endDate")}
            disabled={currentlyWorking}
            className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
          />
          {fieldError("endDate")}
        </div>

        <div className="md:col-span-2">
          <input
            {...register("location")}
            placeholder="Location"
            className={inputClass}
          />
          <p className={hintClass}>City, remote, or hybrid location.</p>
          {fieldError("location")}
        </div>

        <div className="md:col-span-2">
          <input
            {...register("technologies")}
            placeholder="Technologies, comma separated"
            className={inputClass}
          />
          <p className={hintClass}>Comma separated tools used in this role.</p>
          {fieldError("technologies")}
        </div>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register("currentlyWorking")}
          className="h-4 w-4 rounded border-slate-700 bg-slate-900"
        />
        Currently working here
      </label>

      <div>
        <textarea
          {...register("description")}
          placeholder="Description"
          className={`${textareaClass} h-32`}
        />
        <p className={hintClass}>
          Use action verbs. Mention ownership, impact, stack, and measurable
          outcomes.
        </p>
        {fieldError("description")}
      </div>

      <FileUpload
        accept="image/*"
        preview={companyLogo}
        onSelect={handleLogoUpload}
      />

      <input type="hidden" {...register("companyLogo")} />

      <button
        disabled={loading || uploadMutation.isPending}
        type="submit"
        className="rounded-xl bg-sky-500 px-5 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Experience"}
      </button>
    </form>
  );
}
