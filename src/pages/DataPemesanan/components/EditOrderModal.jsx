
import { Check, X } from 'lucide-react';

export default function EditOrderModal({
  selectedOrder,
  formData,
  onFormChange,
  onSave,
  onClose,
}) {
  if (!selectedOrder) return null;

  const statusOptions = [
    { value: 'antre', label: 'Antre' },
    { value: 'menunggu', label: 'Menunggu Pembayaran' },
    { value: 'diproses', label: 'Diproses' },
    { value: 'selesai', label: 'Selesai' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">

      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl">

        {/* HEADER MODAL */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">

          <div className="min-w-0">
            <h3 className="text-base font-bold text-[#1F1915]">
              Edit Pesanan #{selectedOrder.invoice || selectedOrder.id}
            </h3>

            <p className="mt-1 truncate text-[11px] text-gray-500">
              Pelanggan: {selectedOrder.customer || '-'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>

        </div>

        {/* INFORMASI PESANAN */}
        <div className="mt-4 rounded-xl bg-[#F7F6F2] p-3">

          <div className="flex justify-between gap-3 text-xs">
            <span className="text-gray-500">
              Total Pembayaran
            </span>

            <span className="font-bold text-[#231B17]">
              Rp {Number(selectedOrder.totalAmount || 0).toLocaleString('id-ID')}
            </span>
          </div>

          <div className="mt-2 flex justify-between gap-3 text-xs">
            <span className="text-gray-500">
              Metode Pembayaran
            </span>

            <span className="font-semibold text-[#231B17]">
              {String(selectedOrder.method || '-').toUpperCase()}
            </span>
          </div>

        </div>

        {/* FORM */}
        <form onSubmit={onSave} className="mt-4 flex flex-col gap-4">

          {/* STATUS PESANAN */}
          <div className="flex flex-col gap-1.5">

            <label className="block text-[11px] font-bold text-gray-600">
              Status Pesanan
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                onFormChange((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-bold text-[#1F1915] outline-none transition-colors focus:border-[#231B17]"
              required
            >
              {statusOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

          </div>

          {/* FOOTER MODAL */}
          <div className="mt-1 flex justify-end gap-2 border-t border-gray-100 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-50"
            >
              Batal
            </button>

            <button
              type="submit"
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#231B17] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#3B2E28]"
            >
              <Check size={14} />
              <span>Simpan Perubahan</span>
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
