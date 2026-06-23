import SocialLinks from "./SocialLinks";
import { useProfile } from "../../features/profile/hooks/useProfile";

export default function Footer() {
  const { data } = useProfile();

  return (
    <footer className="border-t border-slate-800 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center">
        <SocialLinks profile={data} />

        {data?.name && (
          <p className="text-sm text-slate-400">
            Made with care by <span className="text-cyan-300">{data.name}</span>
          </p>
        )}

        <p className="text-sm text-slate-500">
          Copyright {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
