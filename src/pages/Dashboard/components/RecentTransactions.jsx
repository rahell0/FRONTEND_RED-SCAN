
import { useEffect, useState } from 'react';
import {
  Search,
  RotateCw,
  Printer,
  Eye,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const formatWaktu = (value) => {
  if (!value) return '-';

  const date = new Date(
    typeof value === 'string' && value.includes(' ')
      ? value.replace(' ', 'T')
      : value
  );

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

export default function RecentTransactions({
  transactions = [],
  searchQuery = '',
  onSearchChange,
  onResetSearch,
  onPrint,
  onOpenProof,
  onOpenHistory,
}) {
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.max(
    1,
    Math.ceil(transactions.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const visibleTransactions = transactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startNumber =
    transactions.length === 0 ? 0 : startIndex + 1;

  const endNumber = Math.min(
    startIndex + ITEMS_PER_PAGE,
    transactions.length
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
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
          Lihat semua
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Search */}
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
          onClick={() => {
            onResetSearch?.();
            setCurrentPage(1);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          <RotateCw size={16} />
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] table-fixed text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="w-[23%] px-5 py-4 font-semibold">
                Pelanggan
              </th>

              <th className="w-[23%] px-5 py-4 font-semibold">
                Waktu
              </th>

              <th className="w-[18%] px-5 py-4 font-semibold">
                Metode
              </th>

              <th className="w-[21%] px-5 py-4 font-semibold">
                Total
              </th>

              <th className="w-[15%] px-5 py-4 text-center font-semibold">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {visibleTransactions.length > 0 ? (
              visibleTransactions.map((transaction, index) => {
                const id = getValue(
                  transaction,
                  [
                    'invoice',
                    'id',
                    'kodeTransaksi',
                    'kode_transaksi',
                    'transactionId',
                  ],
                  `TRX-${startIndex + index + 1}`
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

                const waktu = getValue(transaction, [
                  'waktu',
                  'tanggal',
                  'created_at',
                  'createdAt',
                ]);

                return (
                  <tr
                    key={transaction.id ?? transaction.invoice ?? id}
                    className="h-[65px] transition hover:bg-gray-50"
                  >
                    <td className="truncate px-5 py-4 text-gray-600">
                      {customer}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                      {formatWaktu(waktu)}
                    </td>

                    <td className="truncate px-5 py-4 text-gray-600">
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
                          onClick={() => onOpenProof?.(transaction)}
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
              <tr className="h-[65px]">
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  Tidak ada transaksi yang ditemukan.
                </td>
              </tr>
            )}

            {/* Menjaga tinggi tabel tetap sama pada halaman terakhir */}
            {visibleTransactions.length > 0 &&
              visibleTransactions.length < ITEMS_PER_PAGE &&
              Array.from({
                length: ITEMS_PER_PAGE - visibleTransactions.length,
              }).map((_, index) => (
                <tr key={`empty-${index}`} className="h-[65px]">
                  <td colSpan={5} className="px-5 py-4">
                    &nbsp;
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-400">
          Menampilkan {startNumber}-{endNumber} dari{' '}
          {transactions.length} transaksi.
        </p>

        {transactions.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-center gap-1">
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={currentPage === 1}
              aria-label="Halaman sebelumnya"
              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`min-w-9 rounded-lg px-3 py-2 text-sm transition ${
                  currentPage === page
                    ? 'bg-emerald-600 font-semibold text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              disabled={currentPage === totalPages}
              aria-label="Halaman berikutnya"
              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
