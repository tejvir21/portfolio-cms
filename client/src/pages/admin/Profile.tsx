import { useEffect, useState } from "react";

import FileUpload from "../../components/admin/FileUpload";
import PageHeader from "../../components/admin/PageHeader";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { useUpdateProfile } from "../../features/profile/hooks/useUpdateProfile";
import { useUpload } from "../../features/upload/hooks/useUpload";
import { showError, showSuccess } from "../../utils/toast";

const inputClass = "rounded-xl border border-slate-700 bg-slate-900 p-3";
const hintClass = "mt-1 text-xs text-slate-500";

export default function Profile() {
  const { data } = useProfile();
  const updateMutation = useUpdateProfile();
  const uploadMutation = useUpload();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    leetcode: "",
    twitter: "",
    portfolio: "",
    bio: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    if (!data) return;

    setFormData({
      name: data.name || "",
      role: data.role || "",
      email: data.email || "",
      phone: data.phone || "",
      location: data.location || "",
      github: data.github || "",
      linkedin: data.linkedin || "",
      leetcode: data.leetcode || "",
      twitter: data.twitter || "",
      portfolio: data.portfolio || "",
      bio: data.bio || "",
    });

    setImageUrl(data.imageUrl || data.profileImage || "");
    setResumeUrl(data.resumeUrl || "");
  }, [data]);

  const updateField = (key: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate(
      {
        ...formData,
        imageUrl,
        profileImage: imageUrl,
        resumeUrl,
      },
      {
        onSuccess: () => showSuccess("Profile updated successfully"),
        onError: () => showError("Failed to update profile"),
      },
    );
  };

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Profile"
        description="Controls your homepage hero, footer links, contact links, and resume."
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-2 font-semibold">Profile Image</h2>
            <p className="mb-4 text-sm text-slate-500">
              Use a clean portrait with transparent or dark-friendly background.
              This appears in the homepage hero.
            </p>

            <FileUpload
              accept="image/*"
              preview={imageUrl}
              onSelect={async (file) => {
                // const result = await uploadMutation.mutateAsync(file);

                const result = await uploadMutation.mutateAsync({
                  file,
                  folder: "profile",
                });

                setImageUrl(result.url);
                showSuccess("Image uploaded successfully");
              }}
            />
          </div>

          <div>
            <h2 className="mb-2 font-semibold">Resume</h2>
            <p className="mb-4 text-sm text-slate-500">
              Upload your latest PDF resume. The public hero and footer will
              show the resume link only when this exists.
            </p>

            <FileUpload
              accept=".pdf"
              onSelect={async (file) => {
                // const result = await uploadMutation.mutateAsync(file);

                const result = await uploadMutation.mutateAsync({
                  file,
                  folder: "resume",
                });

                setResumeUrl(result.url);
                showSuccess("Resume uploaded successfully");
              }}
            />

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block text-sky-400"
              >
                View Resume
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Example: Tejvir Chauhan</p>
          </div>

          <div>
            <input
              placeholder="Role"
              value={formData.role}
              onChange={(e) => updateField("role", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Example: Full Stack Developer</p>
          </div>

          <div>
            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Used for contact links.</p>
          </div>

          <div>
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Optional. Keep blank if not public.</p>
          </div>

          <div>
            <input
              placeholder="Location"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Example: Greater Noida, India</p>
          </div>

          <div>
            <input
              placeholder="Portfolio URL"
              value={formData.portfolio}
              onChange={(e) => updateField("portfolio", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Optional external website link.</p>
          </div>

          <div>
            <input
              placeholder="GitHub URL"
              value={formData.github}
              onChange={(e) => updateField("github", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Full profile URL, not just username.</p>
          </div>

          <div>
            <input
              placeholder="LinkedIn URL"
              value={formData.linkedin}
              onChange={(e) => updateField("linkedin", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Use your public LinkedIn profile link.</p>
          </div>

          <div>
            <input
              placeholder="LeetCode URL"
              value={formData.leetcode}
              onChange={(e) => updateField("leetcode", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Optional coding profile link.</p>
          </div>

          <div>
            <input
              placeholder="Twitter / X URL"
              value={formData.twitter}
              onChange={(e) => updateField("twitter", e.target.value)}
              className={`${inputClass} w-full`}
            />
            <p className={hintClass}>Optional social link.</p>
          </div>
        </div>

        <div>
          <textarea
            rows={6}
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3"
          />
          <p className={hintClass}>
            Keep this focused: who you are, what you build, strongest stack, and
            what kind of work you want.
          </p>
        </div>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="rounded-xl bg-sky-500 px-6 py-3 disabled:opacity-60"
        >
          {updateMutation.isPending ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
