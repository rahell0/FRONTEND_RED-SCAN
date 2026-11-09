import React from 'react';
import { Filter } from 'lucide-react';

const shiftReports = [
  {
    id: 'SH-01',
    name: 'Shift Pagi (08:00 - 16:00)',
    cashier: 'Rian H.',
    orders: 68,
    cash: 'Rp 750.000',
    qris: 'Rp 1.400.000',
    total: 'Rp 2.150.000',
  },
  {
    id: 'SH-02',
    name: 'Shift Malam (16:00 - 00:00)',
    cashier: 'Annisa K.',
    orders: 82,
    cash: 'Rp 900.000',
    qris: 'Rp 1.800.000',
    total: 'Rp 2.700.000',
  },
];

export default function RekapShift() {
  return (
    <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#1F1915]">
              Rekapitulasi Shift Kasir
            </h3>
            <p className="text-[11px] text-[#7A7167]">
              Rincian pendapatan berdasarkan jadwal shift aktif hari ini
            </p>
          </div>

          <Filter size={16} className="text-[#8C827A]" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6DFD5] text-[#7A7167] uppercase text-[10px] font-bold">
                <th className="pb-3 px-2">Shift</th>
                <th className="pb-3 px-2">Kasir</th>
                <th className="pb-3 px-2 text-center">Transaksi</th>
                <th className="pb-3 px-2">Cash</th>
                <th className="pb-3 px-2">QRIS</th>
                <th className="pb-3 px-2 text-right">Total Omzet</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F4F1EA]">
              {shiftReports.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#F9F8F6] transition-colors"
                >
                  <td className="py-3.5 px-2 font-semibold text-[#1F1915]">
                    {row.name}
                  </td>
                  <td className="py-3.5 px-2 text-[#6B6259]">
                    {row.cashier}
                  </td>
                  <td className="py-3.5 px-2 text-center font-medium">
                    {row.orders}
                  </td>
                  <td className="py-3.5 px-2 text-[#6B6259]">
                    {row.cash}
                  </td>
                  <td className="py-3.5 px-2 text-[#6B6259]">
                    {row.qris}
                  </td>
                  <td className="py-3.5 px-2 text-right font-bold text-[#1F1915]">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E6DFD5] flex justify-between items-center text-xs">
        <span className="text-[#7A7167]">
          Total Gabungan Shift Hari Ini:
        </span>

        <span className="text-base font-extrabold text-[#E54322]">
          Rp 4.850.000
        </span>
      </div>
    </div>
  );
}