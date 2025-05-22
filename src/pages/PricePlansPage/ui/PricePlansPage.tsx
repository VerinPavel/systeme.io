import { pricePlansMoc, tabelColumnsKeys } from '../config/PricePlansData';

import { Table } from '@/shared/ui/Table/Table';
import { Modal } from '@/shared/ui/Modal/Modal';
import { SearchInput } from '@/shared/ui/Filters/Search';
import { StatusFilter } from '@/shared/ui/Filters/StatusFilter';

import { useEditableData } from '@/shared/hooks/useEditableData';
import { useSearchAndFilter } from '@/shared/hooks/useSearchFilter';
import { getAllowedKeysProp } from '@/shared/utils/allowedKeysProp';

const PricePlansPage = () => {
  const { data, selected, setSelected, handleSave, resetSelectedValue } =
    useEditableData('price-plans-data', pricePlansMoc);

  const { filteredData, search, setSearch, activeFilter, setActiveFilter } =
    useSearchAndFilter(data);

  const allowedKeysProp = getAllowedKeysProp(tabelColumnsKeys);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-purple-700">PricePlans</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <SearchInput value={search} onChange={setSearch} />
        <StatusFilter value={activeFilter} onChange={setActiveFilter} />
      </div>
      <div className="rounded-xl shadow border border-gray-200 overflow-x-auto">
        <Table data={filteredData} {...allowedKeysProp} onEdit={setSelected} />
      </div>
      <Modal item={selected} onClose={resetSelectedValue} onSave={handleSave} />
    </div>
  );
};

export { PricePlansPage };
