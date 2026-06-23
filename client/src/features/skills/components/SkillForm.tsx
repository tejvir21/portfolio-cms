import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { skillSchema, type SkillFormValues } from "../validation/skill.schema";

interface Props {
  defaultValues?: Partial<SkillFormValues>;
  loading?: boolean;
  onSubmit: (values: SkillFormValues) => void;
}

export default function SkillForm({ defaultValues, loading, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      category: "",
      proficiency: 80,
      displayOrder: 0,
      ...defaultValues,
    },
  });

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3";
  const hintClass = "mt-1 text-xs text-slate-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("name")} placeholder="Skill Name" className={inputClass} />
        <p className={hintClass}>Example: React, Node.js, MongoDB, REST APIs.</p>
        {errors.name?.message && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("category")}
          placeholder="Category"
          className={inputClass}
        />
        <p className={hintClass}>Group similar skills: Frontend, Backend, Database, Tools.</p>
        {errors.category?.message && (
          <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          {...register("proficiency", { valueAsNumber: true })}
          placeholder="Proficiency"
          className={inputClass}
        />
        <p className={hintClass}>Use a realistic percentage. Avoid marking everything as 100%.</p>
        {errors.proficiency?.message && (
          <p className="mt-1 text-sm text-red-400">
            {errors.proficiency.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="number"
          {...register("displayOrder", { valueAsNumber: true })}
          placeholder="Display Order"
          className={inputClass}
        />
        <p className={hintClass}>Use ordering to place your strongest skills first.</p>
        {errors.displayOrder?.message && (
          <p className="mt-1 text-sm text-red-400">
            {errors.displayOrder.message}
          </p>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className="rounded-xl bg-sky-500 px-5 py-3 font-medium disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Skill"}
      </button>
    </form>
  );
}
