
import { Pencil, MoreHorizontal } from 'lucide-react';

export default function OrdersTable({
  filteredOrders = [],
  totalOrders = 0,
  onEdit,
}) {
  // Format status agar tampil rapi
  const formatStatus = (status) => {
    const normalized = String(status || '').toLowerCase();

    switch (normalized) {
      case 'antre':
        return 'Antre';
      case 'menunggu':
      case 'pending':
      case 'menunggu pembayaran':
        return 'Menunggu Pembayaran';
      case 'diproses':
        return 'Diproses';
      case 'selesai':
        return 'Selesai';
      default:
        return status || '-';
    }
  };

  // Warna badge status
  const getStatusBadge = (status) => {
    const normalized = String(status || '').toLowerCase();

    switch (normalized) {
      case 'selesai':
        return 'border-emerald-200 bg-emerald-100 text-emerald-700';

      case 'diproses':
        return 'border-amber-200 bg-amber-100 text-amber-700';

      case 'antre':
        return 'border-blue-200 bg-blue-100 text-blue-700';

      case 'menunggu':
      case 'pending':
      case 'menunggu pembayaran':
        return 'border-rose-200 bg-rose-100 text-rose-700';

      default:
        return 'border-gray-200 bg-gray-100 text-gray-700';
    }
  };

  // Format rupiah
  const formatRupiah = (amount) => {
    return `Rp ${Number(amount || 0).toLocaleString('id-ID')}`;
  };

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E2DBD0] bg-white shadow-xs">

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">

          <thead className="bg-[#8B9EA8] text-[#1E293B]">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-[9px] font-extrabold tracking-wider">
                ID PESANAN
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-[9px] font-extrabold tracking-wider">
                NAMA PELANGGAN
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-[9px] font-extrabold tracking-wider">
                JAM
              </th>

              <th className="min-w-48 px-4 py-3 text-[9px] font-extrabold tracking-wider">
                ITEM PESANAN
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-[9px] font-extrabold tracking-wider">
                TOTAL
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-[9px] font-extrabold tracking-wider">
                METODE
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-center text-[9px] font-extrabold tracking-wider">
                STATUS
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-center text-[9px] font-extrabold tracking-wider">
                AKSI
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {filteredOrders.length > 0 ? (
              filteredOrders.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  {/* ID PESANAN */}
                  <td className="whitespace-nowrap px-4 py-3 text-xs font-bold text-slate-800">
                    {item.invoice || item.id}
                  </td>

                  {/* NAMA PELANGGAN */}
                  <td className="px-4 py-3 text-xs font-semibold text-slate-900">
                    {item.customer || '-'}
                  </td>

                  {/* JAM */}
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                    {item.time || '-'}
                  </td>

                  {/* ITEM PESANAN */}
                  <td className="px-4 py-3 text-xs leading-relaxed text-slate-600">
                    {item.items?.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {item.items.map((it, idx) => (
                          <div key={`${item.id}-${idx}`}>
                            <span className="font-semibold text-slate-500">
                              {it.qty}x
                            </span>{' '}
                            {it.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="italic text-gray-400">
                        Detail produk belum tersedia
                      </span>
                    )}
                  </td>

                  {/* TOTAL */}
                  <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-slate-700">
                    {formatRupiah(item.totalAmount)}
                  </td>

                  {/* METODE PEMBAYARAN */}
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">
                    {String(item.method || '-').toUpperCase()}
                  </td>

                  {/* STATUS */}
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-[10px] font-bold ${getStatusBadge(item.status)}`}
                    >
                      <span className="mr-1">•</span>
                      {formatStatus(item.status)}
                    </span>
                  </td>

                  {/* AKSI */}
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">

                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="cursor-pointer rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100"
                        title="Edit Status Pesanan"
                        aria-label={`Edit pesanan ${item.id}`}
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        type="button"
                        className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100"
                        title="Opsi lainnya"
                        aria-label={`Opsi lainnya untuk pesanan ${item.id}`}
                      >
                        <MoreHorizontal size={14} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-xs text-gray-400"
                >
                  Tidak ada pesanan yang sesuai filter atau pencarian.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* FOOTER TABEL */}
      <div className="flex flex-col items-start justify-between gap-2 border-t border-gray-100 bg-white px-4 py-3 sm:flex-row sm:items-center">

        <span className="text-[11px] font-semibold text-slate-500">
          Menampilkan {filteredOrders.length} dari total {totalOrders} pesanan
        </span>

        <span className="rounded bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
          Scroll Ke Bawah Untuk Melihat Selengkapnya
        </span>

      </div>
    </div>
  );
}
