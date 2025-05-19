import { formatValue } from '@/shared/utils/formatValue';
import { useEditableModal } from './Model/modal';

type Props<T> = {
  item: T | null;
  onClose: () => void;
  onSave: (item: T) => void;
};

function renderNestedFields(
  keyPrefix: string,
  value: Record<string, any>,
  handleNestedChange: (path: string, value: string) => void,
  depth = 0,
) {
  return (
    <div
      className={`space-y-2 ${depth > 0 ? 'ml-4 pl-2 border-l-2 border-gray-200' : ''}`}
    >
      {Object.entries(value).map(([subKey, subValue]) => {
        const fullKey = `${keyPrefix}.${subKey}`;

        if (typeof subValue === 'string') {
          return (
            <div key={fullKey} className="space-y-1">
              <label className="block text-sm">{subKey}</label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={subValue}
                onChange={(e) => handleNestedChange(fullKey, e.target.value)}
              />
            </div>
          );
        }

        if (typeof subValue === 'object' && subValue !== null) {
          return (
            <fieldset key={fullKey} className="border p-3 rounded-md">
              <legend className="text-sm font-semibold">{subKey}</legend>
              {renderNestedFields(
                fullKey,
                subValue,
                handleNestedChange,
                depth + 1,
              )}
            </fieldset>
          );
        }

        return null;
      })}
    </div>
  );
}

export function Modal<T extends Record<string, any>>(props: Props<T>) {
  const { item, edited, handleChange, handleNestedChange, handleSave } =
    useEditableModal(props);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-xl p-6 w-[350px] max-h-[80vh] overflow-y-auto shadow-lg space-y-4">
        <h3 className="text-lg font-semibold">Edit</h3>

        {Object.entries(edited).map(([key, value]) => {
          if (typeof value === 'string') {
            return (
              <div key={key} className="space-y-1">
                <label className="block text-sm font-medium">{key}</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formatValue(value)}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            );
          }

          if (typeof value === 'object' && value !== null) {
            return (
              <fieldset
                key={key}
                className="border border-gray-200 rounded-md p-2 mt-2"
              >
                <legend className="text-sm font-medium px-2 text-gray-700">
                  {key}
                </legend>
                <div className="p-2">
                  {renderNestedFields(key, value, (path, val) => {
                    const [rootKey, ...rest] = path.split('.');
                    handleNestedChange(rootKey, rest.join('.'), val);
                  })}
                </div>
              </fieldset>
            );
          }

          return null;
        })}

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-4 py-1.5 rounded-md hover:bg-purple-700 transition"
          >
            Save
          </button>
          <button
            onClick={props.onClose}
            className="bg-gray-300 text-black px-4 py-1.5 rounded-md hover:bg-gray-400 transition"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
