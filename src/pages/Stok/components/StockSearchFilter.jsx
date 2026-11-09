
import { Search, Plus, ChevronDown } from 'lucide-react';

export default function StockSearchFilter({
  searchQuery,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  onAdd,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama atau kode bahan..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />
          Tambah Bahan
        </button>
      </div>

      <div className="flex flex-col gap-2 sm:max-w-xs">
        <label className="text-sm font-medium text-gray-600">
          Kategori Bahan
        </label>

        <div className="relative">
          <select
            value={activeCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'Semua' ? 'Semua Kategori' : category}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
    </div>
  );
}
