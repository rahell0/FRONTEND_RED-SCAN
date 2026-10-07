import React, { useState, useEffect } from 'react';
import { Bell, Clock } from 'lucide-react';

export default function Header({ title, subtitle, setPage }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour12: false }).replace(/\./g, '.'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-transparent pb-4 mb-6 border-b border-gray-200/60 shrink-0">
      {/* JUDUL HALAMAN */}
      <div>
        <h1 className="text-2xl font-black text-[#1F1915] tracking-tight m-0 leading-none">
          {title}
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1.5 m-0 uppercase tracking-wider">
          {subtitle || 'Terminal Kasir #T-01 • Posisi Kasir Utama • Malang Outlet'}
        </p>
      </div>

      {/* WAKTU, NOTIFIKASI, & USER */}
      <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
        {/* Widget Jam Real-Time */}
        <div className="bg-[#3D4D4F] text-white px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-xs">
          <Clock size={18} className="text-gray-300" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-extrabold tracking-wider">{time || '21.20.31'}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-gray-300 mt-1">
              Waktu Lokal Terminal
            </span>
          </div>
        </div>

        {/* Tombol Notifikasi */}
        <button 
          onClick={() => setPage && setPage('notifikasi')}
          className="relative bg-white border border-gray-200/80 p-2.5 rounded-2xl hover:bg-gray-50 transition-colors shadow-xs flex items-center justify-center text-gray-700 cursor-pointer"
        >
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#E03E1A]"></span>
        </button>

        {/* User Pill */}
        <div className="bg-white border border-gray-200/80 pl-2 pr-4 py-1.5 rounded-2xl flex items-center gap-2.5 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#3D4D4F] text-white flex items-center justify-center font-bold text-xs shrink-0">
            U
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-bold text-[#1F1915]">Username</span>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5">Kasir #01</span>
          </div>
        </div>
      </div>
    </header>
  );
}