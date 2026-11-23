
import React from 'react';
import { Eye } from 'lucide-react';

export default function HistoryTable({
  currentHistory,
  onPreview,
}) {
  // ==========================================
  // WARNA STATUS TRANSAKSI
  // ==========================================
  const getStatusStyle = (status) => {
    const normalizedStatus = String(status || '')
      .toLowerCase()
      .trim();

    if (
      normalizedStatus === 'selesai' ||
      normalizedStatus === 'sukses'
    ) {
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }

    if (normalizedStatus === 'diproses') {
      return 'bg-blue-100 text-blue-700 border-blue-200';
    }

    if (
      normalizedStatus === 'menunggu' ||
      normalizedStatus === 'menunggu pembayaran'
    ) {
      return 'bg-amber-100 text-amber-700 border-amber-200';
    }

    if (normalizedStatus === 'dibatalkan') {
      return 'bg-red-100 text-red-700 border-red-200';
    }

    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="flex-1 overflow-x-auto overflow-y-auto">
      <table className="w-full min-w-[1100px] table-fixed border-collapse text-left">

        <colgroup>
          <col className="w-[14%]" />
          <col className="w-[19%]" />
          <col className="w-[16%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[15%]" />
        </colgroup>

        {/* HEADER TABEL */}
        <thead className="sticky top-0 z-10 bg-[#8B9EA8] text-[#1E293B]">
          <tr className="h-[46px]">
            <th className="whitespace-nowrap px-4 py-3 text-[10px] font-extrabold tracking-wider">
              INVOICE ID
            </th>

            <th className="whitespace-nowrap px-4 py-3 text-[10px] font-extrabold tracking-wider">
              PESANAN
            </th>

            <th className="whitespace-nowrap px-4 py-3 text-[10px] font-extrabold tracking-wider">
              TANGGAL & WAKTU
            </th>

            <th className="whitespace-nowrap px-3 py-3 text-center text-[10px] font-extrabold tracking-wider">
              METODE
            </th>

            <th className="whitespace-nowrap px-3 py-3 text-[10px] font-extrabold tracking-wider">
              JUMLAH
            </th>

            <th className="whitespace-nowrap px-3 py-3 text-center text-[10px] font-extrabold tracking-wider">
              STATUS
            </th>

            <th className="whitespace-nowrap px-4 py-3 text-center text-[10px] font-extrabold tracking-wider">
              AKSI
            </th>
          </tr>
        </thead>

        {/* ISI TABEL */}
        <tbody className="divide-y divide-gray-100">
          {currentHistory.length > 0 ? (
            currentHistory.map((item) => (
              <tr
                key={item.id ?? item.invoiceId}
                className="h-[72px] transition-colors hover:bg-slate-50"
              >
                {/* INVOICE */}
                <td className="overflow-hidden px-4 py-3">
                  <div className="truncate text-xs font-extrabold text-slate-800">
                    {item.invoiceId}
                  </div>
                </td>

                {/* PESANAN */}
                <td className="overflow-hidden px-4 py-3">
                  <div className="truncate text-xs font-medium text-slate-700">
                    {item.itemsSummary}
                  </div>

                  <div className="mt-1 text-[10px] text-gray-400">
                    {item.totalItemCount} item
                  </div>
                </td>

                {/* TANGGAL DAN WAKTU */}
                <td className="px-4 py-3">
                  <div className="whitespace-nowrap text-xs font-semibold text-slate-700">
                    {item.date}
                  </div>

                  <div className="mt-1 text-[10px] text-gray-400">
                    {item.time}
                  </div>
                </td>

                {/* METODE PEMBAYARAN */}
                <td className="px-3 py-3 text-center">
                  <span className="inline-block whitespace-nowrap rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase text-gray-700">
                    {item.method}
                  </span>
                </td>

                {/* TOTAL */}
                <td className="px-3 py-3">
                  <div className="whitespace-nowrap text-xs font-extrabold text-slate-900">
                    {item.totalAmount}
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-3 py-3 text-center">
                  <span
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* AKSI */}
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onPreview(item)}
                    className="inline-flex min-w-[125px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 text-[10px] font-bold text-gray-600 shadow-sm transition-all hover:border-[#402719] hover:bg-[#F4F1EA] hover:text-[#402719] cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>Preview Invoice</span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="py-10 text-center text-xs font-semibold text-gray-400"
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
