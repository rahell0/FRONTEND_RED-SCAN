import { Check, X } from 'lucide-react';

export default function StockModal({
  isOpen,
  editItem,
  formData,
  categories,
  onFormChange,
  onSave,
  onClose,
  isSaving = false,
}) {
  if (!isOpen) return null;

  const updateField = (field, value) => {
    onFormChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
          <h3 className="text-base font-bold text-[#1F1915]">
            {editItem ? 'Edit Stok Bahan' : 'Tambah Bahan Baru'}
          </h3>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="shrink-0 cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSave} className="mt-4 flex flex-col gap-3">
          {/* Kode Bahan */}
          <div>
            <label className="mb-1 block text-[11px] font-bold text-gray-600">
              Kode Bahan
            </label>

            <input
              type="text"
              required
              value={formData.kodeBahan}
              onChange={(e) =>
                updateField('kodeBahan', e.target.value)
              }
              placeholder="Contoh: BHN001"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none transition-colors focus:border-[#231B17]"
            />
          </div>

          {/* Nama Bahan */}
          <div>
            <label className="mb-1 block text-[11px] font-bold text-gray-600">
              Nama Bahan
            </label>

            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                updateField('name', e.target.value)
              }
              placeholder="Contoh: Susu UHT"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none transition-colors focus:border-[#231B17]"
            />
          </div>

          {/* Kategori dan Satuan */}
          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <label className="mb-1 block text-[11px] font-bold text-gray-600">
                Kategori
              </label>

              <select
                required
                value={formData.category}
                onChange={(e) =>
                  updateField('category', e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none transition-colors focus:border-[#231B17]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label className="mb-1 block text-[11px] font-bold text-gray-600">
                Satuan
              </label>

              <input
                type="text"
                required
                value={formData.unit}
                onChange={(e) =>
                  updateField('unit', e.target.value)
                }
                placeholder="kg / liter / pack"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none transition-colors focus:border-[#231B17]"
              />
            </div>
          </div>

          {/* Jumlah Stok */}
          <div>
            <label className="mb-1 block text-[11px] font-bold text-gray-600">
              {editItem ? 'Jumlah Stok Saat Ini' : 'Jumlah Stok Awal'}
            </label>

            <input
              type="number"
              min="0"
              step="any"
              required
              disabled={Boolean(editItem)}
              value={formData.stock}
              onChange={(e) =>
                updateField('stock', e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none transition-colors focus:border-[#231B17] disabled:bg-gray-100 disabled:text-gray-500"
            />

            {editItem && (
              <p className="mt-1 text-[10px] text-gray-400">
                Untuk mengubah jumlah stok, gunakan fitur stok masuk atau keluar.
              </p>
            )}
          </div>

          {/* Stok Minimum */}
          <div>
            <label className="mb-1 block text-[11px] font-bold text-gray-600">
              Batas Minimum Stok
            </label>

            <input
              type="number"
              min="0"
              step="any"
              required
              value={formData.minStock}
              onChange={(e) =>
                updateField('minStock', e.target.value)
              }
              placeholder="Contoh: 5"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none transition-colors focus:border-[#231B17]"
            />
          </div>

          <div className="mt-3 flex justify-end gap-2 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="cursor-pointer rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#231B17] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#3B2E28] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Check size={14} />
              <span>
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}