import React from 'react';
import { Calendar, Download } from 'lucide-react';

export default function LaporanHeader({ filterRange, setFilterRange }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-[#1F1915] tracking-tight">
          Ringkasan Laporan Omzet
        </h1>
        <p className="text-xs text-[#7A7167] mt-0.5">
          Laporan penjualan bersih dan statistik omzet outlet
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 bg-[#F4F1EA] px-3 py-2 rounded-xl border border-[#D8D1C9]">
          <Calendar size={15} className="text-[#7A7167]" />

          
        <select
          value={filterRange}
          onChange={(e) => setFilterRange(e.target.value)}
          className="bg-transparent text-xs font-semibold text-[#1F1915] focus:outline-none cursor-pointer"
        >
          <option value="hari_ini">Hari Ini</option>
          <option value="kemarin">Kemarin</option>
          <option value="minggu_ini">Minggu Ini</option>
          <option value="bulan_ini">Bulan Ini</option>
          <option value="semua">Semua Data</option>
        </select>

        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E54322] hover:bg-[#d03b1c] text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
        >
          <Download size={15} />
          <span>Unduh Laporan</span>
        </button>
      </div>
    </div>
  );
}