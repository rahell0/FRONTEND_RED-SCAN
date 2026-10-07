import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  RotateCw, 
  AlertTriangle, 
  ShoppingBag, 
  Info, 
  Search 
} from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'stok',
    badge: 'Stok Kritis',
    title: 'Susu UHT Segar',
    subtitle: 'Sisa 0.8 Liter (Batas Minimum: 5 Liter) • Gudang Malang Outlet • 5 menit lalu',
    bgBadge: 'bg-red-100 text-red-600',
    icon: <AlertTriangle className="text-red-500" size={18} />,
    iconBg: 'bg-red-50',
    actionText: '+ Restock Cepat',
    actionStyle: 'bg-[#E54322] hover:bg-[#d03b1c] text-white'
  },
  {
    id: 2,
    type: 'pesanan',
    badge: 'Pesanan Baru',
    title: 'Meja 04 • #ORD-201009',
    subtitle: '2x Matcha Latte, 1x Cheese Cake (Rp 64.000) • QRIS Lunas • 1 menit lalu',
    bgBadge: 'bg-emerald-100 text-emerald-700',
    icon: <ShoppingBag className="text-emerald-600" size={18} />,
    iconBg: 'bg-emerald-50',
    actionText: 'Proses Pesanan',
    actionStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white'
  },
  {
    id: 3,
    type: 'sistem',
    badge: 'Perlu Konfirmasi',
    title: 'Kasir #02 • #INV-00422',
    subtitle: 'Menunggu konfirmasi tunai sebesar Rp 60.500 • 12 menit lalu',
    bgBadge: 'bg-blue-100 text-blue-700',
    icon: <Info className="text-blue-500" size={18} />,
    iconBg: 'bg-blue-50',
    actionText: 'Konfirmasi Tunai',
    actionStyle: 'bg-blue-600 hover:bg-blue-700 text-white'
  }
];

export default function Notifikasi({ shift, setPage }) {
  const [activeTab, setActiveTab] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifs = NOTIFICATIONS.filter((item) => {
    const matchTab = activeTab === 'semua' || item.type === activeTab;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* BARIS ATAS: JUDUL HALAMAN & TOMBOL UTAMA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-[#1F1915] tracking-tight">Pusat Notifikasi</h1>
          <p className="text-xs text-[#7A7167] mt-0.5">Pantau update stok, pesanan baru, dan konfirmasi sistem secara real-time</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer">
            <CheckCircle2 size={14} />
            <span>Tandai Semua Dibaca</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-[#1C1613] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#2A201B] transition-colors cursor-pointer">
            <RotateCw size={14} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* 4 CARDS REKAP STATISTIK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Bell className="text-amber-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1F1915] leading-none">3</div>
            <div className="text-xs font-medium text-[#7A7167] mt-1">Total Masuk</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1F1915] leading-none">1</div>
            <div className="text-xs font-medium text-[#7A7167] mt-1">Stok Kritis</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <ShoppingBag className="text-emerald-600" size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1F1915] leading-none">1</div>
            <div className="text-xs font-medium text-[#7A7167] mt-1">Pesanan Aktif</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Info className="text-blue-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1F1915] leading-none">1</div>
            <div className="text-xs font-medium text-[#7A7167] mt-1">Info Sistem</div>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER TAB */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6DFD5] flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7167]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pesanan, stok bahan, atau info alert..."
            className="w-full bg-[#F4F1EA] border border-[#D8D1C9] rounded-xl pl-8 pr-3 py-2 text-xs outline-none focus:border-[#E54322] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button 
            onClick={() => setActiveTab('semua')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
              activeTab === 'semua' ? 'bg-[#1C1613] text-white' : 'text-[#7A7167] hover:bg-[#F4F1EA]'
            }`}
          >
            Semua (3)
          </button>
          <button 
            onClick={() => setActiveTab('stok')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
              activeTab === 'stok' ? 'bg-[#1C1613] text-white' : 'text-[#7A7167] hover:bg-[#F4F1EA]'
            }`}
          >
            Stok (1)
          </button>
          <button 
            onClick={() => setActiveTab('pesanan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
              activeTab === 'pesanan' ? 'bg-[#1C1613] text-white' : 'text-[#7A7167] hover:bg-[#F4F1EA]'
            }`}
          >
            Pesanan (1)
          </button>
          <button 
            onClick={() => setActiveTab('sistem')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
              activeTab === 'sistem' ? 'bg-[#1C1613] text-white' : 'text-[#7A7167] hover:bg-[#F4F1EA]'
            }`}
          >
            Sistem (1)
          </button>
        </div>
      </div>

      {/* LIST NOTIFIKASI */}
      <div className="flex flex-col gap-3">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-5 rounded-2xl border border-[#E6DFD5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#D8D1C9] transition-all"
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
                    <h4 className="text-sm font-bold text-[#1F1915] m-0">{item.title}</h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  </div>
                  <p className="text-xs text-[#7A7167] mt-1 m-0">{item.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button className="px-3.5 py-2 text-xs font-bold text-[#7A7167] hover:bg-[#F4F1EA] rounded-xl transition-colors cursor-pointer">
                  Abaikan
                </button>
                <button className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs ${item.actionStyle}`}>
                  {item.actionText}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-2xl text-center text-xs text-[#7A7167] border border-[#E6DFD5]">
            Tidak ada notifikasi pada kategori ini.
          </div>
        )}
      </div>

    </div>
  );
}