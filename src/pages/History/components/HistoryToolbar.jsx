
import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function HistoryToolbar({
  activeKasirName,
  searchQuery,
  setSearchQuery,
  setCurrentPage,
}) {
  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <div className="flex items-center gap-2 bg-[#F3EFE6] px-3 py-1.5 rounded-xl border border-[#E2DBD0] text-xs font-medium text-gray-700">
        <Filter size={14} className="text-gray-500" />

        <span>
          Menampilkan data untuk:{' '}
          <strong className="text-[#1F1915]">
            {activeKasirName}
          </strong>
        </span>
      </div>

      <div className="relative max-w-xs flex-1 flex items-center">
        <Search
          className="absolute left-3.5 text-gray-400 pointer-events-none"
          size={16}
        />

        <input
          type="text"
          placeholder="Cari No. invoice atau item..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-transparent bg-white text-xs text-[#1F1915] placeholder-gray-400 outline-none shadow-xs focus:border-gray-300 transition-all leading-normal"
        />
      </div>
    </div>
  );
}
