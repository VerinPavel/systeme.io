import { useState, useMemo } from 'react';
import { formatValue } from '../utils/formatValue';

export enum ActiveFilter {
  ALL = 'all',
  TRUE = 'true',
  FALSE = 'false',
}

export function useSearchAndFilter<T extends Record<string, any>>(data: T[]) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(
    ActiveFilter.ALL,
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = Object.values(item).some((value) => {
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          return Object.values(item).some((value) =>
            formatValue(value).toLowerCase().includes(search.toLowerCase()),
          );
        }

        if (typeof value === 'object' && value !== null) {
          return Object.values(value).some((nested) =>
            ['string', 'number', 'boolean'].includes(typeof nested)
              ? String(nested).toLowerCase().includes(search.toLowerCase())
              : false,
          );
        }

        return false;
      });

      const matchesActive =
        activeFilter === ActiveFilter.ALL ||
        (activeFilter === ActiveFilter.TRUE && item.active === true) ||
        (activeFilter === ActiveFilter.FALSE && item.active === false);

      return matchesSearch && matchesActive;
    });
  }, [data, search, activeFilter]);

  return {
    filteredData,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
  };
}
