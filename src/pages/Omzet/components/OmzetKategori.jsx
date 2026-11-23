
import React from 'react';

export default function OmzetKategori({ laporan }) {
  const qrisOmzet = Number(laporan?.qrisOmzet || 0);
  const tunaiOmzet = Number(laporan?.tunaiOmzet || 0);
  const totalOmzet = Number(laporan?.totalOmzet || 0);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  };

  const pembayaran = [
    {
      nama: 'QRIS',
      omzet: qrisOmzet,
      persentase:
        totalOmzet > 0 ? (qrisOmzet / totalOmzet) * 100 : 0,
      warna: '#648F94',
    },
    {
      nama: 'Tunai',
      omzet: tunaiOmzet,
      persentase:
        totalOmzet > 0 ? (tunaiOmzet / totalOmzet) * 100 : 0,
      warna: '#402719',
    },
  ];

  const pembayaranTerbesar =
    qrisOmzet > tunaiOmzet
      ? 'QRIS'
      : tunaiOmzet > qrisOmzet
        ? 'Tunai'
        : 'Sama';

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs">

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1F1915]">
            Komposisi Pembayaran
          </h3>

          <span className="rounded-md bg-[#F4F1EA] px-2 py-1 text-[10px] font-semibold text-[#7A7167]">
            2 Metode
          </span>
        </div>

        <div className="space-y-5">
          {pembayaran.map((item) => (
            <div key={item.nama} className="space-y-2">

              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#1F1915]">
                  {item.nama}
                </span>

                <span className="font-bold text-[#E54322]">
                  {formatRupiah(item.omzet)}
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-[#F4F1EA]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(item.persentase, 100)}%`,
                    backgroundColor: item.warna,
                  }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-[#8C827A]">
                <span>{item.persentase.toFixed(1)}% dari omzet</span>
                <span>{formatRupiah(item.omzet)}</span>
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#E6DFD5] bg-[#F4F1EA] p-3 text-center text-xs text-[#7A7167]">
        Metode pembayaran terbesar:{' '}
        <strong className="text-[#1F1915]">
          {pembayaranTerbesar}
        </strong>
      </div>

    </div>
  );
}
