import { useEffect, useState } from 'react';

function setDeepValue<T>(obj: T, path: string, value: any): T {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((acc, key) => {
    if (typeof acc[key] !== 'object' || acc[key] === null) acc[key] = {};
    return acc[key];
  }, obj as any);

  target[lastKey] = value;
  return { ...obj };
}

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

  const handleChange = (path: string, value: any) => {
    setEdited((prev) => setDeepValue({ ...prev }, path, value));
  };

  const handleSave = () => {
    onSave(edited);
    onClose();
  };

  return {
    item,
    edited,
    handleChange,
    handleSave,
  };
}
