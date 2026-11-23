
import { useEffect, useState } from 'react';
import {
  Pencil,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ClipboardList,
} from 'lucide-react';

const ITEMS_PER_PAGE = 8;

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export default function MenuTable({
  filteredMenu = [],
  totalMenu = 0,
  onEdit,
  onDelete,
  onManageRecipe,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMenu.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const visibleMenu = filteredMenu.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const startNumber = filteredMenu.length === 0 ? 0 : startIndex + 1;
  const endNumber = Math.min(
    startIndex + ITEMS_PER_PAGE,
    filteredMenu.length
  );

  // Kembali ke halaman pertama ketika pencarian atau kategori berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredMenu]);

  // Menyesuaikan halaman jika jumlah menu berkurang setelah dihapus
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenMenuId(null);
        setDeleteItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEdit = (item) => {
    setOpenMenuId(null);
    onEdit?.(item);
  };

  const handleManageRecipe = (item) => {
    setOpenMenuId(null);
    onManageRecipe?.(item);
  };

  const handleDelete = async () => {
    if (!deleteItem || isDeleting) return;

    try {
      setIsDeleting(true);
      await onDelete(deleteItem);
      setDeleteItem(null);
      setOpenMenuId(null);
    } catch (error) {
      console.error('Gagal menghapus menu:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative w-full min-w-0 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-[850px] table-fixed text-left">
          <colgroup>
            <col className="w-[8%]" />
            <col className="w-[22%]" />
            <col className="w-[16%]" />
            <col className="w-[15%]" />
            <col className="w-[27%]" />
            <col className="w-[12%]" />
          </colgroup>

          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-4 py-4">No.</th>
              <th className="px-4 py-4">Nama Menu</th>
              <th className="px-4 py-4">Kategori</th>
              <th className="px-4 py-4">Harga</th>
              <th className="px-4 py-4">Deskripsi</th>
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {visibleMenu.length > 0 ? (
              visibleMenu.map((item, index) => (
                <tr
                  key={item.id}
                  className="h-[75px] text-sm text-gray-700 hover:bg-gray-50"
                >
                  {/* NOMOR URUT TAMPILAN */}
                  <td className="px-4 py-4 font-medium text-gray-500">
                    {startIndex + index + 1}
                  </td>

                  <td className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-4 font-semibold text-gray-800">
                    {item.nama_menu}
                  </td>

                  <td className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-4">
                    {item.kategori}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 font-medium">
                    {formatRupiah(item.harga)}
                  </td>

                  <td
                    className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-4 text-gray-500"
                    title={item.deskripsi || '-'}
                  >
                    {item.deskripsi || '-'}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((current) =>
                              current === item.id ? null : item.id
                            )
                          }
                          title="Lainnya"
                          aria-label={`Aksi untuk ${item.nama_menu}`}
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                            openMenuId === item.id
                              ? 'bg-orange-50 text-orange-600'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenuId === item.id && (
                          <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
                            <button
                              type="button"
                              onClick={() => handleEdit(item)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                            >
                              <Pencil size={16} />
                              Edit Menu
                            </button>

                            <button
                              type="button"
                              onClick={() => handleManageRecipe(item)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <ClipboardList size={16} />
                              Atur Resep
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                setDeleteItem(item);
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                              Hapus Menu
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  Tidak ada menu yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Menampilkan {startNumber}-{endNumber} dari {filteredMenu.length} menu
          {filteredMenu.length !== totalMenu && (
            <span> (total seluruh menu: {totalMenu})</span>
          )}
        </p>

        {totalPages > 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                    currentPage === page
                      ? 'bg-[#402719] text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Halaman selanjutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* MODAL KONFIRMASI HAPUS */}
      {deleteItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !isDeleting
            ) {
              setDeleteItem(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              Hapus Menu?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Apakah kamu yakin ingin menghapus{' '}
              <span className="font-semibold text-gray-700">
                {deleteItem.nama_menu}
              </span>
              ? Data menu ini akan dihapus dari daftar.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteItem(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
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
