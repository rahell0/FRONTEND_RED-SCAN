
import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import logo from '../../assets/logo.png';

import { X, Printer, Download } from 'lucide-react';

import HistoryToolbar from './components/HistoryToolbar';
import HistoryTable from './components/HistoryTable';
import HistoryPagination from './components/HistoryPagination';

export default function History({
  user,
  setPage,
  setSelectedTransaction,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Nama kasir aktif
  const activeKasirName = user?.name || 'Annisa K.';

  // Pengaturan pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // State modal preview invoice
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data riwayat transaksi: 21 data simulasi
  const [historyData, setHistoryData] = useState([]);

  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState('');
  // Mengambil data riwayat transaksi dari Backend
useEffect(() => {
  let isMounted = true;

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      setHistoryError('');

      const response = await API.get('/pemesanan');

      if (!isMounted) return;

      const data = response.data?.data ?? [];

      const formattedHistory = (Array.isArray(data) ? data : []).map((item) => {
        const transactionDate = item.created_at
          ? new Date(item.created_at)
          : null;

        const validDate =
          transactionDate && !Number.isNaN(transactionDate.getTime());

        const invoice = String(
          item.kode_transaksi ?? `TRX-${item.id ?? ''}`
        );

        const statusRaw = String(item.status ?? '-');

        return {
          invoiceId: invoice.startsWith('#') ? invoice : `#${invoice}`,

          itemsSummary: 'Detail produk belum tersedia',
          totalItemCount: 0,

          date: validDate
            ? transactionDate.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
            : '-',

          time: validDate
            ? transactionDate.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })
            : '-',

          method: String(item.metode_pembayaran ?? '-').toUpperCase(),

          totalAmount: `Rp ${Number(
            item.total_harga ?? 0
          ).toLocaleString('id-ID')}`,

          status:
            statusRaw.toLowerCase() === 'selesai'
              ? 'Sukses'
              : statusRaw,

          kasir: '-',
          details: [],
        };
      });

      setHistoryData(formattedHistory);
    } catch (error) {
      if (!isMounted) return;

      console.error('Gagal mengambil riwayat transaksi:', error);

      setHistoryError('Data riwayat transaksi gagal dimuat.');
      setHistoryData([]);
    } finally {
      if (isMounted) {
        setLoadingHistory(false);
      }
    }
  };

  fetchHistory();

  return () => {
    isMounted = false;
  };
}, []);

  // Filter berdasarkan invoice atau nama item
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredHistory = historyData.filter((item) =>
    item.invoiceId.toLowerCase().includes(normalizedQuery) ||
    item.itemsSummary.toLowerCase().includes(normalizedQuery)
  );

  // Hitung halaman berdasarkan hasil filter
  const totalPages = Math.max(
    1,
    Math.ceil(filteredHistory.length / itemsPerPage)
  );

  // Pastikan halaman aktif tetap valid
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredHistory.length
  );

  const currentHistory = filteredHistory.slice(startIndex, endIndex);

  // Navigasi halaman
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Buka bukti transaksi atau modal preview
  const handleOpenPreview = (item) => {
    if (typeof setSelectedTransaction === 'function' &&
        typeof setPage === 'function') {
      setSelectedTransaction(item);
      setPage('bukti-transaksi');
      return;
    }

    setSelectedInvoice(item);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full min-w-0 flex flex-col gap-4 box-border">
      {/* FILTER DAN PENCARIAN */}
      <HistoryToolbar
        activeKasirName={activeKasirName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
      />

      {/* TABEL DAN PAGINATION */}
      <div className="bg-white rounded-xl border border-[#E2DBD0] overflow-hidden flex-1 flex flex-col shadow-xs min-h-0">
        <HistoryTable
          currentHistory={currentHistory}
          onPreview={handleOpenPreview}
        />

        <HistoryPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredHistory.length}
          onPageChange={handlePageChange}
        />
      </div>

      {/* MODAL PREVIEW INVOICE */}
      {isModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-gray-100 flex flex-col gap-4">
            {/* Header modal */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-5 w-auto object-contain"
                />
                <span className="font-extrabold text-sm text-[#1F1915]">
                  REDScan POS
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Tutup preview invoice"
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Isi struk */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-dashed border-gray-300 text-xs text-gray-700 flex flex-col gap-2">
              <div className="text-center pb-2 border-b border-gray-200">
                <p className="font-bold text-slate-800 m-0">
                  {selectedInvoice.invoiceId}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5 m-0">
                  {selectedInvoice.date} • {selectedInvoice.time}
                </p>
                <p className="text-[10px] text-gray-500 m-0">
                  Kasir: {selectedInvoice.kasir}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 py-1">
                {selectedInvoice.details?.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex justify-between text-[11px] gap-3"
                  >
                    <span>
                      {item.qty}x {item.name}
                    </span>
                    <span className="font-bold whitespace-nowrap">
                      Rp {(item.qty * item.price).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-200 flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span>Metode Bayar</span>
                  <span className="font-bold">
                    {selectedInvoice.method}
                  </span>
                </div>

                <div className="flex justify-between text-xs font-black text-slate-900 pt-1 border-t border-gray-300">
                  <span>TOTAL</span>
                  <span>{selectedInvoice.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Aksi modal */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2 px-3 bg-[#231B17] text-white rounded-xl text-xs font-bold hover:bg-[#3B2E28] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Printer size={14} />
                <span>Cetak Struk</span>
              </button>

              <button
                type="button"
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
