
import { Search } from 'lucide-react';

const FILTER_OPTIONS = [
  'Semua',
  'Antre',
  'Menunggu Pembayaran',
  'Diproses',
  'Selesai',
];

export default function OrderSearchFilter({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* INPUT PENCARIAN */}
      <div className="relative w-full">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Cari ID atau kode transaksi..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-2xl border border-transparent bg-white py-2.5 pl-10 pr-4 text-xs text-[#1F1915] shadow-xs outline-none transition-all placeholder:text-gray-400 focus:border-gray-300"
        />
      </div>

      {/* FILTER STATUS PESANAN */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {FILTER_OPTIONS.map((opt) => {
          const isActive = activeFilter === opt;

          return (
            <button
              key={opt}
              type="button"
              onClick={() => onFilterChange(opt)}
              className={`shrink-0 whitespace-nowrap rounded-xl border px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'border-[#708B96] bg-[#708B96] text-white shadow-xs'
                  : 'border-transparent bg-white text-[#6B655F] hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
