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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl">

        {/* HEADER MODAL */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-3">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-[#1F1915]">
              Edit Pesanan #{selectedOrder.invoice || selectedOrder.id}
            </h3>

            <p className="mt-1 truncate text-[11px] text-gray-600">
              Pelanggan: {selectedOrder.customer || '-'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-lg bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* INFORMASI PESANAN */}
        <div className="mt-4 rounded-xl border border-gray-200 bg-[#F7F6F2] p-3">
          <div className="flex justify-between gap-3 text-xs">
            <span className="text-gray-600">
              Total Pembayaran
            </span>

            <span className="font-bold text-[#231B17]">
              Rp {Number(selectedOrder.totalAmount || 0).toLocaleString('id-ID')}
            </span>
          </div>

          <div className="mt-2 flex justify-between gap-3 text-xs">
            <span className="text-gray-600">
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
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-700">
              Status Pesanan
            </label>

            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map((option) => {
                const isActive = formData.status === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      onFormChange((prev) => ({
                        ...prev,
                        status: option.value,
                      }))
                    }
                    className={`flex min-h-[44px] cursor-pointer items-center justify-center gap-1 rounded-xl border px-3 py-3 text-xs font-bold transition-all ${
                      isActive
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-gray-300 bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {option.label}

                    {isActive && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FOOTER MODAL */}
          <div className="mt-1 flex justify-end gap-2 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Batal
            </button>

            <button
              type="submit"
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-black px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-gray-800"
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
