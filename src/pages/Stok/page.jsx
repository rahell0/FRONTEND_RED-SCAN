
import { useEffect, useMemo, useState } from 'react';

import API from '../../services/api';
import StockSummary from './components/StockSummary.jsx';
import StockSearchFilter from './components/StockSearchFilter.jsx';
import StockTable from './components/StockTable.jsx';
import StockModal from './components/StockModal.jsx';

const CATEGORIES = [
  'Semua Bahan',
  'Minuman',
  'Makanan',
  'Bumbu',
  'Lainnya',
];

const STATUSES = [
  'Semua',
  'Cukup',
  'Menipis',
  'Habis',
];

const INITIAL_FORM = {
  kodeBahan: '',
  name: '',
  category: 'Lainnya',
  stock: '',
  unit: '',
  minStock: '',
  status: 'Cukup',
};

// Mengubah data dari database menjadi format frontend
const mapStockFromAPI = (item) => ({
  dbId: item.id,
  id: item.kode_bahan || `BHN-${item.id}`,
  kodeBahan: item.kode_bahan || '',
  name: item.nama_bahan || '',
  category: item.kategori || 'Lainnya',
  stock: Number(item.jumlah_stok || 0),
  unit: item.satuan || '',
  minStock: Number(item.stok_minimum || 0),
  status: item.status_stok || 'Cukup',
});

