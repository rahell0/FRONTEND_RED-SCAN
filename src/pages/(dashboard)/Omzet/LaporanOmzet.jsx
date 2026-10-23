import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  CreditCard, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter
} from 'lucide-react';

export default function LaporanOmzet({ shift, setPage }) {
  const [filterRange, setFilterRange] = useState('hari_ini');

  const stats = [
    {
      title: 'Total Omzet Hari Ini',
      value: 'Rp 4.850.000',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      subtext: 'vs. kemarin (Rp 4.310.000)'
    },
    {
      title: 'Total Transaksi',
      value: '150 Pesanan',
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingBag,
      subtext: 'Rata-rata Rp 32.333 / transaksi'
    },
    {
      title: 'Metode Non-Tunai (QRIS)',
      value: 'Rp 3.200.000',
      change: '66% Total',
      isPositive: true,
      icon: CreditCard,
      subtext: '98 Transaksi QRIS'
    },
    {
      title: 'Pendapatan Tunai',
      value: 'Rp 1.650.000',
      change: '34% Total',
      isPositive: false,
      icon: TrendingUp,
      subtext: '52 Transaksi Cash'
    }
  ];

  const omzetByCategory = [
    { category: 'Espresso Based', totalQty: 184, totalRevenue: 'Rp 2.450.000', share: '50.5%' },
    { category: 'Manual Brew', totalQty: 62, totalRevenue: 'Rp 990.000', share: '20.4%' },
    { category: 'Non-Coffee', totalQty: 85, totalRevenue: 'Rp 1.100.000', share: '22.7%' },
    { category: 'Snacks & Bakery', totalQty: 41, totalRevenue: 'Rp 310.000', share: '6.4%' }
  ];

  const shiftReports = [
    { id: 'SH-01', name: 'Shift Pagi (08:00 - 16:00)', cashier: 'Rian H.', orders: 68, cash: 'Rp 750.000', qris: 'Rp 1.400.000', total: 'Rp 2.150.000' },
    { id: 'SH-02', name: 'Shift Malam (16:00 - 00:00)', cashier: 'Annisa K.', orders: 82, cash: 'Rp 900.000', qris: 'Rp 1.800.000', total: 'Rp 2.700.000' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* HEADER PAGE & FILTER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-[#1F1915] tracking-tight">Ringkasan Laporan Omzet</h1>
          <p className="text-xs text-[#7A7167] mt-0.5">Laporan penjualan bersih dan statistik omzet outlet</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-[#F4F1EA] px-3 py-2 rounded-xl border border-[#D8D1C9]">
            <Calendar size={15} className="text-[#7A7167]" />
            <select 
              value={filterRange}
              onChange={(e) => setFilterRange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#1F1915] focus:outline-none cursor-pointer"
            >
              <option value="hari_ini">Hari Ini (6 Oct 2026)</option>
              <option value="kemarin">Kemarin</option>
              <option value="minggu_ini">Minggu Ini</option>
              <option value="bulan_ini">Bulan Ini</option>
            </select>
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E54322] hover:bg-[#d03b1c] text-white text-xs font-semibold rounded-xl transition-all shadow-sm">
            <Download size={15} />
            <span>Unduh Laporan</span>
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-[#7A7167]">{stat.title}</span>
                  <div className="w-8 h-8 rounded-xl bg-[#F4F1EA] flex items-center justify-center text-[#E54322]">
                    <Icon size={16} />
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-[#1F1915] tracking-tight">{stat.value}</h3>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F4F1EA] flex items-center justify-between text-[11px]">
                <span className="text-[#8C827A] truncate max-w-[130px]">{stat.subtext}</span>
                <span className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded-md ${
                  stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* GRID KATEGORI & SHIFT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kategori */}
        <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#1F1915]">Omzet per Kategori</h3>
              <span className="text-[10px] bg-[#F4F1EA] text-[#7A7167] font-semibold px-2 py-1 rounded-md">4 Kategori</span>
            </div>

            <div className="space-y-4">
              {omzetByCategory.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1F1915]">{item.category}</span>
                    <span className="font-bold text-[#E54322]">{item.totalRevenue}</span>
                  </div>
                  <div className="w-full bg-[#F4F1EA] h-2 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-[#1C1613] h-full rounded-full" 
                      style={{ width: item.share }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#8C827A]">
                    <span>{item.totalQty} porsi terjual</span>
                    <span>{item.share} dari total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 bg-[#F4F1EA] rounded-xl border border-[#E6DFD5] text-center text-xs text-[#7A7167]">
            Kategori terlaris hari ini: <strong className="text-[#1F1915]">Espresso Based</strong>
          </div>
        </div>

        {/* Tabel Rekap Shift */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#1F1915]">Rekapitulasi Shift Kasir</h3>
                <p className="text-[11px] text-[#7A7167]">Rincian pendapatan berdasarkan jadwal shift aktif hari ini</p>
              </div>
              <Filter size={16} className="text-[#8C827A]" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E6DFD5] text-[#7A7167] uppercase text-[10px] font-bold">
                    <th className="pb-3 px-2">Shift</th>
                    <th className="pb-3 px-2">Kasir</th>
                    <th className="pb-3 px-2 text-center">Transaksi</th>
                    <th className="pb-3 px-2">Cash</th>
                    <th className="pb-3 px-2">QRIS</th>
                    <th className="pb-3 px-2 text-right">Total Omzet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F1EA]">
                  {shiftReports.map((row, i) => (
                    <tr key={i} className="hover:bg-[#F9F8F6] transition-colors">
                      <td className="py-3.5 px-2 font-semibold text-[#1F1915]">{row.name}</td>
                      <td className="py-3.5 px-2 text-[#6B6259]">{row.cashier}</td>
                      <td className="py-3.5 px-2 text-center font-medium">{row.orders}</td>
                      <td className="py-3.5 px-2 text-[#6B6259]">{row.cash}</td>
                      <td className="py-3.5 px-2 text-[#6B6259]">{row.qris}</td>
                      <td className="py-3.5 px-2 text-right font-bold text-[#1F1915]">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E6DFD5] flex justify-between items-center text-xs">
            <span className="text-[#7A7167]">Total Gabungan Shift Hari Ini:</span>
            <span className="text-base font-extrabold text-[#E54322]">Rp 4.850.000</span>
          </div>
        </div>

      </div>

    </div>
  );
}