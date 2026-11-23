
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/logo.png';

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
  KeyRound,
  Shield,
} from 'lucide-react';

import API from '../../../services/api';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const [resetToken, setResetToken] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ==========================================
  // HELPER NOTIFIKASI
  // ==========================================
  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  // ==========================================
  // LANGKAH 1: KIRIM OTP
  // ==========================================
  const handleSendOtp = async (e) => {
    e.preventDefault();

    clearMessages();
    setLoading(true);

    try {
      const response = await API.post('/auth/forgot-password', {
        email: email.trim(),
      });

      if (!response.data.success) {
        setErrorMessage(
          response.data.message || 'Gagal mengirim kode OTP.'
        );
        return;
      }

      setOtp(['', '', '', '', '', '']);
      setStep(2);

      setSuccessMessage(
        'Permintaan berhasil diproses. Periksa inbox atau folder spam Gmail kamu.'
      );
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        'Gagal mengirim OTP. Periksa koneksi backend dan email kamu.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INPUT OTP
  // ==========================================
  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, '').slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);

    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // ==========================================
  // LANGKAH 2: VERIFIKASI OTP
  // ==========================================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    clearMessages();

    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setErrorMessage('Masukkan seluruh 6 digit kode OTP.');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/auth/verify-otp', {
        email: email.trim(),
        otp: otpCode,
      });

      if (!response.data.success || !response.data.resetToken) {
        setErrorMessage(
          response.data.message || 'Verifikasi OTP gagal.'
        );
        return;
      }

      setResetToken(response.data.resetToken);
      setStep(3);
      setSuccessMessage('OTP berhasil diverifikasi.');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        'Kode OTP salah atau sudah kedaluwarsa.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // KIRIM ULANG OTP
  // ==========================================
  const handleResendOtp = async () => {
    clearMessages();
    setLoading(true);

    try {
      const response = await API.post('/auth/forgot-password', {
        email: email.trim(),
      });

      if (!response.data.success) {
        setErrorMessage(
          response.data.message || 'Gagal mengirim ulang OTP.'
        );
        return;
      }

      setOtp(['', '', '', '', '', '']);

      setSuccessMessage(
        'Kode OTP baru berhasil diminta. Periksa Gmail kamu.'
      );
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        'Gagal mengirim ulang kode OTP.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LANGKAH 3: SIMPAN PASSWORD BARU
  // ==========================================
  const handleResetPassword = async (e) => {
    e.preventDefault();

    clearMessages();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordPattern.test(newPassword)) {
      setErrorMessage(
        'Password minimal 8 karakter dan wajib memiliki huruf besar, huruf kecil, angka, serta simbol.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/auth/reset-password', {
        email: email.trim(),
        resetToken,
        newPassword,
        confirmPassword,
      });

      if (!response.data.success) {
        setErrorMessage(
          response.data.message || 'Gagal mengubah kata sandi.'
        );
        return;
      }

      setSuccessMessage(
        'Kata sandi berhasil diubah. Silakan login menggunakan kata sandi baru.'
      );

      setNewPassword('');
      setConfirmPassword('');
      setResetToken('');

    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        'Gagal mengubah kata sandi. Silakan ulangi proses reset.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // KEMBALI KE LOGIN
  // ==========================================
  const handleBackToLogin = () => {
    navigate('/auth/login', {
      replace: true,
    });
  };

  const passwordHasMinLength = newPassword.length >= 8;
  const passwordHasUpperLower =
    /[A-Z]/.test(newPassword) &&
    /[a-z]/.test(newPassword);
  const passwordHasNumber = /\d/.test(newPassword);
  const passwordHasSymbol = /[^A-Za-z0-9]/.test(newPassword);

  return (
    <div className="w-full flex flex-col items-center">

      {/* LOGO & BRANDING */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={logo}
          alt="REDScan Logo"
          className="w-12 h-12 object-contain mb-1.5"
        />

        <h1 className="text-lg font-bold text-[#E54322] tracking-tight">
          REDScan
        </h1>

        <p className="text-[10px] font-semibold text-[#A89C90] tracking-wider uppercase">
          POS ENTERPRISE CLOUD
        </p>
      </div>

      {/* INDIKATOR LANGKAH */}
      <div className="w-full bg-[#E2DCCE] rounded-xl p-2.5 mb-4 border border-[#D5CDC0] flex items-center justify-between text-[10px] font-semibold text-[#6B5E52]">
        <span className="text-emerald-700 font-bold">
          LANGKAH 0{step} / 03
        </span>

        <span className="text-[9px] text-[#8C827A] font-medium">
          {step === 1 && 'Verifikasi Email'}
          {step === 2 && 'Verifikasi OTP'}
          {step === 3 && 'Buat Kata Sandi Baru'}
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full grid grid-cols-3 gap-1.5 mb-5">
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            className={`h-1.5 rounded-full transition-all ${
              step >= number
                ? 'bg-[#E54322]'
                : 'bg-[#D5CDC0]'
            }`}
          />
        ))}
      </div>

      {/* PESAN ERROR */}
      {errorMessage && (
        <div
          role="alert"
          className="w-full p-2.5 mb-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded-xl text-center"
        >
          {errorMessage}
        </div>
      )}

      {/* PESAN SUKSES */}
      {successMessage && (
        <div
          role="status"
          className="w-full p-2.5 mb-3 bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs rounded-xl text-center"
        >
          {successMessage}
        </div>
      )}

      {/* ====================================== */}
      {/* LANGKAH 1: EMAIL */}
      {/* ====================================== */}
      {step === 1 && (
        <div className="w-full text-left">

          <div className="text-center mb-4">
            <h2 className="text-base font-bold text-[#2C221E]">
              Lupa Kata Sandi?
            </h2>

            <p className="text-xs text-[#6B5E52] mt-1 leading-relaxed">
              Masukkan alamat email admin terdaftar.
              Kami akan mengirimkan kode OTP 6 digit
              untuk verifikasi keamanan.
            </p>
          </div>

          <form
            onSubmit={handleSendOtp}
            className="space-y-3"
          >
            <div>
              <label className="text-xs font-bold text-[#2C221E] block mb-1">
                Alamat Email Resmi
              </label>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
                  <Mail size={18} />
                </div>

                <input
                  type="email"
                  placeholder="Masukkan email Gmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full h-11 pl-11 pr-4 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
                />
              </div>
            </div>

            <div className="bg-[#E2DCCE]/60 border border-[#D5CDC0] p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-[#6B5E52]">
              <Shield
                size={16}
                className="text-[#A39788] shrink-0 mt-0.5"
              />

              <p className="leading-tight">
                Pastikan kamu memiliki akses ke inbox Gmail.
                Kode OTP berlaku selama 10 menit.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#210D04] hover:bg-[#3B2415] disabled:bg-[#8C7B70] text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>
                {loading ? 'Mengirim OTP...' : 'Kirim Kode Verifikasi'}
              </span>

              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-xs text-[#6B5E52] hover:text-[#2C221E] transition-colors cursor-pointer inline-flex items-center gap-1 font-medium"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke halaman Login</span>
            </button>
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* LANGKAH 2: OTP */}
      {/* ====================================== */}
      {step === 2 && (
        <div className="w-full text-left">

          <div className="text-center mb-4">
            <h2 className="text-base font-bold text-[#2C221E]">
              Verifikasi Kode Keamanan
            </h2>

            <p className="text-xs text-[#6B5E52] mt-1 leading-relaxed">
              Masukkan kode OTP yang dikirimkan ke alamat:
            </p>

            <div className="inline-flex items-center gap-1.5 bg-white border border-[#D8D1C7] px-3 py-1 rounded-lg text-xs font-semibold text-[#2C221E] mt-2">
              <Mail size={13} className="text-[#A39788]" />

              <span>{email}</span>

              <button
                type="button"
                onClick={() => {
                  clearMessages();
                  setStep(1);
                }}
                className="text-[10px] text-[#E54322] hover:underline ml-1 cursor-pointer"
              >
                (Ubah)
              </button>
            </div>
          </div>

          <form
            onSubmit={handleVerifyOtp}
            className="space-y-4"
          >
            <div>
              <label className="text-[10px] font-bold text-[#8A8178] block text-center uppercase tracking-wider mb-2">
                Masukkan 6 Digit Kode OTP
              </label>

              <div className="flex justify-between items-center gap-1.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    disabled={loading}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                    onKeyDown={(e) =>
                      handleOtpKeyDown(e, index)
                    }
                    onFocus={(e) => e.target.select()}
                    className="w-10 h-11 bg-white border border-[#D8D1C7] rounded-xl text-center text-sm font-bold text-[#2C221E] focus:outline-none focus:border-[#210D04] transition-colors"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#6B5E52] px-1">
              <span>
                <b className="text-[#2C221E]">
                  OTP berlaku 10 menit
                </b>
              </span>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="text-[#E54322] hover:underline font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={12} />
                <span>Kirim Ulang Kode</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#210D04] hover:bg-[#3B2415] disabled:bg-[#8C7B70] text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>
                {loading ? 'Memverifikasi...' : 'Verifikasi & Lanjutkan'}
              </span>

              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                clearMessages();
                setStep(1);
              }}
              className="text-xs text-[#6B5E52] hover:text-[#2C221E] transition-colors cursor-pointer inline-flex items-center gap-1 font-medium"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Masukkan Email</span>
            </button>
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* LANGKAH 3: PASSWORD BARU */}
      {/* ====================================== */}
      {step === 3 && (
        <div className="w-full text-left">

          <div className="text-center mb-4">
            <h2 className="text-base font-bold text-[#2C221E]">
              Buat Kata Sandi Baru
            </h2>

            <p className="text-xs text-[#6B5E52] mt-1 leading-relaxed">
              Buat kata sandi baru untuk melindungi akun REDScan kamu.
            </p>
          </div>

          <form
            onSubmit={handleResetPassword}
            className="space-y-3"
          >
            {/* PASSWORD BARU */}
            <div>
              <label className="text-xs font-bold text-[#2C221E] block mb-1">
                Kata Sandi Baru
              </label>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
                  <Lock size={18} />
                </div>

                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Masukkan kata sandi baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full h-11 pl-11 pr-11 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                  className="absolute right-3.5 flex items-center justify-center text-[#A39788] hover:text-[#2C221E] cursor-pointer"
                >
                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ATURAN PASSWORD */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-[#6B5E52]">
              <div className="flex items-center gap-1">
                <CheckCircle2
                  size={12}
                  className={
                    passwordHasMinLength
                      ? 'text-emerald-600'
                      : 'text-[#A39788]'
                  }
                />
                <span>Min. 8 Karakter</span>
              </div>

              <div className="flex items-center gap-1">
                <CheckCircle2
                  size={12}
                  className={
                    passwordHasUpperLower
                      ? 'text-emerald-600'
                      : 'text-[#A39788]'
                  }
                />
                <span>Huruf Besar & Kecil</span>
              </div>

              <div className="flex items-center gap-1">
                <CheckCircle2
                  size={12}
                  className={
                    passwordHasNumber
                      ? 'text-emerald-600'
                      : 'text-[#A39788]'
                  }
                />
                <span>Memiliki Angka</span>
              </div>

              <div className="flex items-center gap-1">
                <CheckCircle2
                  size={12}
                  className={
                    passwordHasSymbol
                      ? 'text-emerald-600'
                      : 'text-[#A39788]'
                  }
                />
                <span>Memiliki Simbol</span>
              </div>
            </div>

            {/* KONFIRMASI PASSWORD */}
            <div>
              <label className="text-xs font-bold text-[#2C221E] block mb-1">
                Konfirmasi Kata Sandi Baru
              </label>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
                  <Lock size={18} />
                </div>

                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Ulangi kata sandi baru"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  disabled={loading}
                  className="w-full h-11 pl-11 pr-11 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3.5 flex items-center justify-center text-[#A39788] hover:text-[#2C221E] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* INFORMASI */}
            <div className="bg-[#E2DCCE]/60 border border-[#D5CDC0] p-2.5 rounded-xl flex items-start gap-2 text-[10px] text-[#6B5E52]">
              <KeyRound
                size={15}
                className="text-[#A39788] shrink-0 mt-0.5"
              />

              <p className="leading-tight">
                Pastikan kata sandi baru kamu mudah diingat
                dan tidak dibagikan kepada orang lain.
              </p>
            </div>

            {/* SIMPAN PASSWORD */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#210D04] hover:bg-[#3B2415] disabled:bg-[#8C7B70] text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>
                {loading ? 'Menyimpan...' : 'Simpan Sandi Baru'}
              </span>

              {!loading && <span>→</span>}
            </button>
          </form>

          {/* KEMBALI LOGIN SETELAH BERHASIL */}
          {successMessage && (
            <button
              type="button"
              onClick={handleBackToLogin}
              className="w-full mt-3 h-10 border border-[#D8D1C7] bg-white text-[#2C221E] rounded-xl text-xs font-bold hover:bg-[#F4F1EA] transition-colors"
            >
              Kembali ke Login
            </button>
          )}
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-6 pt-2 flex flex-col items-center justify-center gap-1 text-[9px] text-[#A39788]">
        <div className="flex items-center gap-1 font-medium">
          <ShieldCheck size={12} className="text-[#A39788]" />
          <span>REDScan Account Security</span>
        </div>

        <p className="text-[8px] text-[#B8AC9D]">
          © 2025 REDScan Security System. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}
