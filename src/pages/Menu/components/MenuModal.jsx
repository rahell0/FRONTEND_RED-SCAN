
import { Check, X, ImagePlus, Upload } from 'lucide-react';

export default function MenuModal({
  isOpen,
  editItem,
  formData,
  categories,
  onFormChange,
  onImageChange,
  imagePreview,
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

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Format gambar harus JPG, JPEG, PNG, atau WEBP.');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 5 MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      onImageChange(file, reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
          <h3 className="text-base font-bold text-[#1F1915]">
            {editItem ? 'Edit Menu' : 'Tambah Menu Baru'}
          </h3>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSave} className="mt-4 flex flex-col gap-3">

          {/* NAMA MENU */}
          <div>
            <label className="mb-1 block text-[11px] font-bold text-gray-600">
              Nama Menu
            </label>

            <input
              type="text"
              required
              value={formData.nama_menu}
              onChange={(e) => updateField('nama_menu', e.target.value)}
              placeholder="Contoh: Chocolate Cake"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#231B17]"
            />
          </div>

          {/* KATEGORI DAN HARGA */}
          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <label className="mb-1 block text-[11px] font-bold text-gray-600">
                Kategori
              </label>

              <select
                required
                value={formData.kategori}
                onChange={(e) => updateField('kategori', e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#231B17]"
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
                Harga (Rp)
              </label>

              <input
                type="number"
                min="0"
                required
                value={formData.harga}
                onChange={(e) => updateField('harga', e.target.value)}
                placeholder="25000"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#231B17]"
              />
            </div>
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="mb-1 block text-[11px] font-bold text-gray-600">
              Deskripsi
            </label>

            <textarea
              rows={3}
              value={formData.deskripsi}
              onChange={(e) => updateField('deskripsi', e.target.value)}
              placeholder="Masukkan deskripsi menu..."
              className="w-full resize-y rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#231B17]"
            />
          </div>

          {/* UPLOAD GAMBAR */}
          <div>
            <label className="mb-2 block text-[11px] font-bold text-gray-600">
              Gambar Menu
            </label>

            {/* PREVIEW GAMBAR */}
            <div className="mb-3 flex min-h-36 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview gambar menu"
                  className="max-h-48 w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-6 text-gray-400">
                  <ImagePlus size={32} />
                  <p className="text-xs">
                    Belum ada gambar dipilih
                  </p>
                </div>
              )}
            </div>

            {/* INPUT FILE */}
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-xs font-semibold text-[#402719] transition hover:bg-gray-50">
              <Upload size={16} />
              Pilih Gambar dari Komputer

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageSelect}
                disabled={isSaving}
                className="hidden"
              />
            </label>

            <p className="mt-2 text-[10px] text-gray-400">
              Format JPG, JPEG, PNG, atau WEBP. Maksimal 5 MB.
            </p>

            {editItem && (
              <p className="mt-1 text-[10px] text-gray-400">
                Jika tidak memilih gambar baru, gambar sebelumnya tetap digunakan.
              </p>
            )}
          </div>

          {/* TOMBOL */}
          <div className="mt-3 flex justify-end gap-2 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-xl bg-[#231B17] px-4 py-2 text-xs font-bold text-white hover:bg-[#3B2E28] disabled:opacity-60"
            >
              <Check size={14} />
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
