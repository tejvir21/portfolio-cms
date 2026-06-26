import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Column<T> {
  key: string;
  title: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
}

export default function DataTable<T>({
  data,
  columns,
  pageSize = 10,
}: Props<T>) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  useEffect(() => {
    setPage(1);
  }, [data]);

  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return data.slice(start, start + rowsPerPage);
  }, [data, page, rowsPerPage]);

  const startItem = data.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;

  const endItem = Math.min(page * rowsPerPage, data.length);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      {/* <div className="overflow-x-auto"> */}
      <table className="w-full min-w-max">
        <thead className="bg-slate-950">
          <tr className="border-b border-slate-800">
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-slate-800 transition hover:bg-slate-800/40"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 text-sm">
                  {column.render
                    ? column.render(row)
                    : String((row as any)[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}

          {!paginatedData.length && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-slate-400"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* </div> */}

      {/* Footer */}
      <div className="flex flex-col gap-4 border-t border-slate-800 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-slate-400">
          Showing {startItem}-{endItem} of {data.length}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Rows</span>

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1"
            >
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage(1)}
              className="rounded-lg border border-slate-700 p-2 disabled:opacity-40"
            >
              <ChevronsLeft size={16} />
            </button>

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="rounded-lg border border-slate-700 p-2 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="px-4 text-sm">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="rounded-lg border border-slate-700 p-2 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
              className="rounded-lg border border-slate-700 p-2 disabled:opacity-40"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// interface Column<T> {
//   key: string;
//   title: string;
//   render?: (row: T) => React.ReactNode;
// }

// interface Props<T> {
//   data: T[];
//   columns: Column<T>[];
// }

// export default function DataTable<T>({ data, columns }: Props<T>) {
//   return (
//     <div className="overflow-x-auto rounded-2xl border border-slate-800">
//       <table className="w-full min-w-max">
//         <thead>
//           <tr className="border-b border-slate-800 bg-slate-900">
//             {columns.map((column) => (
//               <th key={column.key} className="px-6 py-4 text-left font-medium">
//                 {column.title}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex} className="border-b border-slate-800">
//               {columns.map((column) => (
//                 <td key={column.key} className="px-6 py-4">
//                   {column.render
//                     ? column.render(row)
//                     : String((row as any)[column.key])}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
