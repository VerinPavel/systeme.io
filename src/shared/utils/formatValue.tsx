type FormatHandler = (value: unknown, depth?: number) => string;

const INDENT = '  ';

const formatters: Record<string, FormatHandler> = {
  string: (v) => {
    const val = v as string;
    const date = new Date(val);
    return !isNaN(date.getTime()) && val.includes('T')
      ? date.toLocaleDateString('ru-RU')
      : val;
  },

  number: (v) => String(v),
  boolean: (v) => String(v),

  object: (v, depth = 0) => {
    if (Array.isArray(v)) return '';

    const entries = Object.entries(v as Record<string, unknown>)
      .map(([key, val]) => {
        if (
          val === null ||
          typeof val === 'undefined' ||
          typeof val === 'function' ||
          typeof val === 'symbol' ||
          typeof val === 'bigint' ||
          Array.isArray(val)
        ) {
          return '';
        }

        const indent = INDENT.repeat(depth);
        const valType = typeof val;

        if (valType === 'object') {
          const nested = formatValue(val, depth + 1);
          return nested ? `${indent}${key}:\n${nested}` : '';
        }

        const formatted = formatValue(val, depth + 1);
        return `${indent}${key}: ${formatted}`;
      })
      .filter(Boolean);

    return entries.join('\n');
  },

  undefined: () => '-',
  bigint: () => '',
  symbol: () => '',
  function: () => 'function',
};

const formatValue = (value: unknown, depth = 0): string => {
  if (value === null) {
    return depth === 0 ? '-' : '';
  }

  const type = typeof value;
  const formatter = formatters[type];
  return formatter ? formatter(value, depth) : '';
};

export { formatValue };
