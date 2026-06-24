import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

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

function ContactInfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-1 text-slate-100">{value}</p>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const { data } = useProfile();
  const createMutation = useCreateContact();
  const [formData, setFormData] = useState(initialForm);

  if (!data?.email && !data?.github && !data?.linkedin) return null;

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400";

  const updateField = (key: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2 className="text-4xl font-bold">Let&apos;s Connect</h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            I&apos;m always open to discussing new projects, product ideas,
            freelance work, or software engineering opportunities.
          </p>

          <div className="mt-8 space-y-4">
            {data?.email && (
              <ContactInfoCard
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={data.email}
              />
            )}

            {data?.phone && (
              <ContactInfoCard
                icon={<Phone className="h-5 w-5" />}
                label="Phone"
                value={data.phone}
              />
            )}

            {data?.location && (
              <ContactInfoCard
                icon={<MapPin className="h-5 w-5" />}
                label="Location"
                value={data.location}
              />
            )}
          </div>

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
          className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Name
              </label>
              <input
                required
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Subject
            </label>
            <input
              required
              value={formData.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              className={inputClass}
              placeholder="What would you like to discuss?"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Message
            </label>
            <textarea
              required
              rows={7}
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Tell me about your project, role, or idea..."
            />
          </div>

          <button
            disabled={createMutation.isPending}
            type="submit"
            className="mt-6 w-full rounded-xl bg-linear-to-r from-cyan-400 to-indigo-500 px-5 py-3 font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {createMutation.isPending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

// import { useState } from "react";

// import SocialLinks from "../common/SocialLinks";
// import { useCreateContact } from "../../features/contact/hooks/useCreateContact";
// import { useProfile } from "../../features/profile/hooks/useProfile";
// import { showError, showSuccess } from "../../utils/toast";

// const initialForm = {
//   name: "",
//   email: "",
//   subject: "",
//   message: "",
// };

// export default function ContactSection() {
//   const { data } = useProfile();
//   const createMutation = useCreateContact();
//   const [formData, setFormData] = useState(initialForm);

//   if (!data?.email && !data?.github && !data?.linkedin) return null;

//   const inputClass =
//     "w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none transition focus:border-cyan-400";

//   const updateField = (key: keyof typeof formData, value: string) => {
//     setFormData((current) => ({
//       ...current,
//       [key]: value,
//     }));
//   };

//   return (
//     <section id="contact" className="mx-auto max-w-7xl px-6 py-16">
//       <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
//         <div>
//           <h2 className="text-4xl font-bold">Let&apos;s Connect</h2>

//           <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
//             I&apos;m always open to discussing new projects, creative ideas, or
//             opportunities to build useful software.
//           </p>

//           {data?.location && (
//             <p className="mt-4 text-slate-400">{data.location}</p>
//           )}

//           <div className="mt-8">
//             <SocialLinks profile={data} />
//           </div>
//         </div>

//         <form
//           onSubmit={(event) => {
//             event.preventDefault();

//             createMutation.mutate(formData, {
//               onSuccess: () => {
//                 setFormData(initialForm);
//                 showSuccess("Message sent successfully");
//               },
//               onError: () => showError("Failed to send message"),
//             });
//           }}
//           className="space-y-5"
//         >
//           <div>
//             <label className="mb-2 block font-medium">Name</label>
//             <input
//               required
//               value={formData.name}
//               onChange={(event) => updateField("name", event.target.value)}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="mb-2 block font-medium">Email</label>
//             <input
//               required
//               type="email"
//               value={formData.email}
//               onChange={(event) => updateField("email", event.target.value)}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="mb-2 block font-medium">Subject</label>
//             <input
//               required
//               value={formData.subject}
//               onChange={(event) => updateField("subject", event.target.value)}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="mb-2 block font-medium">Message</label>
//             <textarea
//               required
//               rows={6}
//               value={formData.message}
//               onChange={(event) => updateField("message", event.target.value)}
//               className={inputClass}
//             />
//           </div>

//           <button
//             disabled={createMutation.isPending}
//             type="submit"
//             className="w-full rounded-xl bg-linear-to-r from-cyan-400 to-indigo-500 px-5 py-3 font-semibold text-white disabled:opacity-60"
//           >
//             {createMutation.isPending ? "Sending..." : "Send Message"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }
