import { InputField } from '../InputField';
import { CheckboxField } from '../CheckboxField';

export function getTopLevelFields(
  obj: Record<string, any>,
  onChange: (key: string, value: any) => void,
) {
  return Object.entries(obj).flatMap(([key, value]) => {
    if (
      value === null ||
      typeof value === 'undefined' ||
      typeof value === 'function' ||
      typeof value === 'symbol' ||
      typeof value === 'bigint' ||
      typeof value === 'object' ||
      Array.isArray(value)
    ) {
      return [];
    }

    if (typeof value === 'boolean') {
      return [
        <CheckboxField
          key={key}
          label={key}
          checked={value}
          onChange={(val) => onChange(key, val)}
        />,
      ];
    }

    return [
      <InputField
        key={key}
        label={key}
        value={value}
        onChange={(val) => onChange(key, val)}
      />,
    ];
  });
}
