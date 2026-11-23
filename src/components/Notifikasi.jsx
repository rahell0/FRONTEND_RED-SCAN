
import React, { useState, useEffect, useCallback } from 'react';
import {
  Bell,
  CheckCircle2,
  RotateCw,
  AlertTriangle,
  ShoppingBag,
  Info,
  Search,
  Trash2,
  Clock,
} from 'lucide-react';

import API from '../services/api';
import { useNotification } from '../context/NotificationContext';

// ==========================================
// HELPER: MENENTUKAN KATEGORI NOTIFIKASI
// ==========================================
const getKategori = (tipe) => {
  const jenis = String(tipe || '').toLowerCase();

  if (jenis === 'stok_habis' || jenis === 'stok_menipis') {
    return 'stok';
  }

  if (
    jenis === 'pesanan_baru' ||
    jenis === 'pesanan_diproses' ||
    jenis === 'pesanan_selesai'
  ) {
    return 'pesanan';
  }

  return 'sistem';
};

// ==========================================
// HELPER: FORMAT TANGGAL NOTIFIKASI
// ==========================================
const formatWaktu = (tanggal) => {
  if (!tanggal) return '-';

  const waktu = new Date(String(tanggal).replace(' ', 'T'));

  if (Number.isNaN(waktu.getTime())) return '-';

  const sekarang = new Date();
  const selisih = Math.max(
    0,
    sekarang.getTime() - waktu.getTime()
  );

  const menit = Math.floor(selisih / 60000);

  if (menit < 1) return 'Baru saja';
  if (menit < 60) return `${menit} menit lalu`;

  const jam = Math.floor(menit / 60);

  if (jam < 24) return `${jam} jam lalu`;

  const hari = Math.floor(jam / 24);

  if (hari < 7) return `${hari} hari lalu`;

  return waktu.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// ==========================================
// HELPER: FORMAT NOTIFIKASI DARI DATABASE
// ==========================================
const formatNotifikasi = (item) => {
  const kategori = getKategori(item.tipe);
  const jenis = String(item.tipe || '').toLowerCase();

  let badge = 'Info Sistem';
  let bgBadge = 'bg-blue-100 text-blue-700';
  let iconBg = 'bg-blue-50';
  let icon = <Info className="text-blue-500" size={18} />;

  if (jenis === 'stok_habis') {
    badge = 'Stok Habis';
    bgBadge = 'bg-red-100 text-red-600';
    iconBg = 'bg-red-50';
    icon = <AlertTriangle className="text-red-500" size={18} />;
  } else if (jenis === 'stok_menipis') {
    badge = 'Stok Menipis';
    bgBadge = 'bg-amber-100 text-amber-700';
    iconBg = 'bg-amber-50';
    icon = <AlertTriangle className="text-amber-500" size={18} />;
  } else if (jenis === 'pesanan_baru') {
    badge = 'Pesanan Baru';
    bgBadge = 'bg-emerald-100 text-emerald-700';
    iconBg = 'bg-emerald-50';
    icon = <ShoppingBag className="text-emerald-600" size={18} />;
  } else if (jenis === 'pesanan_diproses') {
    badge = 'Pesanan Diproses';
    bgBadge = 'bg-blue-100 text-blue-700';
    iconBg = 'bg-blue-50';
    icon = <ShoppingBag className="text-blue-600" size={18} />;
  } else if (jenis === 'pesanan_selesai') {
    badge = 'Pesanan Selesai';
    bgBadge = 'bg-purple-100 text-purple-700';
    iconBg = 'bg-purple-50';
    icon = <CheckCircle2 className="text-purple-600" size={18} />;
  }

  return {
    ...item,
    kategori,
    badge,
    bgBadge,
    iconBg,
    icon,
    sudahDibaca: Number(item.sudah_dibaca) === 1,
    waktu: formatWaktu(item.created_at),
  };
};

// ==========================================
// KOMPONEN UTAMA NOTIFIKASI
// ==========================================
export default function Notifikasi({ shift, setPage }) {
  const { refreshUnreadCount } = useNotification();

  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // ========================================
  // MENGAMBIL DATA NOTIFIKASI DARI DATABASE
  // ========================================
  const fetchNotifikasi = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');

      const response = await API.get('/notifikasi');

      if (response.data.success !== true) {
        throw new Error(
          response.data.message || 'Gagal mengambil notifikasi.'
        );
      }

      const data = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      setNotifications(data.map(formatNotifikasi));

      await refreshUnreadCount();
    } catch (err) {
      console.error('Gagal mengambil notifikasi:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Gagal mengambil data notifikasi dari server.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [refreshUnreadCount]);

  useEffect(() => {
    fetchNotifikasi();
  }, [fetchNotifikasi]);

  // ========================================
  // MENANDAI SATU NOTIFIKASI SUDAH DIBACA
  // ========================================
  const handleTandaiDibaca = async (id) => {
    try {
      await API.patch(`/notifikasi/${id}/baca`);

      setNotifications((prev) =>
        prev.map((item) =>
          Number(item.id) === Number(id)
            ? { ...item, sudahDibaca: true, sudah_dibaca: 1 }
            : item
        )
      );

      await refreshUnreadCount();
    } catch (err) {
      console.error('Gagal menandai notifikasi:', err);

      alert(
        err.response?.data?.message ||
        'Gagal memperbarui notifikasi.'
      );
    }
  };

  // ========================================
  // MENANDAI SEMUA NOTIFIKASI SUDAH DIBACA
  // ========================================
  const handleTandaiSemuaDibaca = async () => {
    const belumDibaca = notifications.filter(
      (item) => !item.sudahDibaca
    ).length;

    if (belumDibaca === 0) {
      alert('Semua notifikasi sudah dibaca.');
      return;
    }

    try {
      await API.patch('/notifikasi/baca-semua');

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          sudahDibaca: true,
          sudah_dibaca: 1,
        }))
      );

      await refreshUnreadCount();
    } catch (err) {
      console.error('Gagal memperbarui semua notifikasi:', err);

      alert(
        err.response?.data?.message ||
        'Gagal menandai semua notifikasi.'
      );
    }
  };

  // ========================================
  // MENGHAPUS SATU NOTIFIKASI
  // ========================================
  const handleHapusNotifikasi = async (id) => {
    const konfirmasi = window.confirm(
      'Apakah kamu yakin ingin menghapus notifikasi ini?'
    );

    if (!konfirmasi) return;

    try {
      await API.delete(`/notifikasi/${id}`);

      setNotifications((prev) =>
        prev.filter(
          (item) => Number(item.id) !== Number(id)
        )
      );

      await refreshUnreadCount();
    } catch (err) {
      console.error('Gagal menghapus notifikasi:', err);

      alert(
        err.response?.data?.message ||
        'Gagal menghapus notifikasi.'
      );
    }
  };

  // ========================================
  // HITUNG STATISTIK DARI DATABASE
  // ========================================
  const totalMasuk = notifications.length;

  const totalStok = notifications.filter(
    (item) => item.kategori === 'stok'
  ).length;

  const totalPesanan = notifications.filter(
    (item) => item.kategori === 'pesanan'
  ).length;

  const totalSistem = notifications.filter(
    (item) => item.kategori === 'sistem'
  ).length;

  const totalBelumDibaca = notifications.filter(
    (item) => !item.sudahDibaca
  ).length;

  // ========================================
  // FILTER DAN PENCARIAN
  // ========================================
  const filteredNotifs = notifications.filter((item) => {
    const matchTab =
      activeTab === 'semua' ||
      item.kategori === activeTab;

    const kataKunci = searchQuery.toLowerCase();

    const matchSearch =
      String(item.judul || '').toLowerCase().includes(kataKunci) ||
      String(item.pesan || '').toLowerCase().includes(kataKunci) ||
      String(item.tipe || '').toLowerCase().includes(kataKunci);

    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* JUDUL HALAMAN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-[#1F1915] tracking-tight">
            Pusat Notifikasi
          </h1>

          <p className="text-xs text-[#7A7167] mt-0.5">
            Pantau update stok, pesanan baru, dan informasi sistem.
          </p>

          <p className="text-xs text-[#7A7167] mt-1">
            {totalBelumDibaca} notifikasi belum dibaca
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">

          <button
            onClick={handleTandaiSemuaDibaca}
            disabled={totalBelumDibaca === 0}
            className="flex items-center justify-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 size={14} />
            <span>Tandai Semua Dibaca</span>
          </button>

          <button
            onClick={() => fetchNotifikasi(true)}
            disabled={refreshing}
            className="flex items-center justify-center gap-1.5 bg-[#1C1613] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#2A201B] transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCw
              size={14}
              className={refreshing ? 'animate-spin' : ''}
            />
            <span>
              {refreshing ? 'Memuat...' : 'Refresh'}
            </span>
          </button>

        </div>
      </div>

      {/* KARTU STATISTIK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Bell className="text-amber-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1F1915] leading-none">
              {totalMasuk}
            </div>
            <div className="text-xs font-medium text-[#7A7167] mt-1">
              Total Masuk
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1F1915] leading-none">
              {totalStok}
            </div>
            <div className="text-xs font-medium text-[#7A7167] mt-1">
              Notifikasi Stok
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <ShoppingBag className="text-emerald-600" size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1F1915] leading-none">
              {totalPesanan}
            </div>
            <div className="text-xs font-medium text-[#7A7167] mt-1">
              Notifikasi Pesanan
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Info className="text-blue-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1F1915] leading-none">
              {totalSistem}
            </div>
            <div className="text-xs font-medium text-[#7A7167] mt-1">
              Info Sistem
            </div>
          </div>
        </div>

      </div>

      {/* PENCARIAN DAN FILTER */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6DFD5] flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs">

        <div className="relative w-full sm:w-80 h-10">

          <div className="absolute inset-y-0 left-3 z-10 flex items-center justify-center pointer-events-none">
            <Search
              size={17}
              strokeWidth={2.5}
              className="text-[#5F554C] shrink-0"
            />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pesanan, stok bahan, atau info alert..."
            className="w-full h-10 bg-[#F4F1EA] border border-[#D8D1C9] rounded-xl pl-10 pr-3 text-xs leading-normal outline-none focus:border-[#E54322] transition-colors"
          />

        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">

          {[
            { id: 'semua', label: 'Semua', jumlah: totalMasuk },
            { id: 'stok', label: 'Stok', jumlah: totalStok },
            { id: 'pesanan', label: 'Pesanan', jumlah: totalPesanan },
            { id: 'sistem', label: 'Sistem', jumlah: totalSistem },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#1C1613] text-white'
                  : 'text-[#7A7167] hover:bg-[#F4F1EA]'
              }`}
            >
              {tab.label} ({tab.jumlah})
            </button>
          ))}

        </div>
      </div>

      {/* PESAN ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs">
          <p className="font-bold mb-1">
            Gagal memuat notifikasi
          </p>
          <p>{error}</p>

          <button
            onClick={() => fetchNotifikasi(true)}
            className="mt-2 underline font-bold"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* DAFTAR NOTIFIKASI */}
      <div className="flex flex-col gap-3">

        {loading ? (
          <div className="bg-white p-8 rounded-2xl text-center text-xs text-[#7A7167] border border-[#E6DFD5]">
            Sedang mengambil data notifikasi dari database...
          </div>
        ) : filteredNotifs.length > 0 ? (

          filteredNotifs.map((item) => (
            <div
              key={item.id}
              className={`bg-white p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#D8D1C9] transition-all ${
                item.sudahDibaca
                  ? 'border-[#E6DFD5]'
                  : 'border-[#E6DFD5]'
              }`}
            >

              <div className="flex items-start gap-4">

                <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                  {item.icon}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.bgBadge}`}>
                      {item.badge}
                    </span>

                    <h4 className="text-sm font-bold text-[#1F1915] m-0">
                      {item.judul}
                    </h4>

                    {!item.sudahDibaca && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-amber-500"
                        title="Belum dibaca"
                      />
                    )}

                  </div>

                  <p className="text-xs text-[#7A7167] mt-1 m-0">
                    {item.pesan}
                  </p>

                  <div className="flex items-center gap-1 mt-2 text-[10px] text-[#9A9188]">
                    <Clock size={11} />
                    <span>{item.waktu}</span>
                    <span>•</span>
                    <span>
                      {item.sudahDibaca
                        ? 'Sudah dibaca'
                        : 'Belum dibaca'}
                    </span>
                  </div>

                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">

                {!item.sudahDibaca && (
                  <button
                    onClick={() => handleTandaiDibaca(item.id)}
                    className="px-3.5 py-2 text-xs font-bold text-[#7A7167] hover:bg-[#F4F1EA] rounded-xl transition-colors cursor-pointer"
                  >
                    Tandai Dibaca
                  </button>
                )}

                <button
                  onClick={() => handleHapusNotifikasi(item.id)}
                  title="Hapus notifikasi"
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>

              </div>
            </div>
          ))

        ) : (

          <div className="bg-white p-8 rounded-2xl text-center text-xs text-[#7A7167] border border-[#E6DFD5]">
            {notifications.length === 0
              ? 'Belum ada notifikasi di database.'
              : 'Tidak ada notifikasi pada kategori atau pencarian ini.'}
          </div>

        )}

      </div>

    </div>
  );
}
