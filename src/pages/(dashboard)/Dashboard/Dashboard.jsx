import React, { useState } from 'react';
import { 
  Search, 
  RotateCw, 
  Receipt, 
  Wallet, 
  ShoppingBag, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  Printer,
  X,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  {
    waktu: '09:08:12',
    invoice: '#TRX-882910',
    nama: 'Dimas Arya',
    detail: 'Meja 04 • Dine In',
    metode: 'QRIS BCA',
    metodeType: 'qris',
    total: 48000,
    items: [
      { name: 'Kopi Susu Gula Aren', qty: 2, price: 18000 },
      { name: 'Roti Bakar Cokelat', qty: 1, price: 12000 }
    ]
  },
  {
    waktu: '09:02:45',
    invoice: '#TRX-882909',
    nama: 'Siti Nurhaliza',
    detail: 'Take Away',
    metode: 'Tunai',
    metodeType: 'tunai',
    total: 26000,
    items: [
      { name: 'Americano Ice', qty: 1, price: 18000 },
      { name: 'Croissant Original', qty: 1, price: 8000 }
    ]
  },
  {
    waktu: '08:54:19',
    invoice: '#TRX-882908',
    nama: 'Rian Hidayat',
    detail: 'Meja 09 • Dine In',
    metode: 'QRIS GoPay',
    metodeType: 'qris',
    total: 74000,
    items: [
      { name: 'Matcha Latte', qty: 2, price: 22000 },
      { name: 'French Fries', qty: 2, price: 15000 }
    ]
  },
  {
    waktu: '08:45:00',
    invoice: '#TRX-882907',
    nama: 'Budi Santoso',
    detail: 'Meja 02 • Dine In',
    metode: 'QRIS Mandiri',
    metodeType: 'qris',
    total: 112000,
    items: [
      { name: 'Chicken Steak', qty: 2, price: 45000 },
      { name: 'Es Teh Manis', qty: 2, price: 11000 }
    ]
  }
];

