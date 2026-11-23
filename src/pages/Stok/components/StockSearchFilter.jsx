
import { Search, Plus, ChevronDown } from 'lucide-react';

export default function StockSearchFilter({
  searchQuery,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  statuses,
  activeStatus,
  onStatusChange,
  onAdd,
}) {
  const selectClass =
    'h-[46px] w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-11 text-sm leading-normal text-gray-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100';

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Search dan Tambah Bahan */}
      <div className="flex w-full items-center gap-3">
        <div className="relative h-[46px] min-w-0 flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <Search size={18} className="text-gray-400" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama atau kode bahan..."
            className="h-full w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm leading-normal text-gray-700 outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />
          Tambah Bahan
        </button>
      </div>

      {/* Filter */}
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <label className="text-sm font-medium leading-5 text-gray-600">
            Kategori Bahan
          </label>

          <div className="relative h-[46px] w-full">
            <select
              value={activeCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={selectClass}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'Semua' ? 'Semua Kategori' : category}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label className="text-sm font-medium leading-5 text-gray-600">
            Status Stok
          </label>

          <div className="relative h-[46px] w-full">
            <select
              value={activeStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className={selectClass}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'Semua' ? 'Semua Status' : status}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
