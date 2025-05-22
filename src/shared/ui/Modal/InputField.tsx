type Props = {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
};

export function InputField({ label, value, onChange }: Props) {
  const inputType = typeof value === 'number' ? 'number' : 'text';

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={inputType}
        value={String(value)}
        onChange={(e) =>
          onChange(
            inputType === 'number' ? Number(e.target.value) : e.target.value,
          )
        }
        className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
