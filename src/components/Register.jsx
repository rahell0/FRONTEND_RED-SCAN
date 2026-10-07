import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Eye, EyeOff, Lock, User, Mail, ShieldCheck } from 'lucide-react';

export default function Register({ 
  showPassword, 
  setShowPassword, 
  showConfirmPassword, 
  setShowConfirmPassword, 
  setPage, 
  setUser 
}) {
  const [fullName, setFullName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simpan Nama Lengkap, Email, & Username ke state global di App.jsx
    if (setUser) {
      setUser({
        name: fullName || 'Pengguna Baru',
        email: emailInput,
        username: usernameInput
      });
    }

    alert(`Pendaftaran berhasil! Selamat datang, ${fullName || 'Pengguna'}.`);
    setPage('dashboard');
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* LOGO & BRANDING */}
      <div className="flex flex-col items-center mb-4">
        <img 
          src={logo} 
          alt="REDScan Logo" 
          className="w-12 h-12 object-contain mb-1.5" 
        />
        <h1 className="text-lg font-bold text-[#E54322] tracking-tight">REDScan</h1>
        <p className="text-[10px] font-semibold text-[#A89C90] tracking-wider uppercase">POS ENTERPRISE CLOUD</p>
      </div>

      {/* FORM REGISTER */}
      <form onSubmit={handleSubmit} className="w-full space-y-3 text-left">
        <div>
          <label className="text-xs font-bold text-[#2C221E] block mb-1">Nama Lengkap</label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
              <User size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Masukkan Nama Lengkap Anda" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full h-10 pl-11 pr-4 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#2C221E] block mb-1">Email</label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              placeholder="Masukkan Email Anda" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="w-full h-10 pl-11 pr-4 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#2C221E] block mb-1">Username</label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
              <User size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Masukkan Username Anda" 
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
              className="w-full h-10 pl-11 pr-4 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#2C221E] block mb-1">Kata Sandi</label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
              <Lock size={18} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••••••" 
              required
              className="w-full h-10 pl-11 pr-11 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 flex items-center justify-center text-[#A39788] hover:text-[#2C221E] cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-[9px] text-[#8C827A] mt-1">
            ⓘ Kata sandi harus minimal 8 karakter dengan kombinasi huruf, angka, dan simbol.
          </p>
        </div>

        <div>
          <label className="text-xs font-bold text-[#2C221E] block mb-1">Konfirmasi Kata Sandi</label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
              <Lock size={18} />
            </div>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="••••••••••••" 
              required
              className="w-full h-10 pl-11 pr-11 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 flex items-center justify-center text-[#A39788] hover:text-[#2C221E] cursor-pointer transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input 
            type="checkbox" 
            id="ingat-saya"
            className="w-3.5 h-3.5 rounded border-[#D8D1C7] text-[#210D04] focus:ring-0 cursor-pointer"
          />
          <label htmlFor="ingat-saya" className="text-[11px] text-[#6B5E52] cursor-pointer select-none">
            Ingat Saya
          </label>
        </div>

        <button
          type="submit"
          className="w-full h-11 bg-[#210D04] hover:bg-[#3B2415] active:bg-[#120702] text-white rounded-xl text-xs font-bold transition-all shadow-md mt-1 cursor-pointer flex items-center justify-center"
        >
          Daftar
        </button>
      </form>

      <div className="mt-3 text-center">
        <button
          onClick={() => setPage('login')}
          className="text-xs text-[#6B5E52] cursor-pointer"
        >
          Sudah punya akun? <span className="font-bold text-[#2C221E]">Login →</span>
        </button>
      </div>

      {/* FOOTER */}
      <div className="mt-5 pt-2 flex flex-col items-center justify-center gap-1 text-[9px] text-[#A39788]">
        <div className="flex items-center gap-1 font-medium">
          <ShieldCheck size={11} className="text-[#A39788]" />
          <span>Enkripsi Berstandar Industri 256-Bit</span>
        </div>
        <p className="text-[8px] text-[#B8AC9D]">
          © 2025 REDScan Security System. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}