import { formatValue } from '@/shared/utils/formatValue';

type TableProps<T extends object> = {
  data: T[];
  allowedKeys?: string[];
  onEdit: (item: T) => void;
};

const Table = <T extends object>({
  data,
  allowedKeys,
  onEdit,
}: TableProps<T>) => {
  if (!data.length)
    return (
      <div className="text-center text-gray-500 p-4">
        Нет данных для отображения
      </div>
    );

  const columns: string[] =
    allowedKeys && allowedKeys.length > 0
      ? allowedKeys
      : Object.keys(data[0]).filter((key) => {
          const value = data[0][key as keyof T];
          return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            (typeof value === 'object' &&
              value !== null &&
              !Array.isArray(value))
          );
        });

  return (
    <table className="w-full table-auto text-sm text-black">
      <thead className="bg-purple-600 text-white">
        <tr>
          {columns.map((key) => (
            <th key={key} className="px-4 py-2 text-left capitalize">
              {key}
            </th>
          ))}
          <th className="px-4 py-2 text-left">Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className="bg-white hover:bg-gray-100 transition">
            {columns.map((key) => (
              <td key={key} className="px-4 py-2 border-t whitespace-pre-wrap">
                {formatValue(item[key as keyof T])}
              </td>
            ))}
            <td className="px-4 py-2 border-t">
              <button
                onClick={() => onEdit(item)}
                className="text-purple-600 hover:underline"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
