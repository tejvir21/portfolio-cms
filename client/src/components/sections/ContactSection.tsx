import { useState } from "react";

import SocialLinks from "../common/SocialLinks";
import { useCreateContact } from "../../features/contact/hooks/useCreateContact";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { showError, showSuccess } from "../../utils/toast";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactSection() {
  const { data } = useProfile();
  const createMutation = useCreateContact();
  const [formData, setFormData] = useState(initialForm);

  if (!data?.email && !data?.github && !data?.linkedin) return null;

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none transition focus:border-cyan-400";

  const updateField = (key: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-4xl font-bold">Let&apos;s Connect</h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to build useful software.
          </p>

          {data?.location && (
            <p className="mt-4 text-slate-400">{data.location}</p>
          )}

          <div className="mt-8">
            <SocialLinks profile={data} />
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            createMutation.mutate(formData, {
              onSuccess: () => {
                setFormData(initialForm);
                showSuccess("Message sent successfully");
              },
              onError: () => showError("Failed to send message"),
            });
          }}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium">Name</label>
            <input
              required
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Email</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Subject</label>
            <input
              required
              value={formData.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Message</label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={inputClass}
            />
          </div>

          <button
            disabled={createMutation.isPending}
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-cyan-400 to-indigo-500 px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            {createMutation.isPending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
