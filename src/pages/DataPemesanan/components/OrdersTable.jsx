
import { Pencil } from 'lucide-react';

export default function OrdersTable({
  filteredOrders = [],
  totalOrders = 0,
  onEdit,
}) {
  // Format status
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
    <div className="w-full overflow-hidden rounded-xl border border-[#E2DBD0] bg-white shadow-sm">

      {/* AREA TABEL */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[780px] table-auto border-collapse text-left">

          {/* HEADER */}
          <thead className="bg-[#8B9EA8] text-[#1E293B]">
            <tr>
              <th className="whitespace-nowrap px-3 py-2.5 text-[9px] font-extrabold tracking-wide">
                ID PESANAN
              </th>

              <th className="min-w-[110px] px-3 py-2.5 text-[9px] font-extrabold tracking-wide">
                NAMA PELANGGAN
              </th>

              <th className="whitespace-nowrap px-3 py-2.5 text-[9px] font-extrabold tracking-wide">
                JAM
              </th>

              <th className="min-w-[150px] px-3 py-2.5 text-[9px] font-extrabold tracking-wide">
                ITEM PESANAN
              </th>

              <th className="whitespace-nowrap px-3 py-2.5 text-[9px] font-extrabold tracking-wide">
                TOTAL
              </th>

              <th className="whitespace-nowrap px-3 py-2.5 text-[9px] font-extrabold tracking-wide">
                METODE
              </th>

              <th className="whitespace-nowrap px-3 py-2.5 text-center text-[9px] font-extrabold tracking-wide">
                STATUS
              </th>

              <th className="whitespace-nowrap px-3 py-2.5 text-center text-[9px] font-extrabold tracking-wide">
                AKSI
              </th>
            </tr>
          </thead>

          {/* ISI TABEL */}
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  {/* ID PESANAN */}
                  <td className="whitespace-nowrap px-3 py-2.5 text-[11px] font-semibold text-slate-800">
                    {item.invoice || item.id}
                  </td>

                  {/* NAMA PELANGGAN */}
                  <td className="max-w-[140px] truncate px-3 py-2.5 text-[11px] font-medium text-slate-800">
                    {item.customer || '-'}
                  </td>

                  {/* JAM */}
                  <td className="whitespace-nowrap px-3 py-2.5 text-[11px] text-slate-500">
                    {item.time || '-'}
                  </td>

                  {/* ITEM PESANAN */}
                  <td className="max-w-[190px] px-3 py-2.5 text-[11px] leading-relaxed text-slate-600">
                    {item.items?.length > 0 ? (
                      <div className="flex flex-col gap-0.5">
                        {item.items.map((it, idx) => (
                          <div
                            key={`${item.id}-${idx}`}
                            className="break-words"
                          >
                            <span className="font-semibold text-slate-700">
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
                  <td className="whitespace-nowrap px-3 py-2.5 text-[11px] font-semibold text-slate-700">
                    {formatRupiah(item.totalAmount)}
                  </td>

                  {/* METODE */}
                  <td className="whitespace-nowrap px-3 py-2.5 text-[10px] font-medium text-slate-600">
                    {String(item.method || '-').toUpperCase()}
                  </td>

                  {/* STATUS */}
                  <td className="whitespace-nowrap px-3 py-2.5 text-center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full border px-2 py-1 text-[9px] font-bold ${getStatusBadge(item.status)}`}
                    >
                      <span className="mr-1">•</span>
                      {formatStatus(item.status)}
                    </span>
                  </td>

                  {/* AKSI */}
                  <td className="whitespace-nowrap px-3 py-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="inline-flex cursor-pointer items-center justify-center rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-black"
                      title="Edit Status Pesanan"
                      aria-label={`Edit pesanan ${item.id}`}
                    >
                      <Pencil size={13} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-3 py-7 text-center text-[11px] text-gray-400"
                >
                  Tidak ada pesanan yang sesuai filter atau pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER TABEL */}
      <div className="flex flex-col justify-between gap-2 border-t border-gray-100 bg-white px-3 py-2.5 sm:flex-row sm:items-center">
        <span className="text-[10px] font-medium text-slate-500">
          Menampilkan {filteredOrders.length} dari {totalOrders} pesanan
        </span>

        <span className="text-[9px] font-medium text-slate-400">
          Geser tabel ke samping untuk melihat kolom lainnya
        </span>
      </div>
    </div>
  );
}
