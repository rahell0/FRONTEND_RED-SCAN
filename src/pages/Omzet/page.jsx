
import React, { useState, useEffect } from 'react';
import API from '../../services/api';

import LaporanHeader from './components/LaporanHeader';
import OmzetStats from './components/OmzetStats';
import OmzetKategori from './components/OmzetKategori';
import RekapShift from './components/RekapShift';

const LAPORAN_AWAL = {
  totalOmzet: 0,
  totalTransaksi: 0,
  qrisOmzet: 0,
  tunaiOmzet: 0,
  rataRataTransaksi: 0,
  qrisTransaksi: 0,
  tunaiTransaksi: 0,
};

export default function LaporanOmzet() {
  const [filterRange, setFilterRange] = useState('semua');
  const [laporan, setLaporan] = useState(LAPORAN_AWAL);
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchLaporanOmzet = async () => {
      try {
        setLoading(true);
        setError('');

        const [responseOmzet, responsePemesanan] = await Promise.all([
          API.get('/omzet', {
            params: {
              range: filterRange,
            },
          }),
          API.get('/pemesanan'),
        ]);

        if (!responseOmzet.data?.success) {
          throw new Error(
            responseOmzet.data?.message ||
            'Data laporan omzet tidak berhasil dimuat.'
          );
        }

        if (!responsePemesanan.data?.success) {
          throw new Error(
            responsePemesanan.data?.message ||
            'Data transaksi tidak berhasil dimuat.'
          );
        }

        if (isMounted) {
          setLaporan({
            ...LAPORAN_AWAL,
            ...responseOmzet.data.laporan,
          });

          setTransaksi(
            Array.isArray(responsePemesanan.data.data)
              ? responsePemesanan.data.data
              : []
          );
        }
      } catch (err) {
        console.error('Gagal mengambil laporan omzet:', err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
            err.message ||
            'Gagal mengambil data laporan omzet.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLaporanOmzet();

    return () => {
      isMounted = false;
    };
  }, [filterRange]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      <LaporanHeader
        filterRange={filterRange}
        setFilterRange={setFilterRange}
        laporan={laporan}
        transaksi={transaksi}
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-[#E6DFD5] bg-white p-8 text-center text-sm text-[#7A7167]">
          Memuat laporan omzet...
        </div>
      ) : (
        <>
          <OmzetStats laporan={laporan} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <OmzetKategori laporan={laporan} />
            <RekapShift laporan={laporan} />
          </div>
        </>
      )}

    </div>
  );
}
