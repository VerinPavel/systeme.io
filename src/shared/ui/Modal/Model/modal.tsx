import { useEffect, useState } from 'react';

export function useEditableModal<T extends Record<string, any>>({
  item,
  onSave,
  onClose,
}: {
  item: T | null;
  onSave: (item: T) => void;
  onClose: () => void;
}) {
  const [edited, setEdited] = useState<T>(item || ({} as T));

  useEffect(() => {
    if (item) setEdited(item);
  }, [item]);

  const handleChange = (key: string, value: string) => {
    setEdited((prev) => ({ ...prev, [key]: value }));
  };

  const handleNestedChange = (
    parentKey: string,
    key: string,
    value: string,
  ) => {
    setEdited((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(edited);
    onClose();
  };

  return {
    item,
    edited,
    handleChange,
    handleNestedChange,
    handleSave,
  };
}
