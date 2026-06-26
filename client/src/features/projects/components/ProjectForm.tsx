import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  projectSchema,
  type ProjectFormValues,
} from "../validation/project.schema";
import { useUpload } from "../../upload/hooks/useUpload";
import FileUpload from "../../../components/admin/FileUpload";
import { deleteFile } from "@/features/upload/api/deleteFile";

interface Props {
  defaultValues?: Partial<ProjectFormValues>;

  onSubmit: (values: ProjectFormValues) => void;

  loading?: boolean;

  totalProjects?: number;
}

export default function ProjectForm({
  defaultValues,
  onSubmit,
  loading,
  totalProjects = 0,
}: Props) {
  // const normalizedDefaultValues = useMemo<ProjectFormValues>(() => {
  //   const values = defaultValues as
  //     | (Partial<ProjectFormValues> & {
  //         technologies?: string | string[];
  //         gallery?: string | string[];
  //       })
  //     | undefined;

  //   return {
  //     featured: false,
  //     status: "in-progress" as const,
  //     ...values,
  //     technologies: Array.isArray(values?.technologies)
  //       ? values.technologies.join(", ")
  //       : (values?.technologies ?? ""),
  //     // gallery: Array.isArray(values?.gallery)
  //     //   ? values.gallery.join(", ")
  //     //   : (values?.gallery ?? ""),
  //     gallery: Array.isArray(values?.gallery)
  // ? values.gallery
  // : [],
  //   };
  // }, [defaultValues]);

  const normalizedDefaultValues = useMemo<ProjectFormValues>(
    () => ({
      title: defaultValues?.title ?? "",

      slug: defaultValues?.slug ?? "",

      category: defaultValues?.category ?? "",

      status: defaultValues?.status ?? "in-progress",

      role: defaultValues?.role ?? "",

      displayOrder: defaultValues?.displayOrder ?? totalProjects,

      shortDescription: defaultValues?.shortDescription ?? "",

      fullDescription: defaultValues?.fullDescription ?? "",

      technologies: Array.isArray(defaultValues?.technologies)
        ? defaultValues.technologies.join(", ")
        : ((defaultValues?.technologies as string) ?? ""),

      githubUrl: defaultValues?.githubUrl ?? "",

      liveUrl: defaultValues?.liveUrl ?? "",

      problemStatement: defaultValues?.problemStatement ?? "",

      architecture: defaultValues?.architecture ?? "",

      challenges: defaultValues?.challenges ?? "",

      learnings: defaultValues?.learnings ?? "",

      featured: defaultValues?.featured ?? false,

      imageUrl: defaultValues?.imageUrl ?? "",

      imageKey: defaultValues?.imageKey ?? "",

      gallery: Array.isArray(defaultValues?.gallery)
        ? defaultValues.gallery
        : [],
    }),
    [defaultValues],
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),

    defaultValues: normalizedDefaultValues,
  });

  // Reset the form when the default values change
  useEffect(() => {
    reset(normalizedDefaultValues);
  }, [normalizedDefaultValues, reset]);

  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl || "");

  const [galleryImages, setGalleryImages] = useState<
    {
      url: string;

      key: string;
    }[]
  >(Array.isArray(defaultValues?.gallery) ? defaultValues.gallery : []);

  const [imageMethod, setImageMethod] = useState<"upload" | "url" | null>(
    defaultValues?.imageUrl ? "url" : null,
  );

  const uploadMutation = useUpload();

  const handleUpload = async (file: File) => {
    setImageMethod("upload");

    const currentKey = getValues("imageKey");

    if (currentKey) {
      await deleteFile(currentKey);
    }

    // const result = await uploadMutation.mutateAsync(file);

    const result = await uploadMutation.mutateAsync({
      file,
      folder: "projects",
    });

    setImageUrl(result.url);
    setValue("imageKey", result.key);

    setValue("imageUrl", result.url, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleGalleryUpload = async (file: File) => {
    const result = await uploadMutation.mutateAsync({
      file,
      folder: "gallery",
    });

    const updatedGallery = [
      ...galleryImages,
      {
        url: result.url,

        key: result.key,
      },
    ];

    setGalleryImages(updatedGallery);

    setValue("gallery", updatedGallery, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3";

  const textAreaClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 p-3";

  const errorClass = "mt-1 text-sm text-red-400";
  const hintClass = "mt-1 text-xs text-slate-500";

  const fieldError = (name: keyof ProjectFormValues) =>
    errors[name]?.message ? (
      <p className={errorClass}>{errors[name]?.message}</p>
    ) : null;

  const submitHandler = (values: ProjectFormValues) => {
    const payload: ProjectFormValues = {
      ...values,

      imageUrl,

      imageKey: values.imageKey,

      gallery: galleryImages,
    };

    onSubmit(payload);
  };

  return (
    <form
      // onSubmit={handleSubmit((values) =>
      //   onSubmit({
      //     ...values,
      //     imageUrl,
      //   }),
      // )}

      onSubmit={handleSubmit(submitHandler)}
      className="space-y-5"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {/* Title */}

        <div>
          <input
            {...register("title")}
            placeholder="Project Title"
            className={inputClass}
          />
          <p className={hintClass}>
            Use the public project name visitors will recognize.
          </p>
          {fieldError("title")}
        </div>

        {/* Slug */}

        <div>
          <input
            {...register("slug")}
            placeholder="Slug"
            className={inputClass}
          />
          <p className={hintClass}>
            Lowercase URL text, for example: portfolio-cms.
          </p>
          {fieldError("slug")}
        </div>

        {/* Category */}

        <div>
          <input
            {...register("category")}
            placeholder="Category"
            className={inputClass}
          />
          <p className={hintClass}>
            Example: Full Stack, Frontend, Backend, AI.
          </p>
          {fieldError("category")}
        </div>

        {/* Status */}

        <div>
          <select {...register("status")} className={inputClass}>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
          {fieldError("status")}
        </div>

        {/* Role */}

        <div className="md:col-span-2">
          <input
            {...register("role")}
            placeholder="Your Role"
            className={inputClass}
          />
          <p className={hintClass}>
            Example: Full Stack Developer, Frontend Lead.
          </p>
          {fieldError("role")}
        </div>

        {/* Display Order */}

        <div className="md:col-span-2">
          <input
            {...register("displayOrder", { valueAsNumber: true })}
            placeholder="Display Order"
            type="number"
            defaultValue={0}
            className={inputClass}
          />
          <p className={hintClass}>Example: 0, 1, 2</p>
          {fieldError("displayOrder")}
        </div>

        {/* Technologies */}

        <div className="md:col-span-2">
          <input
            {...register("technologies")}
            placeholder="Technologies, comma separated"
            className={inputClass}
          />
          <p className={hintClass}>
            Comma separated. Put strongest stack first.
          </p>
          {fieldError("technologies")}
        </div>
      </div>

      {/* Short Description */}

      <div>
        <textarea
          {...register("shortDescription")}
          placeholder="Short Description"
          className={`${textAreaClass} h-24`}
        />
        <p className={hintClass}>
          1-2 lines for cards. Focus on the outcome, not every feature.
        </p>
        {fieldError("shortDescription")}
      </div>

      {/* Full Description */}

      <div>
        <textarea
          {...register("fullDescription")}
          placeholder="Full Description"
          className={`${textAreaClass} h-40`}
        />
        <p className={hintClass}>
          Explain what the app does, who it helps, and what you built.
        </p>
        {fieldError("fullDescription")}
      </div>

      {/* Links */}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <input
            {...register("githubUrl")}
            placeholder="GitHub URL"
            className={inputClass}
          />
          <p className={hintClass}>
            Use a public repository link if available.
          </p>
          {fieldError("githubUrl")}
        </div>

        <div>
          <input
            {...register("liveUrl")}
            placeholder="Live URL"
            className={inputClass}
          />
          <p className={hintClass}>
            Use the deployed/live demo URL if available.
          </p>
          {fieldError("liveUrl")}
        </div>
      </div>

      {/* Image */}

      <div className="space-y-4">
        <h3 className="font-medium">Project Banner Image</h3>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload */}

          <div
            className={`
      rounded-2xl
      border
      p-4
      ${imageMethod === "url" ? "opacity-50" : ""}
      `}
          >
            <p className="mb-3 text-sm text-slate-400">Upload Image</p>

            <FileUpload
              accept="image/*"
              preview={imageUrl}
              onSelect={handleUpload}
            />
          </div>

          {/* URL */}

          <div
            className={`
      rounded-2xl
      border
      p-4
      ${imageMethod === "upload" ? "opacity-50" : ""}
      `}
          >
            <p className="mb-3 text-sm text-slate-400">Paste Image URL</p>

            <input
              value={imageMethod === "url" ? imageUrl : ""}
              onChange={(e) => {
                setImageMethod("url");

                setImageUrl(e.target.value);

                setValue("imageUrl", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });

                setValue("imageKey", "");
              }}
              disabled={imageMethod === "upload"}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>

        <input type="hidden" {...register("imageUrl")} />
        <input type="hidden" {...register("imageKey")} />

        {fieldError("imageUrl")}
      </div>

      <button
        type="button"
        onClick={async () => {
          const currentKey = getValues("imageKey");

          if (currentKey) {
            await deleteFile(currentKey);
          }

          setImageMethod(null);

          setImageUrl("");

          setValue("imageUrl", "");

          setValue("imageKey", "");
        }}
        className="
  text-sm
  text-red-400
  hover:text-red-300
  "
      >
        Clear Image
      </button>

      {/* Gallery */}

      {/* <div>
        <input
          {...register("gallery")}
          placeholder="Gallery image URLs, comma separated"
          className={inputClass}
        />
        <p className={hintClass}>
          Optional extra screenshots. Paste image URLs separated by commas.
        </p>
        {fieldError("gallery")}
      </div> */}

      <div className="space-y-4">
        <h3 className="font-medium">Project Gallery</h3>

        <FileUpload accept="image/*" onSelect={handleGalleryUpload} />

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-slate-700
            "
              >
                <img
                  src={image.url}
                  alt=""
                  className="
              h-32
              w-full
              object-cover
              "
                />

                <button
                  type="button"
                  onClick={async () => {
                    await deleteFile(image.key);

                    const updated = galleryImages.filter((_, i) => i !== index);

                    setGalleryImages(updated);

                    setValue("gallery", updated);
                  }}
                  className="
              absolute
              right-2
              top-2
              rounded-full
              bg-red-500
              px-2
              py-1
              text-xs
              text-white
              "
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* <input type="hidden" {...register("gallery")} /> */}

        {fieldError("gallery")}
      </div>

      {/* Problem Statement */}

      <div>
        <textarea
          {...register("problemStatement")}
          placeholder="Problem Statement"
          className={`${textAreaClass} h-28`}
        />
        <p className={hintClass}>What problem did this project solve?</p>
        {fieldError("problemStatement")}
      </div>

      {/* Architecture */}

      <div>
        <textarea
          {...register("architecture")}
          placeholder="Architecture"
          className={`${textAreaClass} h-28`}
        />
        <p className={hintClass}>
          Mention frontend, backend, database, APIs, auth, hosting, or key
          design choices.
        </p>
        {fieldError("architecture")}
      </div>

      {/* Challenges */}

      <div>
        <textarea
          {...register("challenges")}
          placeholder="Challenges"
          className={`${textAreaClass} h-28`}
        />
        <p className={hintClass}>
          Write the real technical difficulties and tradeoffs.
        </p>
        {fieldError("challenges")}
      </div>

      {/* Learnings */}

      <div>
        <textarea
          {...register("learnings")}
          placeholder="Learnings"
          className={`${textAreaClass} h-28`}
        />
        <p className={hintClass}>
          What did this project prove about your engineering ability?
        </p>
        {fieldError("learnings")}
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register("featured")}
          className="h-4 w-4 rounded border-slate-700 bg-slate-900"
        />
        Featured Project
      </label>

      <button
        disabled={loading}
        type="submit"
        className="rounded-xl bg-sky-500 px-5 py-3 font-medium"
      >
        {loading ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}
