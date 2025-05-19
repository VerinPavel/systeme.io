import type { ActiveFilter } from '@/shared/hooks/useSearchFilter';

type StatusFilterProps = {
  value: ActiveFilter;
  onChange: (value: ActiveFilter) => void;
};

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as ActiveFilter);
  };

  return (
    <div className="flex items-center gap-4 mb-2">
      <label className="text-sm font-medium">Active:</label>
      <select
        value={value}
        onChange={handleChange}
        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="all">All</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </div>
  );
};

export { StatusFilter };
