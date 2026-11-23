
import React, { useEffect, useState } from 'react';
import API from '../../services/api';

import HistoryToolbar from './components/HistoryToolbar';
import HistoryTable from './components/HistoryTable';
import HistoryPagination from './components/HistoryPagination';

export default function History({
  user,
  setPage,
  setSelectedTransaction,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [historyData, setHistoryData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState('');

  const activeKasirName = user?.name || '-';

  // ==========================================
  // MENGAMBIL RIWAYAT TRANSAKSI DARI BACKEND
  // ==========================================
  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      try {
        setLoadingHistory(true);
        setHistoryError('');

        const response = await API.get('/pemesanan');

        if (!isMounted) return;

        const data = response.data?.data ?? [];

        const formattedHistory = (
          Array.isArray(data) ? data : []
        ).map((item) => {
          const transactionDate = item.created_at
            ? new Date(item.created_at)
            : null;

          const validDate =
            transactionDate &&
            !Number.isNaN(transactionDate.getTime());

          const invoice = String(
            item.kode_transaksi ?? `TRX-${item.id ?? ''}`
          );

          const statusRaw = String(item.status ?? '-');

          // Detail produk dari backend
          const details = (
            Array.isArray(item.detail) ? item.detail : []
          ).map((detail) => ({
            name: detail.nama_menu || '-',
            qty: Number(detail.jumlah || 0),
            price: Number(detail.harga || 0),
            subtotal: Number(detail.subtotal || 0),
          }));

          // Ringkasan produk untuk tabel
          const itemsSummary = details.length > 0
            ? details
                .map((detail) => `${detail.qty}x ${detail.name}`)
                .join(', ')
            : 'Detail produk tidak tersedia';

          const totalItemCount = details.reduce(
            (sum, detail) => sum + detail.qty,
            0
          );

          const totalValue = Number(item.total_harga || 0);

          return {
            id: item.id,

            invoiceId: invoice.startsWith('#')
              ? invoice
              : `#${invoice}`,

            // Data pelanggan
            namaPelanggan: item.nama_pelanggan || '-',
            nomorHp: item.nomor_hp || '-',

            // Data waktu
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

            // Data pembayaran
            method: String(
              item.metode_pembayaran ?? '-'
            ).toUpperCase(),

            totalValue,
            totalAmount: `Rp ${totalValue.toLocaleString('id-ID')}`,

            // Status
            status:
              statusRaw.toLowerCase() === 'selesai'
                ? 'Sukses'
                : statusRaw,

            // Data kasir
            kasir: activeKasirName,

            // Data produk
            details,
            itemsSummary,
            totalItemCount,

            // Field asli backend tetap disimpan
            kode_transaksi: item.kode_transaksi,
            nama_pelanggan: item.nama_pelanggan,
            nomor_hp: item.nomor_hp,
            metode_pembayaran: item.metode_pembayaran,
            total_harga: totalValue,
            detail: item.detail || [],
            created_at: item.created_at,
          };
        });

        setHistoryData(formattedHistory);

      } catch (error) {
        if (!isMounted) return;

        console.error(
          'Gagal mengambil riwayat transaksi:',
          error
        );

        setHistoryError(
          'Data riwayat transaksi gagal dimuat.'
        );

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
  }, [activeKasirName]);

  // ==========================================
  // PENCARIAN
  // ==========================================
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredHistory = historyData.filter((item) =>
    item.invoiceId.toLowerCase().includes(normalizedQuery) ||
    item.itemsSummary.toLowerCase().includes(normalizedQuery) ||
    item.namaPelanggan.toLowerCase().includes(normalizedQuery)
  );

  // ==========================================
  // PAGINATION
  // ==========================================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredHistory.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredHistory.length
  );

  const currentHistory = filteredHistory.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // ==========================================
  // BUKA BUKTI TRANSAKSI
  // ==========================================
  const handleOpenPreview = (item) => {
    if (
      typeof setSelectedTransaction === 'function' &&
      typeof setPage === 'function'
    ) {
      setSelectedTransaction(item);
      setPage('bukti-transaksi');
    }
  };

  return (
    <div className="w-full h-full min-w-0 flex flex-col gap-4 box-border">

      <HistoryToolbar
        activeKasirName={activeKasirName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
      />

      <div className="bg-white rounded-xl border border-[#E2DBD0] overflow-hidden flex-1 flex flex-col shadow-xs min-h-0">

        {loadingHistory ? (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
            Memuat riwayat transaksi...
          </div>
        ) : historyError ? (
          <div className="flex-1 flex items-center justify-center text-sm text-red-500">
            {historyError}
          </div>
        ) : (
          <>
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
          </>
        )}

      </div>
    </div>
  );
}
