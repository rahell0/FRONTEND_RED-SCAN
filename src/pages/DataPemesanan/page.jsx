
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import API from '../../services/api';

import OrderSearchFilter from './components/OrderSearchFilter.jsx';
import OrdersTable from './components/OrdersTable.jsx';
import EditOrderModal from './components/EditOrderModal.jsx';

export default function DataPemesanan() {
  // 1. STATE
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    customer: '',
    time: '',
    type: 'Dine In',
    status: 'diproses',
  });

  // 2. MENGAMBIL DATA PEMESANAN DARI BACKEND
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      const response = await API.get('/pemesanan');

      const data = response.data?.data ?? [];

      const formattedOrders = (Array.isArray(data) ? data : []).map(
        (item) => {
          const date = item.created_at
            ? new Date(item.created_at)
            : null;

          const validDate =
            date && !Number.isNaN(date.getTime());

          const statusRaw = String(
            item.status ?? '-'
          ).toLowerCase();

          let displayStatus = statusRaw;

          if (statusRaw === 'antre') {
            displayStatus = 'antre';
          } else if (
            statusRaw === 'menunggu' ||
            statusRaw === 'pending' ||
            statusRaw === 'menunggu pembayaran'
          ) {
            displayStatus = 'menunggu pembayaran';
          } else if (statusRaw === 'diproses') {
            displayStatus = 'diproses';
          } else if (statusRaw === 'selesai') {
            displayStatus = 'selesai';
          }

          return {
            id: String(item.id),
            invoice: item.kode_transaksi ?? '-',
            customer: '-',

            time: validDate
              ? date.toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '-',

            type: '-',
            items: [],

            totalAmount: Number(item.total_harga ?? 0),
            method: item.metode_pembayaran ?? '-',
            status: displayStatus,
          };
        }
      );

      setOrderData(formattedOrders);
    } catch (error) {
      console.error(
        'Gagal mengambil data pemesanan:',
        error
      );

      setErrorMessage(
        'Gagal memuat data pemesanan dari server.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 3. FILTER DAN PENCARIAN
  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return orderData.filter((item) => {
      const matchesFilter =
        activeFilter === 'Semua' ||
        item.status === activeFilter.toLowerCase() ||
        item.type === activeFilter;

      if (!matchesFilter) return false;

      if (!query) return true;

      return (
        item.customer.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.invoice.toLowerCase().includes(query)
      );
    });
  }, [orderData, activeFilter, searchQuery]);

  // 4. MEMBUKA MODAL EDIT
  const handleOpenEdit = useCallback((order) => {
    setSelectedOrder(order);

    setFormData({
      ...order,
      status: order.status,
    });

    setIsModalOpen(true);
  }, []);

  // 5. MENUTUP MODAL
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // 6. MENYIMPAN PERUBAHAN STATUS KE BACKEND
  const handleSave = async (e) => {
    e.preventDefault();

    if (!selectedOrder) return;

    try {
      const response = await API.put(
        `/pemesanan/${selectedOrder.id}/status`,
        {
          status: formData.status,
        }
      );

      if (response.data?.success === false) {
        throw new Error(
          response.data.message || 'Gagal memperbarui status.'
        );
      }

      // Ambil ulang data terbaru dari database
      await fetchOrders();

      setIsModalOpen(false);
      setSelectedOrder(null);

      alert('Status pesanan berhasil diperbarui!');
    } catch (error) {
      console.error(
        'Gagal memperbarui status:',
        error
      );

      alert(
        error.response?.data?.message ||
        error.message ||
        'Gagal memperbarui status pesanan.'
      );
    }
  };

  // 7. TAMPILAN HALAMAN
  return (
    <div className="flex w-full flex-col gap-4">

      {loading && (
        <div className="rounded-xl bg-white p-5 text-center text-sm text-gray-500">
          Memuat data pemesanan...
        </div>
      )}

      {!loading && errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}

          <button
            type="button"
            onClick={fetchOrders}
            className="ml-2 font-bold underline"
          >
            Coba lagi
          </button>
        </div>
      )}

      {!loading && !errorMessage && (
        <>
          <OrderSearchFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <OrdersTable
            filteredOrders={filteredOrders}
            totalOrders={orderData.length}
            onEdit={handleOpenEdit}
          />
        </>
      )}

      {isModalOpen && (
        <EditOrderModal
          selectedOrder={selectedOrder}
          formData={formData}
          onFormChange={setFormData}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
