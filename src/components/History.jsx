import React, { useState } from 'react';
import logo from '../assets/logo.png'; 

import { 
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  X,
  Printer,
  Download
} from 'lucide-react';

export default function History({ user, setPage, setSelectedTransaction }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mengambil nama kasir aktif dari props user (Fallback: 'Annisa K.')
  const activeKasirName = user?.name || 'Annisa K.';

  // STATE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // State Modal Preview Invoice (Opsional untuk preview pop-up)
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data History Transaksi (21 Data Simulasi)
  const [historyData] = useState([
    // Halaman 1
    { invoiceId: '#TRX-882910', itemsSummary: '2x Caffe Latte, 1x Butter Croissant', totalItemCount: 3, date: '24 Okt 2025', time: '14:20:05', method: 'QRIS', totalAmount: 'Rp 100.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Caffe Latte', qty: 2, price: 35000 }, { name: 'Butter Croissant', qty: 1, price: 30000 }] },
    { invoiceId: '#TRX-882911', itemsSummary: '1x Matcha Latte, 1x Truffle Fries', totalItemCount: 2, date: '24 Okt 2025', time: '15:02:11', method: 'QRIS', totalAmount: 'Rp 70.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Matcha Latte', qty: 1, price: 35000 }, { name: 'Truffle Fries', qty: 1, price: 35000 }] },
    { invoiceId: '#TRX-882912', itemsSummary: '1x Chicken Wings, 1x Es Kopi Susu Aren', totalItemCount: 2, date: '24 Okt 2025', time: '15:45:30', method: 'CASH', totalAmount: 'Rp 85.500', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Chicken Wings', qty: 1, price: 50500 }, { name: 'Es Kopi Susu Aren', qty: 1, price: 35000 }] },
    { invoiceId: '#TRX-882913', itemsSummary: '2x Americano, 1x Butter Croissant', totalItemCount: 3, date: '24 Okt 2025', time: '16:10:00', method: 'QRIS', totalAmount: 'Rp 85.500', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Americano', qty: 2, price: 27750 }, { name: 'Butter Croissant', qty: 1, price: 30000 }] },
    { invoiceId: '#TRX-882914', itemsSummary: '2x Es Kopi Susu Aren', totalItemCount: 2, date: '24 Okt 2025', time: '17:33:45', method: 'CASH', totalAmount: 'Rp 70.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Es Kopi Susu Aren', qty: 2, price: 35000 }] },
    { invoiceId: '#TRX-882915', itemsSummary: '1x Chicken Wings, 1x Truffle Fries, 1x Matcha Latte', totalItemCount: 3, date: '24 Okt 2025', time: '18:15:20', method: 'QRIS', totalAmount: 'Rp 125.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Chicken Wings', qty: 1, price: 55000 }, { name: 'Truffle Fries', qty: 1, price: 35000 }, { name: 'Matcha Latte', qty: 1, price: 35000 }] },
    { invoiceId: '#TRX-882916', itemsSummary: '1x Caffe Latte, 1x Butter Croissant', totalItemCount: 2, date: '24 Okt 2025', time: '18:40:02', method: 'CASH', totalAmount: 'Rp 45.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Caffe Latte', qty: 1, price: 25000 }, { name: 'Butter Croissant', qty: 1, price: 20000 }] },
    
    // Halaman 2
    { invoiceId: '#TRX-882917', itemsSummary: '3x Es Americano', totalItemCount: 3, date: '24 Okt 2025', time: '19:05:12', method: 'QRIS', totalAmount: 'Rp 75.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Es Americano', qty: 3, price: 25000 }] },
    { invoiceId: '#TRX-882918', itemsSummary: '1x V60 Manual Brew, 1x Cheese Cake', totalItemCount: 2, date: '24 Okt 2025', time: '19:22:40', method: 'CASH', totalAmount: 'Rp 65.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'V60 Manual Brew', qty: 1, price: 30000 }, { name: 'Cheese Cake', qty: 1, price: 35000 }] },
    { invoiceId: '#TRX-882919', itemsSummary: '2x Red Velvet Latte, 2x French Fries', totalItemCount: 4, date: '24 Okt 2025', time: '19:40:15', method: 'QRIS', totalAmount: 'Rp 110.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Red Velvet Latte', qty: 2, price: 30000 }, { name: 'French Fries', qty: 2, price: 25000 }] },
    { invoiceId: '#TRX-882920', itemsSummary: '1x Cappuccino, 1x Cinnamon Roll', totalItemCount: 2, date: '24 Okt 2025', time: '20:00:00', method: 'CASH', totalAmount: 'Rp 58.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Cappuccino', qty: 1, price: 28000 }, { name: 'Cinnamon Roll', qty: 1, price: 30000 }] },
    { invoiceId: '#TRX-882921', itemsSummary: '2x Caramel Macchiato', totalItemCount: 2, date: '24 Okt 2025', time: '20:15:33', method: 'QRIS', totalAmount: 'Rp 76.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Caramel Macchiato', qty: 2, price: 38000 }] },
    { invoiceId: '#TRX-882922', itemsSummary: '1x Beef Burger, 1x Lemon Tea', totalItemCount: 2, date: '24 Okt 2025', time: '20:30:10', method: 'CASH', totalAmount: 'Rp 62.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Beef Burger', qty: 1, price: 45000 }, { name: 'Lemon Tea', qty: 1, price: 17000 }] },
    { invoiceId: '#TRX-882923', itemsSummary: '1x Taro Latte, 1x Garlic Bread', totalItemCount: 2, date: '24 Okt 2025', time: '20:45:50', method: 'QRIS', totalAmount: 'Rp 52.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Taro Latte', qty: 1, price: 28000 }, { name: 'Garlic Bread', qty: 1, price: 24000 }] },

    // Halaman 3
    { invoiceId: '#TRX-882924', itemsSummary: '2x Chocolate Ice, 1x Club Sandwich', totalItemCount: 3, date: '24 Okt 2025', time: '21:00:00', method: 'CASH', totalAmount: 'Rp 90.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Chocolate Ice', qty: 2, price: 25000 }, { name: 'Club Sandwich', qty: 1, price: 40000 }] },
    { invoiceId: '#TRX-882925', itemsSummary: '1x Affogato, 1x Waffle Ice Cream', totalItemCount: 2, date: '24 Okt 2025', time: '21:12:05', method: 'QRIS', totalAmount: 'Rp 60.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Affogato', qty: 1, price: 25000 }, { name: 'Waffle Ice Cream', qty: 1, price: 35000 }] },
    { invoiceId: '#TRX-882926', itemsSummary: '2x Lychee Tea', totalItemCount: 2, date: '24 Okt 2025', time: '21:25:18', method: 'CASH', totalAmount: 'Rp 40.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Lychee Tea', qty: 2, price: 20000 }] },
    { invoiceId: '#TRX-882927', itemsSummary: '1x Spaghetti Carbonara, 1x Ice Tea', totalItemCount: 2, date: '24 Okt 2025', time: '21:40:00', method: 'QRIS', totalAmount: 'Rp 63.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Spaghetti Carbonara', qty: 1, price: 48000 }, { name: 'Ice Tea', qty: 1, price: 15000 }] },
    { invoiceId: '#TRX-882928', itemsSummary: '1x Espresso Double, 1x Choco Muffin', totalItemCount: 2, date: '24 Okt 2025', time: '21:50:30', method: 'CASH', totalAmount: 'Rp 48.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Espresso Double', qty: 1, price: 23000 }, { name: 'Choco Muffin', qty: 1, price: 25000 }] },
    { invoiceId: '#TRX-882929', itemsSummary: '3x Es Kopi Susu Aren', totalItemCount: 3, date: '24 Okt 2025', time: '22:05:10', method: 'QRIS', totalAmount: 'Rp 105.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Es Kopi Susu Aren', qty: 3, price: 35000 }] },
    { invoiceId: '#TRX-882930', itemsSummary: '1x Green Tea Ice, 1x Pancake Banana', totalItemCount: 2, date: '24 Okt 2025', time: '22:15:00', method: 'CASH', totalAmount: 'Rp 65.000', status: 'Sukses', kasir: activeKasirName, details: [{ name: 'Green Tea Ice', qty: 1, price: 30000 }, { name: 'Pancake Banana', qty: 1, price: 35000 }] }
  ]);

  // Alur Navigasi Utama ke Halaman Bukti Transaksi
  const handleOpenPreview = (item) => {
    if (setSelectedTransaction) {
      setSelectedTransaction(item);
    }
    if (setPage) {
      setPage('bukti-transaksi');
    }
  };

  // Filter Data berdasarkan Pencarian
  const filteredHistory = historyData.filter((item) =>
    item.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.itemsSummary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // LOGIKA PAGINASI
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHistory = filteredHistory.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 box-border min-w-0">
      
      {/* FILTER & PENCARIAN */}
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2 bg-[#F3EFE6] px-3 py-1.5 rounded-xl border border-[#E2DBD0] text-xs font-medium text-gray-700">
          <Filter size={14} className="text-gray-500" />
          <span>Menampilkan data untuk: <strong className="text-[#1F1915]">{activeKasirName}</strong></span>
        </div>

        {/* INPUT PENCARIAN */}
        <div className="relative max-w-xs flex-1 flex items-center">
          <Search className="absolute left-3.5 text-gray-400 pointer-events-none" size={16} />
          <input
            type="text"
            placeholder="Cari No. invoice atau item..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset ke halaman 1 saat mencari
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-transparent bg-white text-xs text-[#1F1915] placeholder-gray-400 outline-none shadow-xs focus:border-gray-300 transition-all leading-normal"
          />
        </div>
      </div>

      {/* TABEL DATA RIWAYAT */}
      <div className="bg-white rounded-xl border border-[#E2DBD0] overflow-hidden flex-1 flex flex-col justify-between shadow-xs min-h-0">
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#8B9EA8] text-[#1E293B] z-10">
              <tr>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider w-32">INVOICE ID</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider">PESANAN</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider">TANGGAL & WAKTU</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider text-center">METODE</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider">JUMLAH</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider text-center">STATUS</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentHistory.length > 0 ? (
                currentHistory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-xs font-extrabold text-slate-800">{item.invoiceId}</td>
                    <td className="py-3 px-4">
                      <div className="text-xs font-medium text-slate-700">{item.itemsSummary}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{item.totalItemCount} item</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs font-semibold text-slate-700">{item.date}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{item.time}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-700 rounded-md border border-gray-200 uppercase">
                        {item.method}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-extrabold text-slate-900">{item.totalAmount}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                        • {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={() => handleOpenPreview(item)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 hover:bg-gray-50 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Eye size={12} />
                        <span>Preview Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-xs text-gray-400 font-semibold">
                    Tidak ada data transaksi yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER PAGINASI */}
        <div className="py-2.5 px-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500">
            Menampilkan <strong className="text-slate-700">{filteredHistory.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredHistory.length)}</strong> dari <strong className="text-slate-700">{filteredHistory.length}</strong> transaksi
          </span>

          {/* NAVIGASI HALAMAN */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                currentPage === 1 
                  ? 'border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed' 
                  : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-100'
              }`}
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-pointer border ${
                  currentPage === page
                    ? 'bg-[#1F1915] text-white border-[#1F1915] shadow-xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                currentPage === totalPages || totalPages === 0
                  ? 'border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed' 
                  : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-100'
              }`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL POP-UP PREVIEW INVOICE (OPSIONAL) */}
      {isModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-5 w-auto object-contain" />
                <span className="font-extrabold text-sm text-[#1F1915]">REDScan POS</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-dashed border-gray-300 text-xs text-gray-700 flex flex-col gap-2">
              <div className="text-center pb-2 border-b border-gray-200">
                <p className="font-bold text-slate-800 m-0">{selectedInvoice.invoiceId}</p>
                <p className="text-[10px] text-gray-500 mt-0.5 m-0">{selectedInvoice.date} • {selectedInvoice.time}</p>
                <p className="text-[10px] text-gray-500 m-0">Kasir: {selectedInvoice.kasir}</p>
              </div>

              <div className="flex flex-col gap-1.5 py-1">
                {selectedInvoice.details?.map((item, i) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span>{item.qty}x {item.name}</span>
                    <span className="font-bold">Rp {(item.qty * item.price).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-200 flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span>Metode Bayar</span>
                  <span className="font-bold">{selectedInvoice.method}</span>
                </div>
                <div className="flex justify-between text-xs font-black text-slate-900 pt-1 border-t border-gray-300">
                  <span>TOTAL</span>
                  <span>{selectedInvoice.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="py-2 px-3 bg-[#231B17] text-white rounded-xl text-xs font-bold hover:bg-[#3B2E28] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Printer size={14} />
                <span>Cetak Struk</span>
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-3 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download size={14} />
                <span>Unduh PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}