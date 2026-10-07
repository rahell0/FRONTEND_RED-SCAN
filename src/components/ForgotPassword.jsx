import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowLeft, RefreshCw, KeyRound, Shield } from 'lucide-react';

export default function ForgotPassword({ setPage }) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Sandi Baru
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto focus ke input selanjutnya
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
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

      {/* STEP INDICATOR HEADER */}
      <div className="w-full bg-[#E2DCCE] rounded-xl p-2.5 mb-4 border border-[#D5CDC0] flex items-center justify-between text-[10px] font-semibold text-[#6B5E52]">
        <div className="flex items-center gap-1.5">
          {step === 1 && <span className="text-emerald-700 font-bold">LANGKAH 01 / 03</span>}
          {step === 2 && <span className="text-emerald-700 font-bold">🟢 SESI ENKRIPSI: RSA-4096</span>}
          {step === 3 && (
            <div className="flex items-center gap-2 text-[9px]">
              <span className="text-emerald-700">✓ 1. IDENTITAS</span>
              <span className="text-emerald-700">✓ 2. OTP</span>
              <span className="text-emerald-800 font-bold">● 3. SANDI BARU</span>
            </div>
          )}
        </div>
        <div className="text-[9px] text-[#8C827A] font-medium">
          {step === 1 && '● Kanal Terenkripsi'}
          {step === 2 && '🛡️ Protokol v4.18'}
          {step === 3 && '🔒 Terverifikasi'}
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full grid grid-cols-3 gap-1.5 mb-5">
        <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-[#E54322]' : 'bg-[#D5CDC0]'}`}></div>
        <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-[#E54322]' : 'bg-[#D5CDC0]'}`}></div>
        <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? 'bg-[#E54322]' : 'bg-[#D5CDC0]'}`}></div>
      </div>

      {/* --- LANGKAH 1: MASUKKAN EMAIL --- */}
      {step === 1 && (
        <div className="w-full text-left">
          <div className="text-center mb-4">
            <h2 className="text-base font-bold text-[#2C221E]">Lupa Kata Sandi?</h2>
            <p className="text-xs text-[#6B5E52] mt-1 leading-relaxed">
              Masukkan alamat email terdaftar Anda. Kami akan mengirimkan 6 digit kode OTP verifikasi keamanan.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#2C221E] block mb-1">Alamat Email Resmi</label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="Masukkan Email yang Terdaftar" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 pl-11 pr-4 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
                />
              </div>
            </div>

            <div className="bg-[#E2DCCE]/60 border border-[#D5CDC0] p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-[#6B5E52]">
              <Shield size={16} className="text-[#A39788] shrink-0 mt-0.5" />
              <p className="leading-tight">Pastikan Anda memiliki akses aktif ke inbox email ini. Token verifikasi berlaku selama 10 menit.</p>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#210D04] hover:bg-[#3B2415] text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Kirim Kode Verifikasi</span>
              <span>→</span>
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setPage('login')}
              className="text-xs text-[#6B5E52] hover:text-[#2C221E] transition-colors cursor-pointer inline-flex items-center gap-1 font-medium"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke halaman Login</span>
            </button>
          </div>
        </div>
      )}

      {/* --- LANGKAH 2: VERIFIKASI OTP --- */}
      {step === 2 && (
        <div className="w-full text-left">
          <div className="text-center mb-4">
            <h2 className="text-base font-bold text-[#2C221E]">Verifikasi Kode Keamanan</h2>
            <p className="text-xs text-[#6B5E52] mt-1 leading-relaxed">
              Kode otentikasi 6-digit sekali pakai telah dikirimkan ke alamat:
            </p>
            <div className="inline-flex items-center gap-1.5 bg-white border border-[#D8D1C7] px-3 py-1 rounded-lg text-xs font-semibold text-[#2C221E] mt-2 shadow-xs">
              <Mail size={13} className="text-[#A39788]" />
              <span>{email || 'user.redscan@instansi.id'}</span>
              <button onClick={() => setStep(1)} className="text-[10px] text-[#E54322] hover:underline ml-1 cursor-pointer">
                (Ubah)
              </button>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-[#8A8178] block text-center uppercase tracking-wider mb-2">
                Masukkan 6-Digit Token Akses
              </label>

              <div className="flex justify-between items-center gap-1.5">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className="w-10 h-11 bg-white border border-[#D8D1C7] rounded-xl text-center text-sm font-bold text-[#2C221E] focus:outline-none focus:border-[#210D04] transition-colors shadow-xs"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#6B5E52] px-1">
              <span>⌛ Kedaluwarsa: <b className="text-[#2C221E]">00:54</b></span>
              <button type="button" className="text-[#E54322] hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                <RefreshCw size={12} />
                <span>Kirim Ulang Kode</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#210D04] hover:bg-[#3B2415] text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Verifikasi & Lanjutkan</span>
              <span>→</span>
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#6B5E52] hover:text-[#2C221E] transition-colors cursor-pointer inline-flex items-center gap-1 font-medium"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Masukkan Email</span>
            </button>
          </div>
        </div>
      )}

      {/* --- LANGKAH 3: BUAT KATA SANDI BARU --- */}
      {step === 3 && (
        <div className="w-full text-left">
          <div className="text-center mb-4">
            <h2 className="text-base font-bold text-[#2C221E]">Buat Kata Sandi Baru</h2>
            <p className="text-xs text-[#6B5E52] mt-1 leading-relaxed">
              Buat kata sandi baru yang kuat untuk melindungi akses akun REDScan Anda.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setPage('login'); }} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#2C221E] block mb-1">Kata Sandi Baru</label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
                  <Lock size={18} />
                </div>
                <input 
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter terenkripsi"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full h-11 pl-11 pr-11 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
                />
                <button 
                  type="button" 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 flex items-center justify-center text-[#A39788] hover:text-[#2C221E] cursor-pointer transition-colors"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-[#6B5E52]">
              <div className="flex items-center gap-1">
                <CheckCircle2 size={12} className={newPassword.length >= 8 ? "text-emerald-600" : "text-[#A39788]"} />
                <span>Min. 8 Karakter</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 size={12} className={/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? "text-emerald-600" : "text-[#A39788]"} />
                <span>Huruf Besar & Kecil</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#2C221E] block mb-1">Konfirmasi Kata Sandi Baru</label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
                  <Lock size={18} />
                </div>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Ulangi kata sandi baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full h-11 pl-11 pr-11 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
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

            <div className="bg-[#E2DCCE]/60 border border-[#D5CDC0] p-2.5 rounded-xl flex items-start gap-2 text-[10px] text-[#6B5E52]">
              <KeyRound size={15} className="text-[#A39788] shrink-0 mt-0.5" />
              <p className="leading-tight">Setelah disimpan, semua sesi aktif di peramban dan perangkat lain akan otomatis dicabut.</p>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#210D04] hover:bg-[#3B2415] text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Simpan Sandi & Masuk</span>
              <span>→</span>
            </button>
          </form>
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-6 pt-2 flex flex-col items-center justify-center gap-1 text-[9px] text-[#A39788]">
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