
import React from 'react';
import { CreditCard } from 'lucide-react';

export default function RekapShift({ laporan }) {
  const qrisOmzet = Number(laporan?.qrisOmzet || 0);
  const tunaiOmzet = Number(laporan?.tunaiOmzet || 0);

  const qrisTransaksi = Number(laporan?.qrisTransaksi || 0);
  const tunaiTransaksi = Number(laporan?.tunaiTransaksi || 0);

  const totalOmzet = Number(laporan?.totalOmzet || 0);
  const totalTransaksi = Number(laporan?.totalTransaksi || 0);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  };

  const rows = [
    {
      id: 'QRIS',
      name: 'QRIS',
      description: 'Pembayaran non-tunai',
      orders: qrisTransaksi,
      total: qrisOmzet,
    },
    {
      id: 'TUNAI',
      name: 'Tunai',
      description: 'Pembayaran cash',
      orders: tunaiTransaksi,
      total: tunaiOmzet,
    },
  ];

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs lg:col-span-2">

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#1F1915]">
              Ringkasan Pembayaran
            </h3>

            <p className="mt-1 text-[11px] text-[#7A7167]">
              Rincian transaksi berdasarkan metode pembayaran
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F1EA] text-[#402719]">
            <CreditCard size={17} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[440px] text-left text-xs">

            <thead>
              <tr className="border-b border-[#E6DFD5] text-[10px] font-bold uppercase text-[#7A7167]">
                <th className="px-2 pb-3">Metode Pembayaran</th>
                <th className="px-2 pb-3">Keterangan</th>
                <th className="px-2 pb-3 text-center">Transaksi</th>
                <th className="px-2 pb-3 text-right">Total Omzet</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F4F1EA]">
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-[#F9F8F6]"
                >
                  <td className="px-2 py-5 font-semibold text-[#1F1915]">
                    {row.name}
                  </td>

                  <td className="px-2 py-5 text-[#6B6259]">
                    {row.description}
                  </td>

                  <td className="px-2 py-5 text-center font-medium text-[#1F1915]">
                    {row.orders}
                  </td>

                  <td className="px-2 py-5 text-right font-bold text-[#1F1915]">
                    {formatRupiah(row.total)}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t border-[#E6DFD5]">
                <td
                  colSpan={2}
                  className="px-2 py-4 font-bold text-[#1F1915]"
                >
                  Total
                </td>

                <td className="px-2 py-4 text-center font-bold text-[#1F1915]">
                  {totalTransaksi}
                </td>

                <td className="px-2 py-4 text-right font-extrabold text-[#E54322]">
                  {formatRupiah(totalOmzet)}
                </td>
              </tr>
            </tfoot>

          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#E6DFD5] pt-4 text-xs">
        <span className="text-[#7A7167]">
          Total Omzet Transaksi Selesai:
        </span>

        <span className="text-base font-extrabold text-[#E54322]">
          {formatRupiah(totalOmzet)}
        </span>
      </div>

    </div>
  );
}
