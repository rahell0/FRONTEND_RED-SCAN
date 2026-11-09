import { useEffect, useMemo, useState } from 'react';

import API from '../../services/api';
import StockSummary from './components/StockSummary.jsx';
import StockSearchFilter from './components/StockSearchFilter.jsx';
import StockTable from './components/StockTable.jsx';
import StockModal from './components/StockModal.jsx';

const CATEGORIES = [
  'Semua',
  'Minuman',
  'Makanan',
  'Bumbu',
  'Lainnya',
];

const EMPTY_FORM = {
  kodeBahan: '',
  name: '',
  category: 'Minuman',
  stock: 0,
  unit: 'ml',
  minStock: 0,
};

function mapStockFromAPI(item) {
  let status = item.status_stok || 'Aman';

  // Menyesuaikan istilah status backend dengan tampilan frontend.
  if (status === 'Aman') {
    status = 'Cukup';
  }

  return {
    dbId: item.id,
    id: item.kode_bahan,
    name: item.nama_bahan,
    category: item.kategori,
    stock: Number(item.jumlah_stok),
    unit: item.satuan,
    minStock: Number(item.stok_minimum),
    status,
  };
}

export default function Stok({ setPage }) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockData, setStockData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  // Mengambil daftar bahan dari database.
  const fetchStock = async () => {
    try {
      setErrorMessage('');

      const response = await API.get('/stok');

      const rows = response.data.data || [];

      setStockData(rows.map(mapStockFromAPI));
    } catch (error) {
      console.error('Gagal mengambil data stok:', error);

      setErrorMessage(
        error.response?.data?.message ||
          'Gagal mengambil data stok. Periksa koneksi backend.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  // Pencarian dan filter kategori.
  const filteredStock = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return stockData.filter((item) => {
      const matchesCategory =
        activeCategory === 'Semua' ||
        item.category === activeCategory;

      const matchesSearch =
        String(item.name || '').toLowerCase().includes(query) ||
        String(item.id || '').toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [stockData, activeCategory, searchQuery]);

  // Membuka modal tambah bahan.
  const handleOpenAdd = () => {
    setEditItem(null);
    setFormData({ ...EMPTY_FORM });
    setIsModalOpen(true);
  };

  // Membuka modal edit bahan.
  const handleOpenEdit = (item) => {
    setEditItem(item);

    setFormData({
      kodeBahan: item.id || '',
      name: item.name || '',
      category: item.category || 'Lainnya',
      stock: item.stock ?? 0,
      unit: item.unit || '',
      minStock: item.minStock ?? 0,
    });

    setIsModalOpen(true);
  };

  // Menutup modal.
  const handleCloseModal = () => {
    if (isSaving) return;

    setIsModalOpen(false);
    setEditItem(null);
    setFormData({ ...EMPTY_FORM });
  };

  // Menyimpan bahan baru atau perubahan data bahan.
  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      kode_bahan: formData.kodeBahan.trim(),
      nama_bahan: formData.name.trim(),
      kategori: formData.category,
      satuan: formData.unit.trim(),
      stok_minimum: Number(formData.minStock),
    };

    if (
      !payload.kode_bahan ||
      !payload.nama_bahan ||
      !payload.satuan
    ) {
      alert('Mohon lengkapi semua data bahan.');
      return;
    }

    if (
      Number(payload.stok_minimum) < 0 ||
      Number(formData.stock) < 0
    ) {
      alert('Jumlah stok tidak boleh negatif.');
      return;
    }

    try {
      setIsSaving(true);

      if (editItem) {
        // Edit data bahan.
        await API.put(`/stok/${editItem.dbId}`, payload);

        alert('Data bahan berhasil diperbarui.');
      } else {
        // Tambah bahan baru.
        await API.post('/stok', {
          ...payload,
          jumlah_stok: Number(formData.stock),
        });

        alert('Bahan baru berhasil ditambahkan.');
      }

      setIsModalOpen(false);
      setEditItem(null);
      setFormData({ ...EMPTY_FORM });

      // Ambil ulang data terbaru dari database.
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

  // Fitur hapus belum dihubungkan karena backend belum memiliki DELETE.
  const handleDelete = () => {
    alert(
      'Fitur hapus bahan belum tersedia di backend.'
    );
  };

  // Menghitung ringkasan stok.
  const stokMenipis = stockData.filter(
    (item) => item.status === 'Menipis'
  ).length;

  const stokHabis = stockData.filter(
    (item) => item.status === 'Habis'
  ).length;

  return (
    <div className="box-border flex h-full min-h-0 w-full min-w-0 flex-col gap-4">
      <StockSummary
        totalBahan={stockData.length}
        stokMenipis={stokMenipis}
        stokHabis={stokHabis}
      />

      <StockSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAdd={handleOpenAdd}
      />

      {isLoading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500">
          Memuat data stok...
        </div>
      ) : errorMessage ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-center">
          <p className="text-sm text-red-600">
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              fetchStock();
            }}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <StockTable
          filteredStock={filteredStock}
          totalStock={stockData.length}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}

      <StockModal
        isOpen={isModalOpen}
        editItem={editItem}
        formData={formData}
        categories={CATEGORIES.filter(
          (category) => category !== 'Semua'
        )}
        onFormChange={setFormData}
        onSave={handleSave}
        onClose={handleCloseModal}
        isSaving={isSaving}
      />
    </div>
  );
}