import type { JSX } from 'react';
import { CheckboxField } from '../CheckboxField';
import { InputField } from '../InputField';

export function collectNestedSections(
  value: Record<string, any>,
  onChange: (path: string, val: any) => void,
  pathPrefix = '',
): { path: string; fields: JSX.Element[] }[] {
  const sections: { path: string; fields: JSX.Element[] }[] = [];

  for (const [key, val] of Object.entries(value)) {
    const fullKey = pathPrefix ? `${pathPrefix}.${key}` : key;

    if (
      val === null ||
      typeof val === 'undefined' ||
      typeof val === 'function' ||
      typeof val === 'symbol' ||
      typeof val === 'bigint' ||
      Array.isArray(val)
    ) {
      continue;
    }

    if (typeof val === 'object') {
      const fields: JSX.Element[] = [];

      for (const [k, v] of Object.entries(val)) {
        const nestedKey = `${fullKey}.${k}`;

        if (typeof v === 'boolean') {
          fields.push(
            <CheckboxField
              key={nestedKey}
              label={k}
              checked={v}
              onChange={(checked) => onChange(nestedKey, checked)}
            />,
          );
        } else if (typeof v === 'string' || typeof v === 'number') {
          fields.push(
            <InputField
              key={nestedKey}
              label={k}
              value={v}
              onChange={(val) => onChange(nestedKey, val)}
            />,
          );
        }
      }

      if (fields.length > 0) {
        const readablePath = fullKey.replace(/\./g, ' → ');
        sections.push({ path: readablePath, fields });
      }

      sections.push(...collectNestedSections(val, onChange, fullKey));
    }
  }

  return sections;
}
