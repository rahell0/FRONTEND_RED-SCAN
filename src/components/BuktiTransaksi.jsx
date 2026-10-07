import React from 'react';
import logo from '../assets/logo.png';
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  CheckCircle2, 
  Share2, 
  Receipt, 
  CreditCard, 
  User, 
  Calendar, 
  Clock, 
  Store 
} from 'lucide-react';

export default function BuktiTransaksi({ selectedTransaction, user, setPage }) {
  // Data fallback default jika belum ada transaksi yang dipilih dari History
  const data = selectedTransaction || {
    invoiceId: '#TRX-882910',
    date: '24 Okt 2025',
    time: '14:20:05',
    method: 'QRIS',
    status: 'Sukses',
    kasir: user?.name || 'Annisa K.',
    table: 'Meja 08',
    type: 'Dine-In (Makan di Tempat)',
    details: [
      { name: 'Caffe Latte', qty: 2, price: 35000 },
      { name: 'Butter Croissant', qty: 1, price: 30000 }
    ]
  };

  // Mengambil daftar rincian item (support 'details' maupun 'items')
  const itemList = data.details || data.items || [];

  // Hitung Subtotal & Total Item
  const totalItemQty = itemList.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = itemList.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = 0; // PPN (jika ada)
  const discount = 0; // Diskon (jika ada)
  const grandTotal = subtotal + tax - discount;

  return (
    <div className="w-full flex flex-col gap-6 text-[#1F1915] pb-12 max-w-5xl mx-auto px-2">
      
      {/* BAR NAVIGASI & AKSI ATAS */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E6DFD5] shadow-xs">
        <button
          onClick={() => setPage && setPage('history')}
          className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-black cursor-pointer bg-[#FAF8F5] px-4 py-2.5 rounded-xl border border-[#E6DFD5] hover:bg-gray-100 transition-all"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Riwayat Transaksi</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
          >
            <Download size={15} />
            <span>Unduh PDF</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1F1915] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors cursor-pointer shadow-xs"
          >
            <Printer size={15} />
            <span>Cetak Struk Transaksi</span>
          </button>
        </div>
      </div>

      {/* TAMPILAN UTAMA BUKTI TRANSAKSI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: RINCIAN FORMAL & TABEL DETAIL (2/3 LEBAR) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs flex flex-col gap-6">
          
          {/* HEADER INVOICE & STATUS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] flex items-center justify-center text-[#1F1915]">
                <Receipt size={20} />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">ID TRANSAKSI</span>
                <h2 className="text-xl font-black text-[#1F1915] m-0">{data.invoiceId}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 size={14} className="mr-1.5" />
                <span>Pembayaran {data.status || 'Sukses'}</span>
              </span>
            </div>
          </div>

          {/* GRID METADATA TRANSAKSI */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FAF8F5] rounded-xl border border-[#E6DFD5]/70 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Calendar size={12} /> Tanggal
              </span>
              <p className="font-extrabold text-[#1F1915] mt-1 m-0">{data.date}</p>
              <p className="text-[10px] text-gray-400 m-0 flex items-center gap-0.5 mt-0.5">
                <Clock size={10} /> {data.time}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <User size={12} /> Kasir
              </span>
              <p className="font-extrabold text-[#1F1915] mt-1 m-0">{data.kasir || user?.name || 'Annisa K.'}</p>
              <p className="text-[10px] text-gray-400 m-0 mt-0.5">Terminal POS-01</p>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <CreditCard size={12} /> Metode
              </span>
              <p className="font-extrabold text-emerald-700 mt-1 m-0 uppercase">{data.method || 'QRIS'}</p>
              <p className="text-[10px] text-gray-400 m-0 mt-0.5">Terverifikasi</p>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Store size={12} /> Tipe
              </span>
              <p className="font-extrabold text-[#1F1915] mt-1 m-0">{data.table || 'Meja 08'}</p>
              <p className="text-[10px] text-gray-400 m-0 mt-0.5">{data.type || 'Dine-In'}</p>
            </div>
          </div>

          {/* TABEL ITEM PESANAN */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider m-0">RINCIAN PESANAN</h3>
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-3">NAMA ITEM</th>
                    <th className="py-3 px-3 text-right">HARGA</th>
                    <th className="py-3 px-3 text-center">QTY</th>
                    <th className="py-3 px-3 text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-semibold">
                  {itemList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-3 font-bold text-[#1F1915]">{item.name}</td>
                      <td className="py-3.5 px-3 text-right text-gray-500">
                        Rp {item.price.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-3 text-center font-extrabold">{item.qty}</td>
                      <td className="py-3.5 px-3 text-right font-black text-[#1F1915]">
                        Rp {(item.price * item.qty).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RINGKASAN PEMBAYARAN */}
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>Subtotal ({totalItemQty} Item)</span>
              <span className="font-bold text-[#1F1915]">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>Pajak Resto (PPN)</span>
              <span className="font-bold text-[#1F1915]">Rp {tax.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>Diskon Pembelian</span>
              <span className="font-bold text-emerald-600">- Rp {discount.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center text-base font-black text-[#1F1915] pt-3 border-t border-gray-200 mt-1">
              <span>TOTAL PEMBAYARAN</span>
              <span className="text-xl font-black text-[#1F1915]">Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN: PREVIEW STRUK FISIK KASIR (1/3 LEBAR) */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#E6DFD5] p-5 flex flex-col gap-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">PREVIEW STRUK STRUK</span>
              <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md font-bold">58mm Thermal</span>
            </div>

            {/* STRUK FISIK THERMAL STYLE */}
            <div className="bg-white p-5 rounded-xl border border-dashed border-gray-300 shadow-2xs text-[#1F1915] font-mono text-xs flex flex-col gap-3">
              
              {/* BRANDING HEADER STRUK */}
              <div className="text-center flex flex-col items-center gap-1 pb-3 border-b border-dashed border-gray-300">
                {logo && <img src={logo} alt="Logo" className="h-6 w-auto object-contain mb-1" />}
                <h4 className="font-black text-sm uppercase m-0">REDScan POS Coffee</h4>
                <p className="text-[10px] text-gray-500 m-0 leading-tight">Jl. Raya Soekarno Hatta No. 12</p>
                <p className="text-[10px] text-gray-500 m-0">Telp: (0341) 555-889</p>
              </div>

              {/* INFO TRANSAKSI STRUK */}
              <div className="text-[10px] flex flex-col gap-0.5 py-1 border-b border-dashed border-gray-300">
                <div className="flex justify-between"><span>No:</span><span className="font-bold">{data.invoiceId}</span></div>
                <div className="flex justify-between"><span>Tgl:</span><span>{data.date} {data.time}</span></div>
                <div className="flex justify-between"><span>Kasir:</span><span>{data.kasir || user?.name}</span></div>
                <div className="flex justify-between"><span>Tipe:</span><span>{data.table || 'Meja 08'}</span></div>
              </div>

              {/* LIST ITEM STRUK */}
              <div className="flex flex-col gap-1.5 py-1 border-b border-dashed border-gray-300 text-[11px]">
                {itemList.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex justify-between text-[10px] text-gray-600">
                      <span>{item.qty} x {item.price.toLocaleString('id-ID')}</span>
                      <span className="font-bold text-black">{(item.qty * item.price).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL STRUK */}
              <div className="text-[11px] flex flex-col gap-1 pt-1">
                <div className="flex justify-between"><span>Subtotal:</span><span>{subtotal.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span>Pajak:</span><span>0</span></div>
                <div className="flex justify-between text-xs font-black pt-1 border-t border-gray-200">
                  <span>TOTAL:</span>
                  <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 pt-0.5">
                  <span>Bayar ({data.method}):</span>
                  <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* FOOTER STRUK */}
              <div className="text-center pt-3 border-t border-dashed border-gray-300 text-[9px] text-gray-400">
                <p className="m-0 font-bold text-gray-600">-- TERIMA KASIH --</p>
                <p className="m-0 mt-0.5">Barang yang sudah dibeli tidak dapat ditukar</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}