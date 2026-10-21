import { Link } from "react-router-dom";
import { ArrowLeft, Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-white">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Terminal icon */}
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
          <Terminal className="text-cyan-300" size={30} />
        </div>

        {/* 404 */}
        <div className="relative">
          <h1 className="select-none text-[clamp(7rem,25vw,13rem)] font-black leading-none tracking-[-0.08em] text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-400 to-sky-600">
            404
          </h1>

          {/* Glow behind number */}
          <div className="pointer-events-none absolute inset-0 -z-10 text-[clamp(7rem,25vw,13rem)] font-black leading-none tracking-[-0.08em] text-cyan-400/10 blur-3xl">
            404
          </div>
        </div>

        {/* Message */}
        <div className="mx-auto mt-4 max-w-lg">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Page Not Found
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Looks like this route doesn't exist. The page may have been removed,
            moved, or the URL might be incorrect.
          </p>
        </div>

        {/* Terminal message */}
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left shadow-[0_0_30px_rgba(34,211,238,0.05)]">
          <div className="mb-3 flex items-center gap-2 border-b border-slate-800 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>

          <div className="font-mono text-sm">
            <p className="text-slate-500">
              <span className="text-cyan-400">$</span> find page
            </p>

            <p className="mt-2 text-red-400">Error 404: Page not found</p>

            <p className="mt-2 text-slate-500">
              <span className="text-cyan-400">$</span> return home
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-medium text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Small footer */}
        <p className="mt-10 text-xs text-slate-600">
          Error Code: 404 • Route Not Found
        </p>
      </div>
    </main>
  );
}
