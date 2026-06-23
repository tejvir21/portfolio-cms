import { X } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function FormModal({ open, title, children, onClose }: Props) {
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/60" />

      <div className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {children}
      </div>
    </>
  );
}
