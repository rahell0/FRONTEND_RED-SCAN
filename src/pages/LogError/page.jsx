
import React, { useState, useEffect, useCallback } from 'react';
import {
  AlertTriangle,
  Search,
  RotateCw,
  Clock,
  Server,
  ChevronDown,
  ChevronUp,
  Activity,
  ShieldAlert,
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
// KOMPONEN UTAMA
// ==========================================
export default function LogError() {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // ========================================
  // AMBIL DATA ERROR DARI BACKEND
  // ========================================
  const fetchLogs = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');

      const response = await API.get('/logs/errors');

      if (response.data.success !== true) {
        throw new Error(
          response.data.message || 'Gagal mengambil log error.'
        );
      }

      setLogs(
        Array.isArray(response.data.data)
          ? response.data.data
          : []
      );
    } catch (err) {
      console.error('Gagal mengambil log error:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Gagal mengambil data log error.'
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
  // PENCARIAN
  // ========================================
  const filteredLogs = logs.filter((item) => {
    const keyword = searchQuery.toLowerCase();

    return (
      String(item.pesan || '').toLowerCase().includes(keyword) ||
      String(item.endpoint || '').toLowerCase().includes(keyword) ||
      String(item.method || '').toLowerCase().includes(keyword) ||
      String(item.level || '').toLowerCase().includes(keyword) ||
      String(item.status_code || '').includes(keyword)
    );
  });

  const totalError = logs.length;

  const totalServerError = logs.filter(
    (item) => Number(item.status_code) >= 500
  ).length;

  const totalClientError = logs.filter(
    (item) =>
      Number(item.status_code) >= 400 &&
      Number(item.status_code) < 500
  ).length;

  const totalLainnya = logs.filter(
    (item) =>
      Number(item.status_code) < 400 ||
      !item.status_code
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1F1915]">
            Log Error
          </h1>

          <p className="mt-1 text-xs text-[#7A7167]">
            Pantau kesalahan dan gangguan yang terjadi pada sistem REDScan.
          </p>

          <p className="mt-1 text-xs text-[#7A7167]">
            Total {totalError} error tercatat.
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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#1F1915]">
              {totalError}
            </p>
            <p className="mt-1 text-xs text-[#7A7167]">
              Total Error
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
            <Server size={20} className="text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#1F1915]">
              {totalServerError}
            </p>
            <p className="mt-1 text-xs text-[#7A7167]">
              Server Error (5xx)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
            <ShieldAlert size={20} className="text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#1F1915]">
              {totalClientError}
            </p>
            <p className="mt-1 text-xs text-[#7A7167]">
              Client Error (4xx)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <Activity size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#1F1915]">
              {totalLainnya}
            </p>
            <p className="mt-1 text-xs text-[#7A7167]">
              Lainnya
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
            placeholder="Cari pesan error, endpoint, atau status..."
            className="h-full w-full rounded-xl border border-[#D8D1C9] bg-[#F4F1EA] pl-10 pr-3 text-xs outline-none transition-colors focus:border-[#E54322]"
          />
        </div>
      </div>

      {/* ERROR KONEKSI */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
          <p className="mb-1 font-bold">Gagal memuat log error</p>
          <p>{error}</p>

          <button
            onClick={() => fetchLogs(true)}
            className="mt-2 font-bold underline"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* DAFTAR ERROR */}
      <div className="overflow-hidden rounded-2xl border border-[#E6DFD5] bg-white shadow-xs">
        <div className="flex items-center gap-2 border-b border-[#E6DFD5] p-5">
          <AlertTriangle size={18} className="text-red-500" />
          <h2 className="text-sm font-bold text-[#1F1915]">
            Riwayat Error Sistem
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-xs text-[#7A7167]">
            Sedang mengambil data error...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-10 text-center text-xs text-[#7A7167]">
            {logs.length === 0
              ? 'Belum ada error yang tercatat.'
              : 'Tidak ditemukan error yang sesuai.'}
          </div>
        ) : (
          <div className="divide-y divide-[#EEE9E2]">
            {filteredLogs.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  className="p-5 transition-colors hover:bg-[#FCFBF9]"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                        <AlertTriangle size={19} className="text-red-600" />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-red-100 px-2 py-1 text-[10px] font-bold uppercase text-red-700">
                            {item.level || 'error'}
                          </span>

                          <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${
                            Number(item.status_code) >= 500
                              ? 'bg-red-100 text-red-700'
                              : Number(item.status_code) >= 400
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}>
                            HTTP {item.status_code || '-'}
                          </span>

                          <span className="rounded-md bg-[#F4F1EA] px-2 py-1 text-[10px] font-bold text-[#5F554C]">
                            {item.method || '-'}
                          </span>
                        </div>

                        <h3 className="break-words text-sm font-bold text-[#1F1915]">
                          {item.pesan}
                        </h3>

                        <p className="mt-2 break-all text-xs text-[#7A7167]">
                          Endpoint: {item.endpoint || '-'}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-[#9A9188]">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {formatTanggal(item.created_at)}
                          </span>

                          <span>
                            IP: {item.ip_address || '-'}
                          </span>

                          <span>
                            User ID: {item.user_id ?? '-'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : item.id)
                      }
                      className="flex shrink-0 items-center justify-center gap-2 self-end rounded-xl border border-[#E6DFD5] px-3 py-2 text-xs font-bold text-[#5F554C] transition-colors hover:bg-[#F4F1EA] sm:self-start"
                    >
                      {isExpanded ? (
                        <>
                          Tutup Detail
                          <ChevronUp size={15} />
                        </>
                      ) : (
                        <>
                          Detail Error
                          <ChevronDown size={15} />
                        </>
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-5 space-y-3 rounded-xl border border-[#E6DFD5] bg-[#F8F6F2] p-4">
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#7A7167]">
                          Pesan Error
                        </p>
                        <p className="break-words text-xs text-[#1F1915]">
                          {item.pesan || '-'}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#7A7167]">
                          Stack Trace
                        </p>
                        <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-[#1C1613] p-4 text-[10px] leading-relaxed text-[#E9E1CF]">
                          {item.stack_trace || 'Stack trace tidak tersedia.'}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="border-t border-[#E6DFD5] px-5 py-3 text-[10px] text-[#9A9188]">
          Menampilkan maksimal 100 error terbaru dari database.
        </div>
      </div>
    </div>
  );
}
