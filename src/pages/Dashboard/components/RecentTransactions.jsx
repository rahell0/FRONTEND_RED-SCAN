
import { Search, RotateCw, Printer, Eye, ArrowRight } from 'lucide-react';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function RecentTransactions({
  transactions = [],
  searchQuery = '',
  onSearchChange,
  onResetSearch,
  onPrint,
  onOpenProof,
  onOpenHistory,
}) {
  const getValue = (transaction, keys, fallback = '-') => {
    for (const key of keys) {
      if (
        transaction?.[key] !== undefined &&
        transaction?.[key] !== null
      ) {
        return transaction[key];
      }
    }

    return fallback;
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Transaksi Terbaru
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Daftar transaksi yang tercatat di REDScan.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenHistory}
          className="inline-flex items-center gap-2 self-start text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          Lihat semua <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-5 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 px-3">
          <Search size={18} className="shrink-0 text-gray-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Cari transaksi..."
            className="w-full bg-transparent py-3 text-sm outline-none"
          />
        </div>

        <button
          type="button"
          onClick={onResetSearch}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          <RotateCw size={16} />
          Reset
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-4 font-semibold">ID Transaksi</th>
              <th className="px-5 py-4 font-semibold">Pelanggan</th>
              <th className="px-5 py-4 font-semibold">Waktu</th>
              <th className="px-5 py-4 font-semibold">Metode</th>
              <th className="px-5 py-4 font-semibold">Total</th>
              <th className="px-5 py-4 text-center font-semibold">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => {
                const id = getValue(
                  transaction,
                  [
                    'invoice',
                    'id',
                    'kodeTransaksi',
                    'kode_transaksi',
                    'transactionId',
                  ],
                  `TRX-${index + 1}`
                );

                const customer = getValue(
                  transaction,
                  [
                    'nama',
                    'pelanggan',
                    'namaPelanggan',
                    'nama_pelanggan',
                    'customer',
                  ]
                );

                return (
                  <tr
                    key={transaction.id ?? transaction.invoice ?? id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-800">
                      {id}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                      {getValue(transaction, [
                        'waktu',
                        'tanggal',
                        'created_at',
                        'createdAt',
                      ])}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {getValue(transaction, [
                        'metode',
                        'metodePembayaran',
                        'metode_pembayaran',
                        'paymentMethod',
                      ])}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-800">
                      {formatRupiah(
                        getValue(
                          transaction,
                          [
                            'total',
                            'totalHarga',
                            'total_harga',
                            'amount',
                          ],
                          0
                        )
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          title="Cetak struk"
                          aria-label={`Cetak struk ${id}`}
                          onClick={() => onPrint?.(transaction)}
                          className="relative z-10 cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <Printer size={17} />
                        </button>

                        <button
                          type="button"
                          title="Lihat bukti transaksi"
                          aria-label={`Lihat bukti transaksi ${id}`}
                          onClick={() => {
                            onOpenProof?.(transaction);
                          }}
                          className="relative z-10 cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  Tidak ada transaksi yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
        Menampilkan {transactions.length} transaksi.
      </div>
    </section>
  );
}
