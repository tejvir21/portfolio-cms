import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { skillSchema, type SkillFormValues } from "../validation/skill.schema";

interface Props {
  defaultValues?: Partial<SkillFormValues>;
  loading?: boolean;
  onSubmit: (values: SkillFormValues) => void;
  data?: SkillFormValues[];
}

export default function SkillForm({
  defaultValues,
  loading,
  onSubmit,
  data = [],
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      category: "",
      proficiency: 80,
      displayOrder: 0,
      skillSequence: 0,
      ...defaultValues,
    },
  });

  const category = watch("category");

  /**
   * Existing categories
   */
  const categories = [
    ...new Set(data.map((skill) => skill.category.trim()).filter(Boolean)),
  ].sort();

  /**
   * Automatically calculate display order & sequence
   */
  useEffect(() => {
    if (!category || defaultValues) return;

    const skills = data.filter(
      (skill) =>
        skill.category.trim().toLowerCase() === category.trim().toLowerCase(),
    );

    if (skills.length > 0) {
      setValue("displayOrder", skills[0].displayOrder);
      setValue("skillSequence", skills.length + 1);
    } else {
      const existingOrders = [...new Set(data.map((s) => s.displayOrder))];

      const nextDisplayOrder = existingOrders.length
        ? Math.max(...existingOrders) + 1
        : 1;

      setValue("displayOrder", nextDisplayOrder);
      setValue("skillSequence", 1);
    }
  }, [category, data, defaultValues, setValue]);

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3 outline-none transition focus:border-cyan-400";

  const hintClass = "mt-1 text-xs leading-5 text-slate-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Skill Name */}
      <div>
        <input
          {...register("name")}
          placeholder="Skill Name"
          className={inputClass}
        />

        <p className={hintClass}>
          Example: React.js, Node.js, MongoDB, REST APIs.
        </p>

        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <input
          list="skill-categories"
          {...register("category")}
          placeholder="Select or type a new category"
          className={inputClass}
        />

        <datalist id="skill-categories">
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>

        <p className={hintClass}>
          Select an existing category or type a new one.
        </p>

        {errors.category && (
          <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
        )}
      </div>

      {/* Proficiency */}
      <div>
        <input
          type="number"
          min={1}
          max={100}
          {...register("proficiency", {
            valueAsNumber: true,
          })}
          placeholder="Proficiency"
          className={inputClass}
        />

        <p className={hintClass}>
          Recommended range: 70–95%. Keep it realistic.
        </p>

        {errors.proficiency && (
          <p className="mt-1 text-sm text-red-400">
            {errors.proficiency.message}
          </p>
        )}
      </div>

      {/* Auto values */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <input
            // readOnly
            {...register("displayOrder", {
              valueAsNumber: true,
            })}
            className={`${inputClass} bg-slate-800`}
          />

          <p className={hintClass}>Automatically assigned based on category.</p>

          {errors.displayOrder && (
            <p className="mt-1 text-sm text-red-400">
              {errors.displayOrder.message}
            </p>
          )}
        </div>

        <div>
          <input
            // readOnly
            {...register("skillSequence", {
              valueAsNumber: true,
            })}
            className={`${inputClass} bg-slate-800`}
          />

          <p className={hintClass}>
            Automatically placed at the end of the selected category.
          </p>

          {errors.skillSequence && (
            <p className="mt-1 text-sm text-red-400">
              {errors.skillSequence.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-sky-500 px-5 py-3 font-medium transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Skill"}
      </button>
    </form>
  );
}

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { skillSchema, type SkillFormValues } from "../validation/skill.schema";

// interface Props {
//   defaultValues?: Partial<SkillFormValues>;
//   loading?: boolean;
//   onSubmit: (values: SkillFormValues) => void;
//   data?: SkillFormValues[];
// }

// export default function SkillForm({ defaultValues, loading, onSubmit }: Props) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SkillFormValues>({
//     resolver: zodResolver(skillSchema),
//     defaultValues: {
//       name: "",
//       category: "",
//       proficiency: 80,
//       displayOrder: 0,
//       skillSequence: 0,
//       ...defaultValues,
//     },
//   });

//   const inputClass =
//     "w-full rounded-xl border border-slate-700 bg-slate-900 p-3";
//   const hintClass = "mt-1 text-xs text-slate-500";

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <input
//           {...register("name")}
//           placeholder="Skill Name"
//           className={inputClass}
//         />
//         <p className={hintClass}>
//           Example: React, Node.js, MongoDB, REST APIs.
//         </p>
//         {errors.name?.message && (
//           <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
//         )}
//       </div>

//       <div>
//         <input
//           {...register("category", {})}
//           placeholder="Category"
//           className={inputClass}
//         />
//         <p className={hintClass}>
//           Group similar skills: Frontend, Backend, Database, Tools.
//         </p>
//         {errors.category?.message && (
//           <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
//         )}
//       </div>

//       <div>
//         <input
//           type="number"
//           {...register("proficiency", { valueAsNumber: true })}
//           placeholder="Proficiency"
//           className={inputClass}
//         />
//         <p className={hintClass}>
//           Use a realistic percentage. Avoid marking everything as 100%.
//         </p>
//         {errors.proficiency?.message && (
//           <p className="mt-1 text-sm text-red-400">
//             {errors.proficiency.message}
//           </p>
//         )}
//       </div>

//       <div className="flex gap-5">
//         <div>
//           <input
//             type="number"
//             {...register("displayOrder", {
//               valueAsNumber: true,
//             })}
//             placeholder="Display Order"
//             className={inputClass}
//           />
//           <p className={hintClass}>
//             Use ordering to place your strongest skills category first.
//           </p>
//           {errors.displayOrder?.message && (
//             <p className="mt-1 text-sm text-red-400">
//               {errors.displayOrder.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <input
//             type="number"
//             {...register("skillSequence", { valueAsNumber: true })}
//             placeholder="Skill Sequence"
//             className={inputClass}
//           />
//           <p className={hintClass}>
//             Use ordering to place your strongest skills first.
//           </p>
//           {errors.skillSequence?.message && (
//             <p className="mt-1 text-sm text-red-400">
//               {errors.skillSequence.message}
//             </p>
//           )}
//         </div>
//       </div>

//       <button
//         disabled={loading}
//         type="submit"
//         className="rounded-xl bg-sky-500 px-5 py-3 font-medium disabled:opacity-60"
//       >
//         {loading ? "Saving..." : "Save Skill"}
//       </button>
//     </form>
//   );
// }
