
import { useEffect, useState } from 'react';
import {
  Pencil,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Trash2,
} from 'lucide-react';

const INITIAL_VISIBLE = 8;

function getStatusStyle(status) {
  switch (status) {
    case 'Habis':
      return 'bg-red-50 text-red-600';
    case 'Menipis':
      return 'bg-orange-50 text-orange-600';
    case 'Cukup':
      return 'bg-green-50 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export default function StockTable({
  filteredStock = [],
  totalStock = 0,
  onEdit,
  onDelete,
}) {
  const [showAll, setShowAll] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const visibleStock = showAll
    ? filteredStock
    : filteredStock.slice(0, INITIAL_VISIBLE);

  const hasMore = filteredStock.length > INITIAL_VISIBLE;

  // Reset tampilan jika jumlah data sudah 8 atau kurang.
  useEffect(() => {
    if (filteredStock.length <= INITIAL_VISIBLE) {
      setShowAll(false);
    }
  }, [filteredStock.length]);

  // Tutup menu atau modal ketika tombol Escape ditekan.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenMenuId(null);
        setDeleteItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggle = () => {
    setShowAll((prev) => !prev);
    setOpenMenuId(null);
  };

  const handleEdit = (item) => {
    setOpenMenuId(null);

    if (typeof onEdit === 'function') {
      onEdit(item);
    }
  };

  const handleOpenDelete = (item) => {
    setOpenMenuId(null);
    setDeleteItem(item);
  };

  const handleCancelDelete = () => {
    if (isDeleting) return;

    setDeleteItem(null);
  };

  const handleDelete = () => {
    if (!deleteItem || isDeleting) return;

    if (typeof onDelete !== 'function') {
      console.error(
        'Fungsi onDelete belum diteruskan dari Stok.jsx.'
      );
      return;
    }

    setIsDeleting(true);

    try {
      onDelete(deleteItem);

      setDeleteItem(null);
      setOpenMenuId(null);
    } catch (error) {
      console.error('Gagal menghapus bahan:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative w-full min-w-0 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-[850px] table-fixed text-left">
          <colgroup>
            <col className="w-[14%]" />
            <col className="w-[23%]" />
            <col className="w-[17%]" />
            <col className="w-[12%]" />
            <col className="w-[10%]" />
            <col className="w-[14%]" />
            <col className="w-[10%]" />
          </colgroup>

          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-4">Kode Bahan</th>
              <th className="px-5 py-4">Nama Bahan</th>
              <th className="px-5 py-4">Kategori</th>
              <th className="px-5 py-4">Sisa Stok</th>
              <th className="px-5 py-4">Satuan</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {visibleStock.length > 0 ? (
              visibleStock.map((item) => {
                // Baca status dari data yang tersimpan.
                const status =
                  item.status ||
                  (Number(item.stock) <= 0
                    ? 'Habis'
                    : Number(item.stock) <= 5
                      ? 'Menipis'
                      : 'Cukup');

                const statusStyle = getStatusStyle(status);
                const isMenuOpen = openMenuId === item.id;

                return (
                  <tr
                    key={item.id}
                    className="h-[65px] text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap px-5 py-4 font-medium text-gray-500">
                      {item.id}
                    </td>

                    <td
                      className="overflow-hidden text-ellipsis whitespace-nowrap px-5 py-4 font-medium text-gray-800"
                      title={item.name}
                    >
                      {item.name}
                    </td>

                    <td
                      className="overflow-hidden text-ellipsis whitespace-nowrap px-5 py-4"
                      title={item.category}
                    >
                      {item.category}
                    </td>

                    <td className="overflow-hidden text-ellipsis whitespace-nowrap px-5 py-4 font-semibold">
                      {item.stock}
                    </td>

                    <td className="overflow-hidden text-ellipsis whitespace-nowrap px-5 py-4">
                      {item.unit}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${statusStyle}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenuId((current) =>
                                current === item.id
                                  ? null
                                  : item.id
                              )
                            }
                            title="Lainnya"
                            aria-label={`Aksi untuk ${item.name}`}
                            aria-expanded={isMenuOpen}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                              isMenuOpen
                                ? 'bg-orange-50 text-orange-600'
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            <MoreHorizontal size={18} />
                          </button>

                          {isMenuOpen && (
                            <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
                              <button
                                type="button"
                                onClick={() => handleEdit(item)}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                              >
                                <Pencil size={16} />
                                <span>Edit Bahan</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenDelete(item)}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                                <span>Hapus Bahan</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  Tidak ada bahan yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Menampilkan {visibleStock.length} dari{' '}
          {filteredStock.length} bahan
          {filteredStock.length !== totalStock && (
            <span>
              {' '}(total seluruh bahan: {totalStock})
            </span>
          )}
        </p>

        {hasMore && (
          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center justify-center gap-2 self-start text-sm font-semibold text-orange-600 transition hover:text-orange-700 sm:self-auto"
          >
            {showAll
              ? 'Tampilkan Lebih Sedikit'
              : 'Lihat Selengkapnya'}

            {showAll ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        )}
      </div>

      {deleteItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCancelDelete();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-stock-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>

            <h3
              id="delete-stock-title"
              className="text-lg font-semibold text-gray-800"
            >
              Hapus Bahan?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Apakah kamu yakin ingin menghapus{' '}
              <span className="font-semibold text-gray-700">
                {deleteItem.name}
              </span>
              ? Data bahan ini akan dihapus dari daftar stok.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleCancelDelete}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
