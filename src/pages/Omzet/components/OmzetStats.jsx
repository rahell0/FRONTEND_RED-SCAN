
import React from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
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
      change: 'Transaksi selesai',
      isPositive: true,
      icon: DollarSign,
      subtext: 'Total pendapatan',
    },
    {
      title: 'Total Transaksi',
      value: `${totalTransaksi} Pesanan`,
      change: 'Transaksi selesai',
      isPositive: true,
      icon: ShoppingBag,
      subtext: `Rata-rata ${formatRupiah(rataRata)} / transaksi`,
    },
    {
      title: 'Metode Non-Tunai (QRIS)',
      value: formatRupiah(qrisOmzet),
      change: `${persentaseQris.toFixed(1)}% Total`,
      isPositive: true,
      icon: CreditCard,
      subtext: 'Pendapatan melalui QRIS',
    },
    {
      title: 'Pendapatan Tunai',
      value: formatRupiah(tunaiOmzet),
      change: `${persentaseTunai.toFixed(1)}% Total`,
      isPositive: false,
      icon: TrendingUp,
      subtext: 'Pendapatan melalui tunai',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;

        return (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs flex flex-col justify-between min-w-0"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-[#7A7167]">
                  {stat.title}
                </span>

                <div className="w-8 h-8 rounded-xl bg-[#F4F1EA] flex items-center justify-center text-[#E54322]">
                  <Icon size={16} />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F1915] tracking-tight break-words">
                {stat.value}
              </h3>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F4F1EA] flex items-center justify-between gap-2 text-[11px]">
              <span className="text-[#8C827A] truncate">
                {stat.subtext}
              </span>

              <span
                className={`inline-flex items-center shrink-0 font-bold px-1.5 py-0.5 rounded-md ${
                  stat.isPositive
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-amber-50 text-amber-600'
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUpRight size={13} />
                ) : (
                  <ArrowDownRight size={13} />
                )}
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
