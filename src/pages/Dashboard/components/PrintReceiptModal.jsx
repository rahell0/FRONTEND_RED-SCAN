
import { useRef } from 'react';
import { Printer, X } from 'lucide-react';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function PrintReceiptModal({
  isOpen = false,
  transaction,
  onClose,
}) {
  const receiptRef = useRef(null);

  if (!isOpen || !transaction) return null;

  const id =
    transaction.id ??
    transaction.invoice ??
    transaction.kodeTransaksi ??
    transaction.kode_transaksi ??
    '-';

  const customer =
    transaction.pelanggan ??
    transaction.nama ??
    transaction.namaPelanggan ??
    transaction.nama_pelanggan ??
    transaction.customer ??
    '-';

  const method =
    transaction.metode ??
    transaction.metodePembayaran ??
    transaction.metode_pembayaran ??
    transaction.paymentMethod ??
    '-';

  const total =
    transaction.total ??
    transaction.totalHarga ??
    transaction.total_harga ??
    transaction.amount ??
    0;

  const handlePrint = () => {
    const content = receiptRef.current;

    if (!content) return;

    const printWindow = window.open(
      '',
      '_blank',
      'width=400,height=600'
    );

    if (!printWindow) {
      window.alert(
        'Jendela cetak tidak dapat dibuka. Periksa pengaturan pop-up browser.'
      );
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Struk ${String(id)}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 24px;
              color: #222;
            }
            h2, p { text-align: center; }
            .line {
              border-top: 1px dashed #888;
              margin: 16px 0;
            }
            .row {
              display: flex;
              justify-content: space-between;
              gap: 16px;
              margin: 10px 0;
            }
            .total { font-weight: bold; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          <\/script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h2 className="text-lg font-bold text-gray-800">
            Cetak Struk
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Tutup modal"
          >
            <X size={20} />
          </button>
        </div>

        <div ref={receiptRef} className="p-6">
          <h2 className="text-center text-xl font-bold">
            REDScan
          </h2>

          <p className="mt-1 text-center text-sm text-gray-500">
            Bukti Transaksi
          </p>

          <div className="my-5 border-t border-dashed border-gray-300" />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span>ID Transaksi</span>
              <span className="text-right font-medium">{id}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Pelanggan</span>
              <span className="text-right">{customer}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Waktu</span>
              <span className="text-right">
                {transaction.waktu ?? transaction.tanggal ?? '-'}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Metode Pembayaran</span>
              <span className="text-right">{method}</span>
            </div>
          </div>

          <div className="my-5 border-t border-dashed border-gray-300" />

          <div className="flex justify-between gap-4 font-bold">
            <span>Total</span>
            <span>{formatRupiah(total)}</span>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            Terima kasih telah bertransaksi.
          </p>
        </div>

        <div className="border-t border-gray-100 p-5">
          <button
            type="button"
            onClick={handlePrint}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-700"
          >
            <Printer size={18} />
            Cetak Struk
          </button>
        </div>
      </div>
    </div>
  );
}
