import React from 'react';
import logo from '../../assets/logo.png';
import { ShieldCheck } from 'lucide-react';

export default function Welcome({ setPage }) {
  return (
    <div className="bg-[#EAE6DE] w-full max-w-[440px] rounded-[32px] border border-[#D8D1C7] shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-7 sm:p-9 flex flex-col items-center text-center justify-between min-h-[560px] transition-all">
      
      {/* 1. LOGO & BRANDING */}
      <div className="flex flex-col items-center pt-2">
        {/* Menggunakan file logo.png secara langsung tanpa filter warna */}
        <img 
          src={logo} 
          alt="REDScan Logo" 
          className="w-14 h-14 object-contain mb-2" 
        />
        <h1 className="text-xl font-bold text-[#E54322] tracking-tight">REDScan</h1>
        <span className="text-[10px] font-semibold tracking-wider text-[#A89C90] uppercase mt-0.5">
          POS ENTERPRISE CLOUD
        </span>
      </div>

      {/* 2. SLOGAN UTAMA */}
      <div className="my-auto py-6 space-y-1">
        <h2 className="text-xl font-bold text-[#2C221E] leading-tight">
          Gak Pakai Lama,
        </h2>
        <h2 className="text-xl font-bold text-[#2C221E] leading-tight">
          Pesan Langsung dari HP—mu.
        </h2>
      </div>

      {/* 3. TOMBOL UTAMA & LINK DAFTAR */}
      <div className="w-full space-y-3 mb-4">
        <button
          onClick={() => setPage && setPage('login')}
          className="w-full py-3.5 px-4 bg-[#210D04] hover:bg-[#3B2415] active:scale-[0.99] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          Login
        </button>

        <button
          onClick={() => setPage && setPage('register')}
          className="text-xs text-[#6B5E52] hover:text-[#2C221E] transition-colors cursor-pointer inline-block"
        >
          Belum punya akun? <span className="font-bold text-[#2C221E]">Daftar →</span>
        </button>
      </div>

      {/* 4. FOOTER ENKRIPSI */}
      <div className="flex flex-col items-center justify-center gap-1 text-[9px] text-[#A39788]">
        <div className="flex items-center gap-1 font-medium">
          <ShieldCheck size={12} className="text-[#A39788]" />
          <span>Enkripsi Berstandar Industri 256-Bit</span>
        </div>
        <p className="text-[8px] text-[#B8AC9D]">
          © 2025 REDScan Security System. Seluruh hak cipta dilindungi.
        </p>
      </div>

    </div>
  );
}