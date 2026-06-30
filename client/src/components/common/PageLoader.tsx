export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background Glow */}
      <div className="absolute h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
      <div className="absolute h-72 w-72 rounded-full bg-sky-500/10 blur-3xl animate-pulse delay-700" />

      <div className="relative flex flex-col items-center">
        {/* Loader */}
        <div className="relative flex h-40 w-40 items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-cyan-500/20 border-t-cyan-400" />

          {/* Middle Ring */}
          <div className="absolute inset-4 animate-[spin_6s_linear_reverse_infinite] rounded-full border-[3px] border-sky-500/20 border-b-sky-400" />

          {/* Inner Ring */}
          <div className="absolute inset-8 animate-pulse rounded-full border-2 border-dashed border-cyan-300/40" />

          {/* Center Logo */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/30 rounded-full bg-slate-900 shadow-[0_0_40px_rgba(34,211,238,0.35)]">
            {/* Replace with your logo */}
            {/* <img
              src="/logo.svg"
              alt="TC"
              className="h-10 w-10 object-contain"
            /> */}

            {/* If you don't have logo yet, use this instead */}
            <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-2xl font-bold tracking-widest text-transparent">
              {"<TC/>"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-10 bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-2xl font-bold tracking-wide text-transparent">
          Loading Portfolio
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Preparing projects, skills & experience...
        </p>

        {/* Animated Dots */}
        <div className="mt-6 flex gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400" />
        </div>

        {/* Progress Bar */}
        <div className="mt-8 h-1.5 w-64 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" />
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}

// export default function PageLoader() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-950">
//       <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
//     </div>
//   );
// }
