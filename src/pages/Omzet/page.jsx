
import React, { useState, useEffect } from 'react';
import API from '../../services/api';

import LaporanHeader from './components/LaporanHeader';
import OmzetStats from './components/OmzetStats';
import OmzetKategori from './components/OmzetKategori';
import RekapShift from './components/RekapShift';

export default function LaporanOmzet({ shift, setPage }) {
  const [filterRange, setFilterRange] = useState('semua');

  const [laporan, setLaporan] = useState({
    totalOmzet: 0,
    totalTransaksi: 0,
    qrisOmzet: 0,
    tunaiOmzet: 0,
    rataRataTransaksi: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mengambil laporan omzet dari backend
  useEffect(() => {
    const fetchLaporanOmzet = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await API.get('/omzet', {
          params: {
            range: filterRange,
          },
        });

        if (response.data.success) {
          setLaporan(response.data.laporan);
        }
      } catch (err) {
        console.error('Gagal mengambil laporan omzet:', err);

        setError(
          err.response?.data?.message ||
          'Gagal mengambil data laporan omzet.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLaporanOmzet();
  }, [filterRange]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <LaporanHeader
        filterRange={filterRange}
        setFilterRange={setFilterRange}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl p-8 text-center text-sm text-[#7A7167]">
          Memuat laporan omzet...
        </div>
      ) : (
        <OmzetStats laporan={laporan} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OmzetKategori />
        <RekapShift />
      </div>
    </div>
  );
}
