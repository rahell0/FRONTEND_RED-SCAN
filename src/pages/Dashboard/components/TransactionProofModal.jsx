
import { CheckCircle2, X } from 'lucide-react';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function TransactionProofModal({
  isOpen,
  transaction,
  onClose,
}) {
  if (!isOpen || !transaction) return null;

  const details = [
    {
      label: 'ID Transaksi',
      value:
        transaction.invoice ??
        transaction.id ??
        transaction.kodeTransaksi ??
        transaction.kode_transaksi ??
        '-',
    },
    {
      label: 'Pelanggan',
      value:
        transaction.nama ??
        transaction.pelanggan ??
        transaction.namaPelanggan ??
        transaction.nama_pelanggan ??
        transaction.customer ??
        '-',
    },
    {
      label: 'Waktu Transaksi',
      value:
        transaction.waktu ??
        transaction.tanggal ??
        transaction.created_at ??
        transaction.createdAt ??
        '-',
    },
    {
      label: 'Detail Pesanan',
      value: transaction.detail ?? '-',
    },
    {
      label: 'Metode Pembayaran',
      value:
        transaction.metode ??
        transaction.metodePembayaran ??
        transaction.metode_pembayaran ??
        '-',
    },
    {
      label: 'Status',
      value: transaction.status ?? 'Selesai',
    },
  ];

  const total =
    transaction.total ??
    transaction.totalHarga ??
    transaction.total_harga ??
    transaction.amount ??
    0;

  const items = Array.isArray(transaction.items)
    ? transaction.items
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-proof-title"
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h2
              id="transaction-proof-title"
              className="text-lg font-bold text-gray-800"
            >
              Bukti Transaksi
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Detail transaksi REDScan
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Tutup modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex flex-col items-center rounded-xl bg-emerald-50 p-5">
            <CheckCircle2
              size={40}
              className="text-emerald-600"
            />

            <p className="mt-3 text-sm text-emerald-700">
              Transaksi tercatat
            </p>

            <h3 className="mt-1 text-2xl font-bold text-gray-800">
              {formatRupiah(total)}
            </h3>
          </div>

          <div className="space-y-4">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between gap-4 text-sm"
              >
                <span className="text-gray-500">
                  {item.label}
                </span>

                <span className="max-w-[60%] break-words text-right font-medium text-gray-800">
                  {String(item.value)}
                </span>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="mt-6 border-t border-gray-100 pt-5">
              <h3 className="mb-4 font-semibold text-gray-800">
                Rincian Item
              </h3>

              <div className="space-y-3">
                {items.map((item, index) => {
                  const name =
                    item.name ?? item.nama ?? item.nama_produk ?? 'Produk';

                  const qty = Number(item.qty ?? item.jumlah ?? 1);
                  const price = Number(item.price ?? item.harga ?? 0);

                  return (
                    <div
                      key={`${name}-${index}`}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {name}
                        </p>
                        <p className="mt-1 text-gray-500">
                          {qty} × {formatRupiah(price)}
                        </p>
                      </div>

                      <span className="whitespace-nowrap font-medium text-gray-800">
                        {formatRupiah(qty * price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gray-100 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
