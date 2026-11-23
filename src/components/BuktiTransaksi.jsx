
import React from 'react';
import logo from '../assets/logo.png';
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  Receipt,
  CreditCard,
  User,
  Calendar,
  Clock,
  Store,
  Phone,
  X,
} from 'lucide-react';

export default function BuktiTransaksi({
  selectedTransaction,
  user,
  setPage,
}) {
  // Tidak menggunakan data transaksi palsu.
  const data = selectedTransaction || {};

  // Menyesuaikan nama field dari backend dan History.
  const itemList = (
    data.details ||
    data.detail ||
    data.items ||
    []
  ).map((item) => ({
    name: item.name || item.nama_menu || '-',
    qty: Number(item.qty ?? item.jumlah ?? 0),
    price: Number(item.price ?? item.harga ?? 0),
  }));

  const invoiceId =
    data.invoiceId ||
    (data.kode_transaksi
      ? `#${data.kode_transaksi}`
      : '-');

  const namaPelanggan =
    data.namaPelanggan ||
    data.nama_pelanggan ||
    '-';

  const nomorHp =
    data.nomorHp ||
    data.nomor_hp ||
    '-';

  const kasir =
    data.kasir && data.kasir !== '-'
      ? data.kasir
      : user?.name || '-';

  const method =
    data.method ||
    data.metode_pembayaran ||
    '-';

  const date = data.date || '-';
  const time = data.time || '-';

  const status = data.status || '-';

  const subtotal = itemList.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Total dari database adalah sumber utama.
  const totalValue = Number(
    data.totalValue ??
    data.total_harga ??
    subtotal
  );

  // Pajak merupakan selisih total transaksi dan subtotal.
  const tax = Math.max(0, totalValue - subtotal);

  const totalItemQty = itemList.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const formatRupiah = (value) =>
    `Rp ${Number(value || 0).toLocaleString('id-ID')}`;

  const handleClose = () => {
    if (typeof setPage === 'function') {
      setPage('history');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col gap-6 text-[#1F1915] pb-12 max-w-5xl mx-auto px-2">

      {/* NAVIGASI DAN TOMBOL AKSI */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E6DFD5] shadow-xs print:hidden">

        <button
          type="button"
          onClick={handleClose}
          className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-[#FAF8F5] px-4 py-2.5 rounded-xl border border-[#E6DFD5] hover:bg-gray-100"
        >
          <ArrowLeft size={16} />
          Kembali ke Riwayat
        </button>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50"
          >
            <X size={15} />
            Tutup
          </button>

          {/* TOMBOL CETAK STRUK */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1F1915] text-white rounded-xl text-xs font-bold hover:bg-black"
          >
            <Printer size={15} />
            Cetak Struk
          </button>

        </div>
      </div>

      {!selectedTransaction ? (
        <div className="bg-white rounded-2xl border p-8 text-center text-sm text-gray-500">
          Tidak ada transaksi yang dipilih.
          <button
            type="button"
            onClick={handleClose}
            className="block mx-auto mt-4 text-blue-600 font-bold"
          >
            Kembali ke Riwayat
          </button>
        </div>
      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* RINCIAN TRANSAKSI */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs flex flex-col gap-6 print:col-span-3">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b gap-3">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] flex items-center justify-center">
                  <Receipt size={20} />
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 font-bold">
                    ID TRANSAKSI
                  </span>
                  <h2 className="text-xl font-black">
                    {invoiceId}
                  </h2>
                </div>
              </div>

              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <CheckCircle2 size={14} className="mr-1.5" />
                {status}
              </span>

            </div>

            {/* INFORMASI TRANSAKSI */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-[#FAF8F5] rounded-xl text-xs">

              <div>
                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                  <Calendar size={12} /> Tanggal
                </span>
                <p className="font-extrabold mt-1">{date}</p>
                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                  <Clock size={10} /> {time}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                  <User size={12} /> Pelanggan
                </span>
                <p className="font-extrabold mt-1">{namaPelanggan}</p>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                  <Phone size={12} /> Nomor HP
                </span>
                <p className="font-extrabold mt-1">{nomorHp}</p>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                  <User size={12} /> Kasir
                </span>
                <p className="font-extrabold mt-1">{kasir}</p>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                  <CreditCard size={12} /> Metode
                </span>
                <p className="font-extrabold mt-1 uppercase">{method}</p>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                  <Store size={12} /> Sumber
                </span>
                <p className="font-extrabold mt-1">Mobile</p>
              </div>

            </div>

            {/* TABEL PRODUK */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-extrabold text-gray-400">
                RINCIAN PESANAN
              </h3>

              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-left border-collapse">

                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-500">
                      <th className="py-3 px-3">NAMA ITEM</th>
                      <th className="py-3 px-3 text-right">HARGA</th>
                      <th className="py-3 px-3 text-center">QTY</th>
                      <th className="py-3 px-3 text-right">TOTAL</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y text-xs">
                    {itemList.length > 0 ? (
                      itemList.map((item, index) => (
                        <tr key={index}>
                          <td className="py-3 px-3 font-bold">
                            {item.name}
                          </td>
                          <td className="py-3 px-3 text-right">
                            {formatRupiah(item.price)}
                          </td>
                          <td className="py-3 px-3 text-center font-bold">
                            {item.qty}
                          </td>
                          <td className="py-3 px-3 text-right font-black">
                            {formatRupiah(item.price * item.qty)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-6 text-gray-400">
                          Detail produk tidak tersedia.
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>
            </div>

            {/* RINGKASAN PEMBAYARAN */}
            <div className="flex flex-col gap-3 pt-3 border-t">

              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal ({totalItemQty} item)</span>
                <span className="font-bold text-[#1F1915]">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Pajak</span>
                <span className="font-bold text-[#1F1915]">
                  {formatRupiah(tax)}
                </span>
              </div>

              <div className="flex justify-between text-base font-black pt-3 border-t">
                <span>TOTAL PEMBAYARAN</span>
                <span className="text-xl">
                  {formatRupiah(totalValue)}
                </span>
              </div>

            </div>
          </div>

          {/* PREVIEW STRUK FISIK */}
          <div className="flex flex-col gap-4 print:hidden">
            <div className="bg-[#FAF8F5] rounded-2xl border p-5 flex flex-col gap-4">

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-xs font-extrabold text-gray-500">
                  PREVIEW STRUK
                </span>
                <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-md">
                  58mm Thermal
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-dashed font-mono text-xs flex flex-col gap-3">

                <div className="text-center flex flex-col items-center gap-1 pb-3 border-b border-dashed">
                  <img src={logo} alt="Logo" className="h-6 w-auto" />
                  <h4 className="font-black text-sm">REDScan POS Coffee</h4>
                  <p className="text-[10px] text-gray-500">
                    Jl. Raya Soekarno Hatta No. 12
                  </p>
                </div>

                <div className="text-[10px] flex flex-col gap-1 pb-2 border-b border-dashed">
                  <div className="flex justify-between">
                    <span>No:</span>
                    <span>{invoiceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tanggal:</span>
                    <span>{date} {time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pelanggan:</span>
                    <span>{namaPelanggan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kasir:</span>
                    <span>{kasir}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pb-2 border-b border-dashed">
                  {itemList.map((item, index) => (
                    <div key={index}>
                      <p className="font-bold">{item.name}</p>
                      <div className="flex justify-between text-[10px]">
                        <span>
                          {item.qty} x {item.price.toLocaleString('id-ID')}
                        </span>
                        <span>
                          {(item.qty * item.price).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-black">
                  <span>TOTAL</span>
                  <span>{totalValue.toLocaleString('id-ID')}</span>
                </div>

                <p className="text-center text-[10px] text-gray-500 border-t border-dashed pt-3">
                  TERIMA KASIH TELAH BERBELANJA
                </p>

              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
