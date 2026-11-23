
import { useEffect, useState } from 'react';
import { useNotification } from '../../../context/NotificationContext';

export default function RecipeModal({
  isOpen,
  menu,
  bahan = [],
  resepAwal = [],
  isLoading,
  isSaving,
  onClose,
  onSave,
}) {
  const { notify } = useNotification();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    if (resepAwal.length > 0) {
      setItems(
        resepAwal.map((item) => ({
          bahan_id: String(item.bahan_id),
          jumlah_pemakaian: String(item.jumlah_pemakaian),
        }))
      );
    } else {
      setItems([
        {
          bahan_id: '',
          jumlah_pemakaian: '',
        },
      ]);
    }
  }, [isOpen, resepAwal]);

  if (!isOpen) return null;

  const handleChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        bahan_id: '',
        jumlah_pemakaian: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    if (items.length <= 1) return;

    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      notify(
        'Tambahkan minimal satu bahan untuk resep menu.',
        'warning',
        'Resep Belum Lengkap'
      );
      return;
    }

    const validItems = items.map((item) => ({
      bahan_id: Number(item.bahan_id),
      jumlah_pemakaian: Number(item.jumlah_pemakaian),
    }));

    const hasInvalidItem = validItems.some(
      (item) =>
        !Number.isInteger(item.bahan_id) ||
        item.bahan_id <= 0 ||
        !Number.isFinite(item.jumlah_pemakaian) ||
        item.jumlah_pemakaian <= 0
    );

    if (hasInvalidItem) {
      notify(
        'Pilih bahan baku dan isi jumlah pemakaian lebih dari nol.',
        'warning',
        'Data Resep Tidak Valid'
      );
      return;
    }

    const ids = validItems.map((item) => item.bahan_id);

    if (new Set(ids).size !== ids.length) {
      notify(
        'Setiap bahan hanya boleh dimasukkan satu kali. Silakan gabungkan jumlah pemakaiannya.',
        'warning',
        'Bahan Duplikat'
      );
      return;
    }

    const unavailableMaterial = validItems.some((item) =>
      !bahan.some((b) => Number(b.id) === item.bahan_id)
    );

    if (unavailableMaterial) {
      notify(
        'Ada bahan yang sudah tidak tersedia. Periksa kembali pilihan bahan.',
        'warning',
        'Bahan Tidak Ditemukan'
      );
      return;
    }

    onSave(validItems);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-lg font-bold text-[#402719]">
              Atur Resep Menu
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {menu?.nama_menu || 'Menu'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="text-2xl text-gray-400 hover:text-gray-700 disabled:opacity-50"
          >
            &times;
          </button>
        </div>

        {/* KONTEN */}
        <div className="max-h-[65vh] space-y-4 overflow-y-auto p-5">

          <div className="rounded-xl border border-[#E6E1DA] bg-[#F7F6F2] p-4">
            <p className="text-sm font-semibold text-[#402719]">
              Petunjuk pengaturan resep
            </p>

            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Masukkan kebutuhan setiap bahan untuk membuat
              <strong> 1 porsi </strong>
              menu. Satuan akan mengikuti satuan yang digunakan
              pada halaman Stok.
            </p>
          </div>

          {isLoading ? (
            <p className="py-8 text-center text-sm text-gray-500">
              Memuat data resep...
            </p>
          ) : bahan.length === 0 ? (
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm font-semibold text-yellow-800">
                Belum Ada Bahan Baku
              </p>

              <p className="mt-1 text-xs text-yellow-700">
                Tambahkan bahan baku terlebih dahulu melalui
                halaman Stok sebelum mengatur resep menu.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    Daftar Bahan Resep
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {items.length} baris bahan
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => {
                  const selected = bahan.find(
                    (b) =>
                      Number(b.id) === Number(item.bahan_id)
                  );

                  const currentStock = Number(
                    selected?.jumlah_stok || 0
                  );

                  const usedIds = items
                    .filter((_, i) => i !== index)
                    .map((other) => Number(other.bahan_id))
                    .filter(Boolean);

                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-200 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                          Bahan {index + 1}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleRemove(index)}
                          disabled={items.length === 1 || isSaving}
                          className="rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          Hapus
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        {/* PILIH BAHAN */}
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                            Bahan Baku
                          </label>

                          <select
                            value={item.bahan_id}
                            disabled={isSaving}
                            onChange={(e) =>
                              handleChange(
                                index,
                                'bahan_id',
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#402719] disabled:bg-gray-100"
                          >
                            <option value="">
                              Pilih bahan baku
                            </option>

                            {bahan.map((b) => {
                              const isUsed =
                                usedIds.includes(Number(b.id));

                              return (
                                <option
                                  key={b.id}
                                  value={b.id}
                                  disabled={isUsed}
                                >
                                  {b.nama_bahan}
                                  {isUsed ? ' (Sudah dipilih)' : ''}
                                </option>
                              );
                            })}
                          </select>

                          {selected && (
                            <div className="mt-2 rounded-lg bg-gray-50 p-2.5">
                              <p className="text-xs text-gray-500">
                                Stok tersedia
                              </p>

                              <p
                                className={`mt-0.5 text-sm font-bold ${
                                  currentStock <= 0
                                    ? 'text-red-600'
                                    : currentStock <= Number(
                                        selected.stok_minimum || 0
                                      )
                                      ? 'text-orange-600'
                                      : 'text-green-700'
                                }`}
                              >
                                {currentStock.toLocaleString('id-ID', {
                                  maximumFractionDigits: 3,
                                })}{' '}
                                {selected.satuan}
                              </p>

                              {currentStock <= 0 && (
                                <p className="mt-1 text-xs text-red-600">
                                  Stok bahan sedang habis.
                                </p>
                              )}

                              {currentStock > 0 &&
                                currentStock <= Number(
                                  selected.stok_minimum || 0
                                ) && (
                                  <p className="mt-1 text-xs text-orange-600">
                                    Stok bahan perlu diperhatikan.
                                  </p>
                                )}
                            </div>
                          )}
                        </div>

                        {/* JUMLAH PEMAKAIAN */}
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                            Pemakaian per Porsi
                          </label>

                          <div className="flex">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={item.jumlah_pemakaian}
                              disabled={isSaving}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  'jumlah_pemakaian',
                                  e.target.value
                                )
                              }
                              placeholder="Contoh: 0.2"
                              className="w-full min-w-0 rounded-l-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#402719] disabled:bg-gray-100"
                            />

                            <span className="flex min-w-[65px] items-center justify-center rounded-r-lg border border-l-0 border-gray-200 bg-gray-50 px-3 text-xs font-medium text-gray-500">
                              {selected?.satuan || '-'}
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-gray-400">
                            Jumlah bahan yang digunakan untuk
                            satu menu.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={isSaving || items.length >= bahan.length}
                className="w-full rounded-lg border border-dashed border-[#402719] px-4 py-3 text-sm font-semibold text-[#402719] transition hover:bg-[#402719]/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                + Tambah Bahan
              </button>

              <p className="text-xs text-gray-400">
                Setiap bahan hanya dapat dimasukkan satu kali
                dalam satu resep.
              </p>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t p-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              isSaving ||
              bahan.length === 0
            }
            className="rounded-lg bg-[#402719] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2F1D13] disabled:opacity-50"
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Resep'}
          </button>
        </div>
      </div>
    </div>
  );
}
