
import { useEffect, useMemo, useState } from 'react';

import API from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

import MenuTable from './components/MenuTable.jsx';
import MenuModal from './components/MenuModal.jsx';
import RecipeModal from './components/RecipeModal.jsx';


const CATEGORIES = [
  'Non Kopi',
  'Teh',
  'Refresh',
  'Signature',
  'Tubruk / Saring',
  'Klasik',
  'Mie Ayam',
  'Nasi',
  'Roti',
  'Burger',
  'Basreng & Camilan',
];


const EMPTY_FORM = {
  nama_menu: '',
  kategori: 'Non Kopi',
  harga: '',
  deskripsi: '',
  gambar: '',
};

const IMAGE_BASE_URL = 'http://localhost:5000';

const getImageUrl = (gambar) => {
  if (!gambar) return '';

  if (
    gambar.startsWith('http://') ||
    gambar.startsWith('https://') ||
    gambar.startsWith('data:')
  ) {
    return gambar;
  }

  return `${IMAGE_BASE_URL}/${gambar.replace(/^\/+/, '')}`;
};

export default function Menu() {
  const { notify, confirm } = useNotification();

  const [menuData, setMenuData] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // STATE ATUR RESEP
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [selectedRecipeMenu, setSelectedRecipeMenu] = useState(null);
  const [recipeBahan, setRecipeBahan] = useState([]);
  const [recipeItems, setRecipeItems] = useState([]);
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  const [isRecipeSaving, setIsRecipeSaving] = useState(false);

  // ==========================================
  // MENGAMBIL DAFTAR MENU
  // ==========================================
  const fetchMenu = async () => {
    try {
      setErrorMessage('');

      const response = await API.get('/menu');
      setMenuData(response.data.data || []);
    } catch (error) {
      console.error('Gagal mengambil data menu:', error);

      setErrorMessage(
        error.response?.data?.message ||
          'Gagal mengambil data menu. Periksa koneksi backend.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // ==========================================
  // PENCARIAN DAN FILTER KATEGORI
  // ==========================================
  const filteredMenu = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return menuData.filter((item) => {
      const matchesCategory =
        activeCategory === 'Semua' ||
        item.kategori === activeCategory;

      const matchesSearch = String(item.nama_menu || '')
        .toLowerCase()
        .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [menuData, searchQuery, activeCategory]);

  // ==========================================
  // TAMBAH MENU
  // ==========================================
  const handleOpenAdd = () => {
    setEditItem(null);
    setFormData({ ...EMPTY_FORM });
    setImageFile(null);
    setImagePreview('');
    setIsModalOpen(true);
  };

  // ==========================================
  // EDIT MENU
  // ==========================================
  const handleOpenEdit = (item) => {
    setEditItem(item);

    setFormData({
      nama_menu: item.nama_menu || '',
      kategori: item.kategori || 'Non Kopi',
      harga: item.harga ?? '',
      deskripsi: item.deskripsi || '',
      gambar: item.gambar || '',
    });

    setImageFile(null);
    setImagePreview(getImageUrl(item.gambar));
    setIsModalOpen(true);
  };

  const handleImageChange = (file, preview) => {
    setImageFile(file);
    setImagePreview(preview);
  };

  // ==========================================
  // TUTUP MODAL MENU
  // ==========================================
  const handleCloseModal = () => {
    if (isSaving) return;

    setIsModalOpen(false);
    setEditItem(null);
    setFormData({ ...EMPTY_FORM });
    setImageFile(null);
    setImagePreview('');
  };

  // ==========================================
  // SIMPAN MENU
  // ==========================================
  const handleSave = async (e) => {
    e.preventDefault();

    const namaMenu = formData.nama_menu.trim();
    const hargaMenu = Number(formData.harga);

    if (!namaMenu || !formData.kategori) {
      notify(
        'Mohon lengkapi nama dan kategori menu.',
        'warning',
        'Data Belum Lengkap'
      );
      return;
    }

    if (
      formData.harga === '' ||
      !Number.isFinite(hargaMenu) ||
      hargaMenu < 0
    ) {
      notify(
        'Masukkan harga menu yang valid.',
        'warning',
        'Harga Tidak Valid'
      );
      return;
    }

    try {
      setIsSaving(true);

      const payload = new FormData();

      payload.append('nama_menu', namaMenu);
      payload.append('kategori', formData.kategori);
      payload.append('harga', String(hargaMenu));
      payload.append('deskripsi', formData.deskripsi.trim());

      if (imageFile) {
        payload.append('gambar', imageFile);
      } else {
        payload.append('gambar', formData.gambar || '');
      }

      if (editItem) {
        await API.put(`/menu/${editItem.id}`, payload);

        notify(
          'Menu berhasil diperbarui.',
          'success',
          'Menu Diperbarui'
        );
      } else {
        await API.post('/menu', payload);

        notify(
          'Menu baru berhasil ditambahkan.',
          'success',
          'Menu Ditambahkan'
        );
      }

      setIsModalOpen(false);
      setEditItem(null);
      setFormData({ ...EMPTY_FORM });
      setImageFile(null);
      setImagePreview('');

      await fetchMenu();
    } catch (error) {
      console.error('Gagal menyimpan menu:', error);

      notify(
        error.response?.data?.message ||
          'Gagal menyimpan data menu.',
        'error',
        'Gagal Menyimpan Menu'
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ==========================================
  // HAPUS MENU
  // ==========================================
  const handleDelete = async (item) => {
    const isConfirmed = await confirm({
      title: 'Hapus Menu?',
      message: `Apakah kamu yakin ingin menghapus menu "${item.nama_menu}"? Data menu yang dihapus tidak dapat dikembalikan.`,
      confirmText: 'Ya, Hapus',
      cancelText: 'Batal',
      danger: true,
    });

    if (!isConfirmed) return;

    try {
      await API.delete(`/menu/${item.id}`);

      notify(
        'Menu berhasil dihapus.',
        'success',
        'Menu Dihapus'
      );

      await fetchMenu();
    } catch (error) {
      console.error('Gagal menghapus menu:', error);

      notify(
        error.response?.data?.message ||
          'Gagal menghapus menu.',
        'error',
        'Gagal Menghapus Menu'
      );

      throw error;
    }
  };

  // ==========================================
  // MEMBUKA ATUR RESEP
  // ==========================================
  const handleOpenRecipe = async (item) => {
    setSelectedRecipeMenu(item);
    setRecipeBahan([]);
    setRecipeItems([]);
    setIsRecipeModalOpen(true);
    setIsRecipeLoading(true);

    try {
      const response = await API.get(`/menu/${item.id}/resep`);
      const data = response.data.data;

      setRecipeBahan(data.bahan || []);
      setRecipeItems(data.resep || []);
    } catch (error) {
      console.error('Gagal mengambil resep menu:', error);

      notify(
        error.response?.data?.message ||
          'Gagal mengambil data resep. Periksa koneksi backend.',
        'error',
        'Gagal Memuat Resep'
      );

      setIsRecipeModalOpen(false);
      setSelectedRecipeMenu(null);
    } finally {
      setIsRecipeLoading(false);
    }
  };

  // ==========================================
  // MENYIMPAN RESEP
  // ==========================================
  const handleSaveRecipe = async (items) => {
    if (!selectedRecipeMenu) return;

    try {
      setIsRecipeSaving(true);

      await API.put(
        `/menu/${selectedRecipeMenu.id}/resep`,
        { items }
      );

      notify(
        `Resep ${selectedRecipeMenu.nama_menu} berhasil disimpan.`,
        'success',
        'Resep Berhasil Disimpan'
      );

      setIsRecipeModalOpen(false);
      setSelectedRecipeMenu(null);
      setRecipeBahan([]);
      setRecipeItems([]);
    } catch (error) {
      console.error('Gagal menyimpan resep:', error);

      notify(
        error.response?.data?.message ||
          'Gagal menyimpan resep menu.',
        'error',
        'Gagal Menyimpan Resep'
      );
    } finally {
      setIsRecipeSaving(false);
    }
  };

  // ==========================================
  // MENUTUP ATUR RESEP
  // ==========================================
  const handleCloseRecipe = () => {
    if (isRecipeSaving) return;

    setIsRecipeModalOpen(false);
    setSelectedRecipeMenu(null);
    setRecipeBahan([]);
    setRecipeItems([]);
  };

  // ==========================================
  // TAMPILAN
  // ==========================================
  return (
    <div className="box-border flex h-full min-h-0 w-full min-w-0 flex-col gap-4">

      {/* RINGKASAN MENU */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Total Menu
          </p>

          <p className="mt-2 text-2xl font-bold text-[#402719]">
            {menuData.length}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Total menu yang terdaftar
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Total Kategori
          </p>

          <p className="mt-2 text-2xl font-bold text-[#402719]">
            {new Set(menuData.map((item) => item.kategori)).size}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Kategori yang memiliki menu
          </p>
        </div>
      </div>

      {/* PENCARIAN, FILTER, DAN TOMBOL TAMBAH */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama menu..."
            className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#402719]"
          />

          <button
            type="button"
            onClick={handleOpenAdd}
            className="rounded-xl bg-[#402719] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2F1D13]"
          >
            + Tambah Menu
          </button>
        </div>

        {/* FILTER KATEGORI */}
        <div className="flex flex-wrap gap-2">
          {['Semua', ...CATEGORIES].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                activeCategory === category
                  ? 'bg-[#402719] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* TABEL MENU */}
      {isLoading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500">
          Memuat data menu...
        </div>
      ) : errorMessage ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-center">
          <p className="text-sm text-red-600">{errorMessage}</p>

          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              fetchMenu();
            }}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <MenuTable
          filteredMenu={filteredMenu}
          totalMenu={menuData.length}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onManageRecipe={handleOpenRecipe}
        />
      )}

      {/* MODAL TAMBAH DAN EDIT MENU */}
      <MenuModal
        isOpen={isModalOpen}
        editItem={editItem}
        formData={formData}
        categories={CATEGORIES}
        onFormChange={setFormData}
        onImageChange={handleImageChange}
        imagePreview={imagePreview}
        onSave={handleSave}
        onClose={handleCloseModal}
        isSaving={isSaving}
      />

      {/* MODAL ATUR RESEP */}
      <RecipeModal
        isOpen={isRecipeModalOpen}
        menu={selectedRecipeMenu}
        bahan={recipeBahan}
        resepAwal={recipeItems}
        isLoading={isRecipeLoading}
        isSaving={isRecipeSaving}
        onClose={handleCloseRecipe}
        onSave={handleSaveRecipe}
      />
    </div>
  );
}
