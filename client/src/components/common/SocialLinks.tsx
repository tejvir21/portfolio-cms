import { FaFileAlt, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { ExternalLink } from "lucide-react";

import { type Profile } from "../../features/profile/api/profile.api";

interface Props {
  profile?: Profile | null;
  showResume?: boolean;
}

export default function SocialLinks({ profile, showResume = true }: Props) {
  const links = [
    {
      label: "GitHub",
      href: profile?.github,
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: profile?.linkedin,
      icon: FaLinkedinIn,
    },
    {
      label: "LeetCode",
      href: profile?.leetcode,
      icon: SiLeetcode,
    },
    {
      label: "Twitter",
      href: profile?.twitter,
      icon: FaTwitter,
    },
    {
      label: "Portfolio",
      href: profile?.portfolio,
      icon: ExternalLink,
    },
    {
      label: "Resume",
      href: showResume ? profile?.resumeUrl : "",
      icon: FaFileAlt,
    },
  ].filter((item) => item.href);

  if (!links.length) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {links.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            title={item.label}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-400 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.12)] transition hover:bg-cyan-400 hover:text-slate-950"
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}
