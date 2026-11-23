
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import API from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

import OrderSearchFilter from './components/OrderSearchFilter.jsx';
import OrdersTable from './components/OrdersTable.jsx';
import EditOrderModal from './components/EditOrderModal.jsx';

export default function DataPemesanan() {
  const { notify } = useNotification();

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

  // Mengambil data pemesanan dari backend.
  // silent = true berarti memperbarui data tanpa loading ulang.
  const fetchOrders = useCallback(async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
        setErrorMessage('');
      }

      const response = await API.get('/pemesanan');
      const data = response.data?.data ?? [];

      const formattedOrders = (
        Array.isArray(data) ? data : []
      ).map((item) => {
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
          customer: item.nama_pelanggan ?? '-',

          time: validDate
            ? date.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : '-',

          type: '-',

          items: Array.isArray(item.detail)
            ? item.detail.map((detail) => ({
                qty: Number(detail.jumlah ?? 0),
                name: detail.nama_menu ?? '-',
                price: Number(detail.harga ?? 0),
                subtotal: Number(detail.subtotal ?? 0),
              }))
            : [],

          totalAmount: Number(item.total_harga ?? 0),
          method: item.metode_pembayaran ?? '-',
          status: displayStatus,
        };
      });

      setOrderData(formattedOrders);
    } catch (error) {
      console.error(
        'Gagal mengambil data pemesanan:',
        error
      );

      if (!silent) {
        setErrorMessage(
          'Gagal memuat data pemesanan dari server.'
        );
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, []);

  // Ambil data pertama kali dan perbarui setiap 5 detik.
  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  // Filter dan pencarian.
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
        String(item.customer || '')
          .toLowerCase()
          .includes(query) ||
        String(item.id || '')
          .toLowerCase()
          .includes(query) ||
        String(item.invoice || '')
          .toLowerCase()
          .includes(query)
      );
    });
  }, [orderData, activeFilter, searchQuery]);

  // Membuka modal edit.
  const handleOpenEdit = useCallback((order) => {
    setSelectedOrder(order);

    setFormData({
      ...order,
      status: order.status,
    });

    setIsModalOpen(true);
  }, []);

  // Menutup modal.
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Menyimpan perubahan status.
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
          response.data.message ||
            'Gagal memperbarui status.'
        );
      }

      await fetchOrders();

      setIsModalOpen(false);
      setSelectedOrder(null);

      notify(
        'Status pesanan berhasil diperbarui!',
        'success',
        'Status Berhasil Diperbarui'
      );
    } catch (error) {
      console.error(
        'Gagal memperbarui status:',
        error
      );

      notify(
        error.response?.data?.message ||
          error.message ||
          'Gagal memperbarui status pesanan.',
        'error',
        'Gagal Memperbarui Status'
      );
    }
  };

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
