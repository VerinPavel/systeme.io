import { useEditableModal } from './Model/useEditableModal';
import { getTopLevelFields } from './lib/getTopLevelFields';
import { collectNestedSections } from './lib/collectNestedSections';

type Props<T> = {
  item: T | null;
  onClose: () => void;
  onSave: (item: T) => void;
};

export function Modal<T extends Record<string, any>>({
  item,
  onClose,
  onSave,
}: Props<T>) {
  const { edited, handleChange, handleSave } = useEditableModal({
    item,
    onClose,
    onSave,
  });

  if (!item) return null;

  const topLevelFields = getTopLevelFields(edited, handleChange);

  const sections = collectNestedSections(edited, handleChange);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-xl p-6 w-[400px] max-h-[80vh] overflow-y-auto shadow-lg space-y-4">
        <h3 className="text-lg font-semibold">Edit</h3>

        <div className="space-y-2">{topLevelFields}</div>

        {sections.map((section) => (
          <fieldset
            key={section.path}
            className="border border-gray-200 rounded-md p-3"
          >
            <legend className="text-sm font-semibold mb-2 text-gray-700">
              {section.path}
            </legend>
            <div className="space-y-2">{section.fields}</div>
          </fieldset>
        ))}

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-4 py-1.5 rounded-md hover:bg-purple-700 transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-1.5 rounded-md hover:bg-gray-400 transition"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
