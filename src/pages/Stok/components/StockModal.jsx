
import { Check, X } from 'lucide-react';

// Pilihan satuan bahan
const UNITS = [
  'kg',
  'gram',
  'mg',
  'liter',
  'ml',
  'pcs',
  'buah',
  'butir',
  'batang',
  'lembar',
  'pack',
  'sachet',
  'botol',
  'kaleng',
  'cup',
  'bungkus',
  'ikat',
  'porsi',
  'slice',
  'scoop',
  'sdm',
  'sdt',
  'ekor',
  'roll',
];

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

  // Mengirim perubahan input ke state utama di Stok.jsx
  const updateField = (field, value) => {
    onFormChange(field, value);
  };

  // Mencegah halaman refresh ketika form disimpan
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSaving) return;

    onSave();
  };

  const statuses = ['Cukup', 'Menipis', 'Habis'];

  // Mempertahankan satuan lama jika belum tersedia di daftar pilihan
  const currentUnit = formData.unit ?? '';

  const availableUnits = currentUnit &&
    !UNITS.some(
      (unit) => unit.toLowerCase() === currentUnit.toLowerCase()
    )
      ? [currentUnit, ...UNITS]
      : UNITS;

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none transition-colors focus:border-[#231B17] disabled:cursor-not-allowed disabled:bg-gray-100';

  const labelClass =
    'mb-1 block text-[11px] font-bold text-gray-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl">

        {/* Header */}
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-3"
        >

          {/* Kode Bahan */}
          <div>
            <label className={labelClass}>
              Kode Bahan
            </label>

            <input
              type="text"
              required
              value={formData.kodeBahan ?? ''}
              onChange={(e) =>
                updateField('kodeBahan', e.target.value)
              }
              placeholder="Contoh: BHN001"
              className={inputClass}
            />
          </div>

          {/* Nama Bahan */}
          <div>
            <label className={labelClass}>
              Nama Bahan
            </label>

            <input
              type="text"
              required
              value={formData.name ?? ''}
              onChange={(e) =>
                updateField('name', e.target.value)
              }
              placeholder="Contoh: Susu UHT"
              className={inputClass}
            />
          </div>

          {/* Kategori dan Satuan */}
          <div className="grid grid-cols-2 gap-3">

            <div className="min-w-0">
              <label className={labelClass}>
                Kategori
              </label>

              <select
                required
                value={formData.category ?? 'Lainnya'}
                onChange={(e) =>
                  updateField('category', e.target.value)
                }
                className={inputClass}
              >
                {categories
                  .filter(
                    (category) => category !== 'Semua Bahan'
                  )
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>

            <div className="min-w-0">
              <label className={labelClass}>
                Satuan
              </label>

              <select
                required
                value={currentUnit}
                onChange={(e) =>
                  updateField('unit', e.target.value)
                }
                className={inputClass}
              >
                <option value="" disabled>
                  Pilih satuan
                </option>

                {availableUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Jumlah Stok */}
          <div>
            <label className={labelClass}>
              {editItem
                ? 'Jumlah Stok Saat Ini'
                : 'Jumlah Stok Awal'}
            </label>

            <input
              type="number"
              min="0"
              step="any"
              required
              value={formData.stock ?? ''}
              onChange={(e) =>
                updateField('stock', e.target.value)
              }
              placeholder="Masukkan jumlah stok"
              className={inputClass}
            />

            {editItem && (
              <p className="mt-1 text-[10px] text-gray-400">
                Jumlah stok dapat diubah dan akan disimpan ke database.
              </p>
            )}
          </div>

          {/* Stok Minimum */}
          <div>
            <label className={labelClass}>
              Batas Minimum Stok
            </label>

            <input
              type="number"
              min="0"
              step="any"
              required
              value={formData.minStock ?? ''}
              onChange={(e) =>
                updateField('minStock', e.target.value)
              }
              placeholder="Contoh: 5"
              className={inputClass}
            />
          </div>

          {/* Status Stok */}
          <div>
            <label className={labelClass}>
              Status Stok
            </label>

            <select
              required
              value={formData.status || 'Cukup'}
              onChange={(e) =>
                updateField('status', e.target.value)
              }
              className={inputClass}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Tombol */}
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
                {isSaving
                  ? 'Menyimpan...'
                  : 'Simpan'}
              </span>
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
