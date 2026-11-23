
import React from 'react';

import {
  DollarSign,
  ShoppingBag,
  CreditCard,
  Banknote,
} from 'lucide-react';

export default function OmzetStats({ laporan }) {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(angka) || 0);
  };

  const totalOmzet = Number(laporan?.totalOmzet || 0);
  const totalTransaksi = Number(laporan?.totalTransaksi || 0);
  const qrisOmzet = Number(laporan?.qrisOmzet || 0);
  const tunaiOmzet = Number(laporan?.tunaiOmzet || 0);
  const rataRata = Number(laporan?.rataRataTransaksi || 0);

  const persentaseQris =
    totalOmzet > 0 ? (qrisOmzet / totalOmzet) * 100 : 0;

  const persentaseTunai =
    totalOmzet > 0 ? (tunaiOmzet / totalOmzet) * 100 : 0;

  const stats = [
    {
      title: 'Total Omzet',
      value: formatRupiah(totalOmzet),
      description: 'Pendapatan transaksi selesai',
      icon: DollarSign,
    },
    {
      title: 'Total Transaksi',
      value: `${totalTransaksi} Transaksi`,
      description: `Rata-rata ${formatRupiah(rataRata)} / transaksi`,
      icon: ShoppingBag,
    },
    {
      title: 'Omzet QRIS',
      value: formatRupiah(qrisOmzet),
      description: `${persentaseQris.toFixed(1)}% dari total omzet`,
      icon: CreditCard,
    },
    {
      title: 'Omzet Tunai',
      value: formatRupiah(tunaiOmzet),
      description: `${persentaseTunai.toFixed(1)}% dari total omzet`,
      icon: Banknote,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="flex min-w-0 flex-col justify-between rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#7A7167]">
                  {stat.title}
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F4F1EA] text-[#E54322]">
                  <Icon size={16} />
                </div>
              </div>

              <h3 className="break-words text-xl font-extrabold tracking-tight text-[#1F1915] sm:text-2xl">
                {stat.value}
              </h3>
            </div>

            <div className="mt-4 border-t border-[#F4F1EA] pt-3">
              <span className="text-[11px] text-[#8C827A]">
                {stat.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
