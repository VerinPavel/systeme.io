import React, { useMemo } from 'react';
import { debounce } from '@/shared/utils/debounce';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      defaultValue={value}
      onChange={handleChange}
      className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
};

export { SearchInput };