export default function Stok() {
  const [stockData, setStockData] = useState([]);

  // Saat pertama dibuka, tampilkan semua kategori bahan
  const [activeCategory, setActiveCategory] = useState('Semua Bahan');
  const [activeStatus, setActiveStatus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // ==========================================
  // 1. MENGAMBIL DATA STOK DARI DATABASE
  // ==========================================

  const fetchStock = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await API.get('/stok');
      const result = response.data;

      const items = Array.isArray(result)
        ? result
        : result.data || [];

      setStockData(items.map(mapStockFromAPI));
    } catch (error) {
      console.error('Gagal mengambil stok:', error);

      setErrorMessage(
        error.response?.data?.message ||
        'Gagal mengambil data stok bahan.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  // ==========================================
  // 2. MENGHITUNG RINGKASAN STOK
  // ==========================================

  const summary = useMemo(() => {
    return {
      totalBahan: stockData.length,

      stokMenipis: stockData.filter(
        (item) => item.status === 'Menipis'
      ).length,

      stokHabis: stockData.filter(
        (item) => item.status === 'Habis'
      ).length,
    };
  }, [stockData]);

  // ==========================================
  // 3. FILTER DAN PENCARIAN STOK
  // ==========================================

  const filteredStock = useMemo(() => {
    return stockData.filter((item) => {
      const matchesCategory =
        activeCategory === 'Semua Bahan' ||
        item.category === activeCategory;

      const matchesStatus =
        activeStatus === 'Semua' ||
        item.status === activeStatus;

      const keyword = searchQuery.toLowerCase().trim();

      const matchesSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.id.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      return (
        matchesCategory &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    stockData,
    activeCategory,
    activeStatus,
    searchQuery,
  ]);

  // ==========================================
  // 4. MEMBUKA MODAL TAMBAH BAHAN
  // ==========================================

  const handleOpenAdd = () => {
    setEditItem(null);
    setFormData(INITIAL_FORM);
    setIsModalOpen(true);
  };

  // ==========================================
  // 5. MEMBUKA MODAL EDIT BAHAN
  // ==========================================

  const handleOpenEdit = (item) => {
    setEditItem(item);

    setFormData({
      kodeBahan: item.kodeBahan,
      name: item.name,
      category: item.category,
      stock: item.stock,
      unit: item.unit,
      minStock: item.minStock,
      status: item.status,
    });

    setIsModalOpen(true);
  };

  // ==========================================
  // 6. MENGUBAH ISI FORM
  // ==========================================

  const handleFormChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ==========================================
  // 7. MENUTUP MODAL
  // ==========================================

  const handleCloseModal = () => {
    if (isSaving) return;

    setIsModalOpen(false);
    setEditItem(null);
    setFormData(INITIAL_FORM);
  };

  // ==========================================
  // 8. MENYIMPAN TAMBAH / EDIT BAHAN
  // ==========================================

  const handleSave = async () => {
    if (
      !formData.kodeBahan.trim() ||
      !formData.name.trim() ||
      !formData.category ||
      !formData.unit.trim() ||
      formData.stock === '' ||
      formData.minStock === ''
    ) {
      alert('Mohon lengkapi semua data bahan.');
      return;
    }

    const jumlahStok = Number(formData.stock);
    const stokMinimum = Number(formData.minStock);

    if (
      !Number.isFinite(jumlahStok) ||
      !Number.isFinite(stokMinimum) ||
      jumlahStok < 0 ||
      stokMinimum < 0
    ) {
      alert('Jumlah stok dan stok minimum harus berupa angka minimal 0.');
      return;
    }

    const statusStok =
      jumlahStok === 0
        ? 'Habis'
        : jumlahStok <= stokMinimum
          ? 'Menipis'
          : 'Cukup';

    const payload = {
      kode_bahan: formData.kodeBahan.trim(),
      nama_bahan: formData.name.trim(),
      kategori: formData.category,
      jumlah_stok: jumlahStok,
      satuan: formData.unit.trim(),
      stok_minimum: stokMinimum,
      status_stok: statusStok,
    };

    try {
      setIsSaving(true);

      if (editItem) {
        await API.put(
          `/stok/${editItem.dbId}`,
          payload
        );

        alert('Data bahan berhasil diperbarui.');
      } else {
        await API.post('/stok', payload);

        alert('Bahan berhasil ditambahkan.');
      }

      setIsModalOpen(false);
      setEditItem(null);
      setFormData(INITIAL_FORM);

      await fetchStock();
    } catch (error) {
      console.error('Gagal menyimpan bahan:', error);

      alert(
        error.response?.data?.message ||
        'Gagal menyimpan data bahan.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ==========================================
  // 9. MENGHAPUS BAHAN
  // ==========================================

  const handleDelete = async (item) => {
    const konfirmasi = window.confirm(
      `Apakah kamu yakin ingin menghapus bahan "${item.name}"?`
    );

    if (!konfirmasi) return;

    try {
      await API.delete(`/stok/${item.dbId}`);

      alert('Bahan berhasil dihapus.');

      await fetchStock();
    } catch (error) {
      console.error('Gagal menghapus bahan:', error);

      alert(
        error.response?.data?.message ||
        'Gagal menghapus bahan.'
      );
    }
  };

  // ==========================================
  // 10. TAMPILAN HALAMAN STOK
  // ==========================================

  return (
    <div className="space-y-6">

      {/* Judul halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Manajemen Stok Bahan
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Kelola persediaan bahan dan pantau kondisi stok.
        </p>
      </div>

      {/* Ringkasan stok */}
      <StockSummary
        totalBahan={summary.totalBahan}
        stokMenipis={summary.stokMenipis}
        stokHabis={summary.stokHabis}
      />

      {/* Pencarian dan filter */}
      <StockSearchFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        statuses={STATUSES}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdd={handleOpenAdd}
      />

      {/* Pesan error */}
      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}

          <button
            type="button"
            onClick={fetchStock}
            className="ml-2 font-semibold underline"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* Tabel stok */}
      {isLoading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500">
          Memuat data stok...
        </div>
      ) : (
        <StockTable
          filteredStock={filteredStock}
          totalStock={stockData.length}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal tambah dan edit */}
      <StockModal
        isOpen={isModalOpen}
        editItem={editItem}
        formData={formData}
        categories={CATEGORIES}
        onFormChange={handleFormChange}
        onSave={handleSave}
        onClose={handleCloseModal}
        isSaving={isSaving}
      />

    </div>
  );
}
