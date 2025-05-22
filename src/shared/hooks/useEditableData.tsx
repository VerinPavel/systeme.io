import { useEffect, useState } from 'react';

export function useEditableData<T extends { id: string | number }>(
  key: string,
  initialData: T[],
) {
  const [data, setData] = useState<T[]>([]);
  const [selected, setSelected] = useState<T | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData(initialData);
      }
    } else {
      setData(initialData);
    }
  }, [key]);

  const resetSelectedValue = () => setSelected(null);

  const handleSave = (updated: T) => {
    const updatedData = data.map((item) =>
      item.id === updated.id ? updated : item,
    );
    setData(updatedData);
    setSelected(null);
    localStorage.setItem(key, JSON.stringify(updatedData));
  };

  return {
    data,
    selected,
    setSelected,
    handleSave,
    resetSelectedValue,
  };
}
