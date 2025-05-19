import { formatValue } from '@/shared/utils/formatValue';

type TableProps<T extends object> = {
  data: T[];
  allowedKeys: (keyof T)[];
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

  return (
    <table className="w-full table-auto text-sm text-black">
      <thead className="bg-purple-600 text-white">
        <tr>
          {allowedKeys.map((key) => (
            <th key={String(key)} className="px-4 py-2 text-left">
              {String(key)}
            </th>
          ))}
          <th className="px-4 py-2 text-left">Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className="bg-white hover:bg-gray-100 transition">
            {allowedKeys.map((key) => (
              <td key={String(key)} className="px-4 py-2 border-t">
                {formatValue(item[key])}
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