export default function Dashboard({ user, shift, setPage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showFullProof, setShowFullProof] = useState(false);

  const filteredTransactions = INITIAL_TRANSACTIONS.filter((trx) =>
    trx.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trx.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trx.detail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  };

  const handlePrintStruk = (trx) => {
    setSelectedTransaction(trx);
  };

  const handleOpenFullProof = (trx) => {
    setSelectedTransaction(trx);
    setShowFullProof(true);
  };

  return (
    <div className="w-full space-y-6 relative">
      
      {/* HERO BANNER SESI KASIR */}
      <div className="bg-[#EBE2D7] rounded-3xl p-6 sm:p-8 flex items-center justify-between border border-[#E0D5C7] shadow-sm">
        <div className="flex flex-col gap-2.5">
          <div className="inline-flex items-center gap-1.5 text-[#8B6B58] text-[11px] font-bold uppercase tracking-wider bg-[#DFD4C5] px-3.5 py-1.5 rounded-full w-fit">
            <Sparkles size={14} />
            <span>SESI KASIR AKTIF</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight m-0">
            Halo {user?.name || 'Kasir'}, Selamat Bekerja !
          </h2>
          
          <div className="bg-[#D4C7B7] text-[#5C4A3E] text-xs font-bold px-3.5 py-1.5 rounded-xl w-fit">
            Shift: {shift || '16:00 - 00:00'}
          </div>
        </div>

        <div className="hidden sm:flex w-22 h-22 bg-[#DFD4C5]/70 rounded-full items-center justify-center border-4 border-[#E5DACD] shrink-0">
          <div className="w-13 h-13 bg-[#D4C6B6] rounded-full flex items-center justify-center rotate-12 text-2xl">
            ☕
          </div>
        </div>
      </div>

      {/* 3 CARDS STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-relaxed">
              TOTAL TRANSAKSI<br />HARI INI
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Receipt size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1A1A1A] leading-none">150</span>
            <span className="text-xs text-gray-400 font-bold">struk tercetak</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-relaxed">
              TOTAL OMZET HARI<br />INI
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Wallet size={20} />
            </div>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-black text-[#1A1A1A] whitespace-nowrap">
              Rp 3.500.000
            </div>

            <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-gray-100 text-xs text-gray-500 whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>QRIS: <b className="text-gray-800">Rp 2.450.000</b></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span>Tunai: <b className="text-gray-800">Rp 1.050.000</b></span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-relaxed">
                LIHAT PESANAN<br />HARI INI
              </span>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                <ShoppingBag size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#1A1A1A]">0</span>
              <span className="text-xs font-bold text-gray-400 uppercase">PESANAN ANTRE</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1 m-0">Semua pesanan shift ini telah terselesaikan dengan baik.</p>
          </div>
          <button 
            onClick={() => setPage && setPage('pemesanan')}
            className="w-full mt-4 py-2.5 px-4 bg-[#FAF7F2] text-[#1A1A1A] text-xs font-bold rounded-xl border border-[#EBE2D7] flex items-center justify-center gap-2 hover:bg-[#F2EBDC] transition-colors cursor-pointer"
          >
            <span>Buka Layar Pemesanan</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* TABEL AKTIVITAS TRANSAKSI TERKINI */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 flex flex-col gap-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-black text-[#1A1A1A] m-0">Aktivitas Transaksi Terkini</h3>
              <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-md">Shift 1</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 m-0">Daftar transaksi kasir yang selesai diproses hari ini</p>
          </div>

          {/* PERBAIKAN SEARCH & RESET (UKURAN & ROUNDED SAMA PERSIS) */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari No. Struk/Meja . . ." 
                className="w-full h-10 bg-[#FAF7F2] border border-[#EBE2D7] rounded-2xl pl-9 pr-3 text-xs text-gray-700 outline-none focus:border-[#3D5256] transition-colors placeholder:text-gray-400"
              />
            </div>
            <button 
              onClick={() => setSearchQuery('')}
              className="w-10 h-10 bg-[#FAF7F2] border border-[#EBE2D7] rounded-2xl flex items-center justify-center text-gray-600 hover:bg-[#F2EBDC] transition-colors cursor-pointer shrink-0"
              title="Reset Filter"
            >
              <RotateCw size={15} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-3.5">WAKTU</th>
                <th className="py-3 px-3.5">NO. INVOICE</th>
                <th className="py-3 px-3.5">PELANGGAN / MEJA</th>
                <th className="py-3 px-3.5">METODE</th>
                <th className="py-3 px-3.5 text-center">AKSI</th>
                <th className="py-3 px-3.5 text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((trx, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-3.5 text-gray-400 font-mono text-xs">{trx.waktu}</td>
                    <td className="py-3.5 px-3.5 font-bold text-[#1A1A1A]">
                      <button 
                        onClick={() => handleOpenFullProof(trx)}
                        className="hover:underline text-left cursor-pointer"
                      >
                        {trx.invoice}
                      </button>
                    </td>
                    <td className="py-3.5 px-3.5">
                      <div className="font-bold text-[#1A1A1A]">{trx.nama}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{trx.detail}</div>
                    </td>
                    <td className="py-3.5 px-3.5">
                      {trx.metodeType === 'qris' ? (
                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold text-[10px] px-2.5 py-1 rounded-full inline-block">
                          {trx.metode}
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px] px-2.5 py-1 rounded-full inline-block">
                          {trx.metode}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3.5 text-center">
                      <button 
                        onClick={() => handlePrintStruk(trx)}
                        className="text-teal-700 font-bold underline hover:text-teal-900 cursor-pointer text-xs"
                      >
                        Print Struk
                      </button>
                    </td>
                    <td className="py-3.5 px-3.5 text-right font-black text-[#1A1A1A] text-sm">
                      {formatRupiah(trx.total)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    Tidak ada transaksi yang cocok dengan kata kunci.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>Menampilkan {filteredTransactions.length} dari 150 transaksi hari ini</span>
          <button 
            onClick={() => setPage && setPage('history')}
            className="text-[#1A1A1A] font-bold flex items-center gap-1 hover:underline cursor-pointer text-xs"
          >
            <span>Buka Semua Riwayat</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* POPUP MODAL CETAK STRUK */}
      {selectedTransaction && !showFullProof && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-gray-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h4 className="font-black text-[#1A1A1A] text-sm flex items-center gap-2 m-0">
                <Printer size={16} />
                <span>Cetak Struk Transaksi</span>
              </h4>
              <button 
                onClick={() => setSelectedTransaction(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE2D7] font-mono text-xs space-y-2 text-gray-700">
              <div className="text-center font-bold text-sm text-[#1A1A1A] mb-2">POS STORE</div>
              <div className="flex justify-between text-[11px]">
                <span>No. Struk</span>
                <span className="font-bold">{selectedTransaction.invoice}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Pelanggan</span>
                <span>{selectedTransaction.nama}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Waktu</span>
                <span>{selectedTransaction.waktu}</span>
              </div>
              <div className="border-b border-dashed border-gray-300 my-2"></div>
              {selectedTransaction.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span>{item.qty}x {item.name}</span>
                  <span>{formatRupiah(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="border-b border-dashed border-gray-300 my-2"></div>
              <div className="flex justify-between font-bold text-sm text-[#1A1A1A]">
                <span>TOTAL</span>
                <span>{formatRupiah(selectedTransaction.total)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  alert(`Mencetak struk ${selectedTransaction.invoice}...`);
                  setSelectedTransaction(null);
                }}
                className="flex-1 py-2.5 bg-[#1A1A1A] text-white font-bold rounded-xl text-xs hover:bg-black transition-colors cursor-pointer"
              >
                Cetak Struk
              </button>
              <button 
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl text-xs hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL BUKTI TRANSAKSI LENGKAP */}
      {selectedTransaction && showFullProof && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl border border-gray-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <button 
                onClick={() => setShowFullProof(false)}
                className="text-gray-500 hover:text-gray-800 flex items-center gap-1 text-xs font-bold cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Kembali</span>
              </button>
              <span className="font-black text-xs text-gray-400 uppercase tracking-wider">BUKTI TRANSAKSI</span>
              <button 
                onClick={() => {
                  setSelectedTransaction(null);
                  setShowFullProof(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-black text-lg text-[#1A1A1A] m-0">Pembayaran Berhasil</h3>
              <p className="text-xs text-gray-400 m-0">{selectedTransaction.invoice}</p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE2D7] space-y-3 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Kasir</span>
                <span className="font-bold text-gray-800">{user?.name || 'Kasir'}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Pelanggan</span>
                <span className="font-bold text-gray-800">{selectedTransaction.nama}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Keterangan</span>
                <span className="font-bold text-gray-800">{selectedTransaction.detail}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Metode Pembayaran</span>
                <span className="font-bold text-gray-800">{selectedTransaction.metode}</span>
              </div>
              <div className="border-b border-gray-200"></div>
              <div className="space-y-1.5">
                <p className="font-bold text-gray-600 text-[11px] uppercase m-0">Rincian Item:</p>
                {selectedTransaction.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-gray-700">
                    <span>{item.qty}x {item.name}</span>
                    <span className="font-medium">{formatRupiah(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-b border-gray-200"></div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-black text-[#1A1A1A]">TOTAL BAYAR</span>
                <span className="font-black text-lg text-[#1A1A1A]">{formatRupiah(selectedTransaction.total)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  alert(`Mencetak struk ${selectedTransaction.invoice}...`);
                }}
                className="flex-1 py-2.5 bg-[#1A1A1A] text-white font-bold rounded-xl text-xs hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer size={14} />
                <span>Cetak Struk</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}