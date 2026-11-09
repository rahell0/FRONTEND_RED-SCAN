
import React from 'react';
import { Eye } from 'lucide-react';

export default function HistoryTable({
  currentHistory,
  onPreview,
}) {
  return (
    <div className="overflow-x-auto overflow-y-auto flex-1">
      <table className="w-full min-w-[900px] table-fixed text-left border-collapse">

        {/* UKURAN KOLOM DIBUAT TETAP */}
        <colgroup>
          <col className="w-[13%]" />
          <col className="w-[21%]" />
          <col className="w-[17%]" />
          <col className="w-[13%]" />
          <col className="w-[13%]" />
          <col className="w-[11%]" />
          <col className="w-[12%]" />
        </colgroup>

        {/* HEADER TABEL */}
        <thead className="sticky top-0 bg-[#8B9EA8] text-[#1E293B] z-10">
          <tr className="h-[42px]">
            <th className="px-4 py-2 text-[9px] font-extrabold tracking-wider whitespace-nowrap">
              INVOICE ID
            </th>

            <th className="px-4 py-2 text-[9px] font-extrabold tracking-wider whitespace-nowrap">
              PESANAN
            </th>

            <th className="px-4 py-2 text-[9px] font-extrabold tracking-wider whitespace-nowrap">
              TANGGAL & WAKTU
            </th>

            <th className="px-4 py-2 text-[9px] font-extrabold tracking-wider text-center whitespace-nowrap">
              METODE
            </th>

            <th className="px-4 py-2 text-[9px] font-extrabold tracking-wider whitespace-nowrap">
              JUMLAH
            </th>

            <th className="px-4 py-2 text-[9px] font-extrabold tracking-wider text-center whitespace-nowrap">
              STATUS
            </th>

            <th className="px-4 py-2 text-[9px] font-extrabold tracking-wider text-center whitespace-nowrap">
              AKSI
            </th>
          </tr>
        </thead>

        {/* ISI TABEL */}
        <tbody className="divide-y divide-gray-100">
          {currentHistory.length > 0 ? (
            currentHistory.map((item) => (
              <tr
                key={item.invoiceId}
                className="h-[65px] hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3 text-xs font-extrabold text-slate-800 truncate">
                  {item.invoiceId}
                </td>

                <td className="px-4 py-3 overflow-hidden">
                  <div className="text-xs font-medium text-slate-700 truncate">
                    {item.itemsSummary}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {item.totalItemCount} item
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                    {item.date}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {item.time}
                  </div>
                </td>

                <td className="px-4 py-3 text-center">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-700 rounded-md border border-gray-200 uppercase whitespace-nowrap">
                    {item.method}
                  </span>
                </td>

                <td className="px-4 py-3 text-xs font-extrabold text-slate-900 whitespace-nowrap">
                  {item.totalAmount}
                </td>

                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                    • {item.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onPreview(item)}
                    className="inline-flex items-center justify-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 hover:bg-gray-50 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                  >
                    <Eye size={12} />
                    <span>Preview Invoice</span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="text-center py-8 text-xs text-gray-400 font-semibold"
              >
                Tidak ada data transaksi yang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
