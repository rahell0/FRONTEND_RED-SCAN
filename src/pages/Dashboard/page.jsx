import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

import WelcomeBanner from './components/WelcomeBanner.jsx';
import TransactionSummaryCard from './components/TransactionSummaryCard.jsx';
import RevenueCard from './components/RevenueCard.jsx';
import OrderSummaryCard from './components/OrderSummaryCard.jsx';
import RecentTransactions from './components/RecentTransactions.jsx';
import PrintReceiptModal from './components/PrintReceiptModal.jsx';
import TransactionProofModal from './components/TransactionProofModal.jsx';

export default function Dashboard({ user, shift }) {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const [stats, setStats] = useState({
    totalTransaksi: 0,
    totalOmzet: 0,
    qrisOmzet: 0,
    tunaiOmzet: 0,
    pesananDiproses: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showFullProof, setShowFullProof] = useState(false);

  // 1. Mengambil data statistik Dashboard
  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        setStatsError('');

        const response = await API.get('/dashboard/stats');

        if (!isMounted) return;

        const data =
          response.data?.stats ??
          response.data?.data ??
          response.data ??
          {};

        setStats({
          totalTransaksi: Number(data.totalTransaksi ?? data.total_transaksi ?? 0),
          totalOmzet: Number(data.totalOmzet ?? data.total_omzet ?? 0),
          qrisOmzet: Number(data.qrisOmzet ?? data.qris_omzet ?? 0),
          tunaiOmzet: Number(data.tunaiOmzet ?? data.tunai_omzet ?? 0),
          pesananDiproses: Number(data.pesananDiproses ?? data.pesanan_diproses ?? 0),
        });
      } catch (error) {
        if (!isMounted) return;

        console.error('Gagal mengambil statistik Dashboard:', error);
        setStatsError('Data statistik gagal dimuat.');
      } finally {
        if (isMounted) {
          setLoadingStats(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Mengambil data transaksi dari Backend
  useEffect(() => {
    let isMounted = true;

    const fetchTransactions = async () => {
      try {
        setLoadingTransactions(true);

        const response = await API.get('/pemesanan');

        if (!isMounted) return;

        const data = response.data?.data ?? [];

        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!isMounted) return;

        console.error('Gagal mengambil transaksi:', error);
        setTransactions([]);
      } finally {
        if (isMounted) {
          setLoadingTransactions(false);
        }
      }
    };

    fetchTransactions();

    return () => {
      isMounted = false;
    };
  }, []);

  // 3. Filter transaksi berdasarkan pencarian
  const filteredTransactions = transactions.filter((transaction) => {
    const keyword = searchQuery.toLowerCase();

    const invoice = String(
      transaction.kode_transaksi ?? ''
    ).toLowerCase();

    const nama = String(
      transaction.nama_pelanggan ?? ''
    ).toLowerCase();

    return invoice.includes(keyword) || nama.includes(keyword);
  });

  const handlePrintStruk = (transaction) => {
    setSelectedTransaction(transaction);
    setShowFullProof(false);
  };

  const handleOpenFullProof = (transaction) => {
    setSelectedTransaction(transaction);
    setShowFullProof(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setShowFullProof(false);
  };

  return (
    <div className="relative w-full space-y-6">
      <WelcomeBanner user={user} shift={shift} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <TransactionSummaryCard
          totalTransaksi={stats.totalTransaksi}
          loadingStats={loadingStats}
          statsError={statsError}
        />

        <RevenueCard
          totalOmzet={stats.totalOmzet}
          qrisOmzet={stats.qrisOmzet}
          tunaiOmzet={stats.tunaiOmzet}
        />

        <OrderSummaryCard
        pesananDiproses={stats.pesananDiproses}
        onClick={() => navigate('/pemesanan')}
      />
      </div>

      <RecentTransactions
        transactions={filteredTransactions}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onResetSearch={() => setSearchQuery('')}
        onPrint={handlePrintStruk}
        onOpenProof={handleOpenFullProof}
        onOpenHistory={() => navigate('/history')}
      />

      {selectedTransaction && !showFullProof && (
        <PrintReceiptModal
          isOpen={true}
          transaction={selectedTransaction}
          onClose={handleCloseModal}
        />
      )}

      {selectedTransaction && showFullProof && (
        <TransactionProofModal
          isOpen={true}
          transaction={selectedTransaction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
