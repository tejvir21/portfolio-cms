import { useRef } from "react";

interface Props {
  accept?: string;
  preview?: string;

  onSelect: (
    file: File
  ) => void;
}

export default function FileUpload({
  accept,
  preview,
  onSelect,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-48 w-full rounded-xl object-cover"
        />
      )}

      <button
        type="button"
        onClick={() =>
          inputRef.current?.click()
        }
        className="rounded-xl border border-slate-700 px-4 py-3"
      >
        Choose File
      </button>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          if (file) {
            onSelect(file);
          }
        }}
      />
    </div>
  );
}
