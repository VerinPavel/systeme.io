import type { Page } from '../types/types';
import { pagesMoc } from '../config/pageData';

import { SearchInput } from '@/shared/ui/Filters/Search';
import { StatusFilter } from '@/shared/ui/Filters/StatusFilter';
import { Table } from '@/shared/ui/Table/Table';
import { Modal } from '@/shared/ui/Modal/Modal';

import { useEditableData } from '@/shared/hooks/useEditableData';
import { useSearchAndFilter } from '@/shared/hooks/useSearchFilter';

const tabelColumnsKeys = [
  'title',
  'active',
  'updatedAt',
  'publishedAt',
] satisfies (keyof Page)[];

const PagesPage = () => {
  const { data, selected, setSelected, handleSave, resetSelectedValue } =
    useEditableData<Page>('pages-data', pagesMoc);

  const { filteredData, search, setSearch, activeFilter, setActiveFilter } =
    useSearchAndFilter(data);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-purple-700">Pages</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <SearchInput value={search} onChange={setSearch} />
        <StatusFilter value={activeFilter} onChange={setActiveFilter} />
      </div>

      <div className="rounded-xl shadow border border-gray-200 overflow-x-auto">
        <Table
          data={filteredData}
          allowedKeys={tabelColumnsKeys}
          onEdit={setSelected}
        />
      </div>

      <Modal item={selected} onClose={resetSelectedValue} onSave={handleSave} />
    </div>
  );
};

export { PagesPage };
