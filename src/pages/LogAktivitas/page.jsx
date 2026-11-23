
import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity,
  Search,
  RotateCw,
  User,
  ClipboardList,
  Boxes,
  ShoppingBag,
  ShieldCheck,
  Clock,
} from 'lucide-react';

import API from '../../services/api';

// ==========================================
// FORMAT TANGGAL
// ==========================================
const formatTanggal = (tanggal) => {
  if (!tanggal) return '-';

  const date = new Date(tanggal);

  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// ==========================================
// KATEGORI AKTIVITAS
// ==========================================
const getKategori = (aktivitas) => {
  const value = String(aktivitas || '').toUpperCase();

  if (value.includes('LOGIN')) return 'Autentikasi';
  if (value.includes('STOK')) return 'Stok';
  if (value.includes('PESANAN')) return 'Pemesanan';
  if (value.includes('PROFIL')) return 'Profil';

  return 'Sistem';
};

const getIcon = (kategori) => {
  switch (kategori) {
    case 'Autentikasi':
      return <ShieldCheck size={17} className="text-blue-600" />;
    case 'Stok':
      return <Boxes size={17} className="text-amber-600" />;
    case 'Pemesanan':
      return <ShoppingBag size={17} className="text-emerald-600" />;
    case 'Profil':
      return <User size={17} className="text-purple-600" />;
    default:
      return <Activity size={17} className="text-gray-600" />;
  }
};

const getBadge = (kategori) => {
  const styles = {
    Autentikasi: 'bg-blue-100 text-blue-700',
    Stok: 'bg-amber-100 text-amber-700',
    Pemesanan: 'bg-emerald-100 text-emerald-700',
    Profil: 'bg-purple-100 text-purple-700',
    Sistem: 'bg-gray-100 text-gray-700',
  };

  return styles[kategori] || styles.Sistem;
};

// ==========================================
// KOMPONEN UTAMA
// ==========================================
export default function LogAktivitas() {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // ========================================
  // AMBIL DATA DARI BACKEND
  // ========================================
  const fetchLogs = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');

      const response = await API.get('/logs/activity');

      if (response.data.success !== true) {
        throw new Error(
          response.data.message || 'Gagal mengambil log aktivitas.'
        );
      }

      setLogs(
        Array.isArray(response.data.data)
          ? response.data.data
          : []
      );
    } catch (err) {
      console.error('Gagal mengambil log aktivitas:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Gagal mengambil data log aktivitas.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // ========================================
  // FILTER PENCARIAN
  // ========================================
  const filteredLogs = logs.filter((item) => {
    const keyword = searchQuery.toLowerCase();

    return (
      String(item.user_email || '').toLowerCase().includes(keyword) ||
      String(item.aktivitas || '').toLowerCase().includes(keyword) ||
      String(item.deskripsi || '').toLowerCase().includes(keyword) ||
      String(item.modul || '').toLowerCase().includes(keyword) ||
      String(item.referensi_id || '').toLowerCase().includes(keyword)
    );
  });

  const totalLogin = logs.filter(
    (item) => String(item.aktivitas).includes('LOGIN')
  ).length;

  const totalStok = logs.filter(
    (item) => getKategori(item.aktivitas) === 'Stok'
  ).length;

  const totalPemesanan = logs.filter(
    (item) => getKategori(item.aktivitas) === 'Pemesanan'
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1F1915]">
            Log Aktivitas
          </h1>

          <p className="mt-1 text-xs text-[#7A7167]">
            Pantau dan telusuri seluruh aktivitas admin REDScan.
          </p>

          <p className="mt-1 text-xs text-[#7A7167]">
            Total {logs.length} aktivitas tercatat.
          </p>
        </div>

        <button
          onClick={() => fetchLogs(true)}
          disabled={refreshing}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#1C1613] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#332620] disabled:opacity-50"
        >
          <RotateCw
            size={15}
            className={refreshing ? 'animate-spin' : ''}
          />
          {refreshing ? 'Memuat...' : 'Refresh'}
        </button>
      </div>

      {/* STATISTIK */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="flex items-center gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <Activity size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#1F1915]">
              {logs.length}
            </p>
            <p className="mt-1 text-xs text-[#7A7167]">
              Total Aktivitas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <ShieldCheck size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#1F1915]">
              {totalLogin}
            </p>
            <p className="mt-1 text-xs text-[#7A7167]">
              Aktivitas Login
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
            <Boxes size={20} className="text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#1F1915]">
              {totalStok}
            </p>
            <p className="mt-1 text-xs text-[#7A7167]">
              Aktivitas Stok
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
            <ShoppingBag size={20} className="text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#1F1915]">
              {totalPemesanan}
            </p>
            <p className="mt-1 text-xs text-[#7A7167]">
              Aktivitas Pemesanan
            </p>
          </div>
        </div>

      </div>

      {/* PENCARIAN */}
      <div className="rounded-2xl border border-[#E6DFD5] bg-white p-4 shadow-xs">
        <div className="relative h-10 w-full sm:max-w-md">

          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <Search
              size={17}
              strokeWidth={2}
              className="block shrink-0 text-[#7A7167]"
            />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari admin, aktivitas, atau modul..."
            className="h-full w-full rounded-xl border border-[#D8D1C9] bg-[#F4F1EA] pl-10 pr-3 text-xs outline-none transition-colors focus:border-[#E54322]"
          />
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
          <p className="mb-1 font-bold">Gagal memuat log aktivitas</p>
          <p>{error}</p>

          <button
            onClick={() => fetchLogs(true)}
            className="mt-2 font-bold underline"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* TABEL */}
      <div className="overflow-hidden rounded-2xl border border-[#E6DFD5] bg-white shadow-xs">
        <div className="flex items-center gap-2 border-b border-[#E6DFD5] p-5">
          <ClipboardList size={18} className="text-[#7A7167]" />
          <h2 className="text-sm font-bold text-[#1F1915]">
            Riwayat Aktivitas Admin
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-xs text-[#7A7167]">
            Sedang mengambil data aktivitas...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-10 text-center text-xs text-[#7A7167]">
            {logs.length === 0
              ? 'Belum ada aktivitas yang tercatat.'
              : 'Tidak ditemukan aktivitas yang sesuai.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#F8F6F2] text-[10px] uppercase tracking-wider text-[#7A7167]">
                <tr>
                  <th className="px-5 py-4">Aktivitas</th>
                  <th className="px-5 py-4">Admin</th>
                  <th className="px-5 py-4">Modul</th>
                  <th className="px-5 py-4">Deskripsi</th>
                  <th className="px-5 py-4">Waktu</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EEE9E2]">
                {filteredLogs.map((item) => {
                  const kategori = getKategori(item.aktivitas);

                  return (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-[#FCFBF9]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {getIcon(kategori)}
                          <span className="whitespace-nowrap text-xs font-bold text-[#1F1915]">
                            {item.aktivitas}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-[#9A9188]" />
                          <span className="text-xs text-[#5F554C]">
                            {item.user_email || 'Tidak diketahui'}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-bold ${getBadge(kategori)}`}>
                          {item.modul || kategori}
                        </span>
                      </td>

                      <td className="max-w-sm px-5 py-4 text-xs leading-relaxed text-[#7A7167]">
                        {item.deskripsi || '-'}
                        {item.referensi_id && (
                          <p className="mt-1 text-[10px] text-[#9A9188]">
                            Referensi: {item.referensi_id}
                          </p>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#7A7167]">
                          <Clock size={13} />
                          {formatTanggal(item.created_at)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="border-t border-[#E6DFD5] px-5 py-3 text-[10px] text-[#9A9188]">
          Menampilkan maksimal 100 aktivitas terbaru dari database.
        </div>
      </div>
    </div>
  );
}
