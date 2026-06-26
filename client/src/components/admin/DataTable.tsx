interface Column<T> {
  key: string;
  title: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
}

export default function DataTable<T>({ data, columns }: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="w-full min-w-175">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900">
            {columns.map((column) => (
              <th key={column.key} className="px-6 py-4 text-left font-medium">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-slate-800">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  {column.render
                    ? column.render(row)
                    : String((row as any)[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
