
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
      <div className="relative h-12 w-full">

        <Search
          size={17}
          strokeWidth={1.8}
          className="pointer-events-none absolute left-4 top-0 bottom-0 z-10 my-auto text-gray-400"
        />

        <input
          type="text"
          placeholder="Cari ID atau kode transaksi..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            h-full
            w-full
            rounded-2xl
            border
            border-transparent
            bg-white
            py-0
            pl-11
            pr-4
            text-xs
            leading-normal
            text-[#1F1915]
            shadow-xs
            outline-none
            transition-all
            placeholder:text-gray-400
            focus:border-gray-300
          "
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
