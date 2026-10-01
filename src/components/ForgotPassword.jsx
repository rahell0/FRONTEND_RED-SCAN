import React, { useState } from 'react';

export default function ForgotPassword({ setPage }) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Sandi Baru
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
    <div className="forgot-wrapper">
      {/* STEP INDICATOR HEADER */}
      <div className="forgot-header-bar">
        <div className="forgot-step-label">
          {step === 1 && <span className="green-text">LANGKAH 01 / 03</span>}
          {step === 2 && <span className="muted-text">🟢 SESI ENKRIPSI: RSA-4096</span>}
          {step === 3 && (
            <div className="step-checks">
              <span>✓ 1. IDENTITAS</span>
              <span>✓ 2. TOKEN OTP</span>
              <span className="green-text">● 3. KREDENSIAL BARU</span>
            </div>
          )}
        </div>
        <div className="forgot-security-tag">
          {step === 1 && '● Kanal Terenkripsi'}
          {step === 2 && '🛡️ Protokol v4.18'}
        </div>
      </div>

      {/* PROGRESS BAR */}
      {step !== 3 && (
        <div className="progress-bar-container">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <span>{step > 1 ? '✓' : '1.'} Email</span>
          </div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <span>{step > 2 ? '✓' : '2.'} {step === 2 ? 'Kode OTP' : 'OTP'}</span>
          </div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <span>3. Sandi {step === 2 ? 'Baru' : ''}</span>
          </div>
        </div>
      )}

      {/* --- LANGKAH 1: MASUKKAN EMAIL --- */}
      {step === 1 && (
        <>
          <div className="forgot-icon-box">
            <span style={{ fontSize: 28 }}>✉️</span>
            <div className="lock-badge">🔒</div>
          </div>

          <h2 className="forgot-title">Lupa Kata Sandi?</h2>
          <p className="forgot-desc">
            Masukkan alamat email terdaftar Anda. Kami akan mengirimkan 6 digit kode OTP verifikasi keamanan perimeter.
          </p>

          <form className="form-box" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <div className="input-group">
              <label style={{ fontSize: 10, letterSpacing: 1, color: '#8A8178' }}>ALAMAT EMAIL RESMI</label>
              <div className="input-field-wrap">
                <span className="input-icon-left">@</span>
                <input
                  type="email"
                  placeholder="Masukkan Email yang Terdaftar"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="info-alert">
              <span>🛡️</span>
              <p>Pastikan Anda memiliki akses aktif ke inbox email ini. Token keamanan kedaluwarsa dalam 10 menit.</p>
            </div>

            <button type="submit" className="btn-brown" style={{ marginTop: 16 }}>
              Kirim Kode Verifikasi &rarr;
            </button>
          </form>
        </>
      )}

      {/* --- LANGKAH 2: VERIFIKASI OTP --- */}
      {step === 2 && (
        <>
          <div className="forgot-icon-box">
            <span style={{ fontSize: 28 }}>📑</span>
            <div className="lock-badge">🛡️</div>
          </div>

          <h2 className="forgot-title">Verifikasi Kode Keamanan</h2>
          <p className="forgot-desc">
            Kode otentikasi 6-digit sekali pakai telah ditransmisikan ke alamat:
          </p>
          <div className="email-pill">
            ✉️ {email || 'user.redscan@instansi.id'} <span className="edit-link" onClick={() => setStep(1)}>(Ubah)</span>
          </div>

          <form className="form-box" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
            <label style={{ fontSize: 10, letterSpacing: 1, color: '#8A8178', textAlign: 'center', display: 'block', margin: '12px 0 6px 0' }}>
              MASUKKAN 6-DIGIT TOKEN AKSES
            </label>

            <div className="otp-container">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>

            <div className="timer-row">
              <span>⌛ Kedaluwarsa dalam: <b>00:54</b></span>
              <span className="resend-link">🔄 Kirim Ulang Kode OTP</span>
            </div>

            <button type="submit" className="btn-brown" style={{ marginTop: 16 }}>
              Verifikasi & Lanjutkan &rarr;
            </button>

            <p className="back-link" onClick={() => setStep(1)}>
              &larr; Kembali ke Masukkan Email
            </p>
          </form>

          <div className="footer-security-notes">
            <span>🛡️ Anti-Brute Force Protection</span>
            <span>•</span>
            <span>🔗 MFA Enforced</span>
          </div>
        </>
      )}

      {/* --- LANGKAH 3: BUAT KATA SANDI BARU --- */}
      {step === 3 && (
        <>
          <div className="forgot-icon-box" style={{ marginTop: 12 }}>
            <span style={{ fontSize: 28 }}>🔑</span>
            <div className="lock-badge">🔄</div>
          </div>

          <h2 className="forgot-title">Buat Kata Sandi Baru</h2>
          <p className="forgot-desc">
            Buat kata sandi baru yang kuat untuk melindungi akses akun REDScan Anda.
          </p>

          <form className="form-box" onSubmit={(e) => { e.preventDefault(); setPage('login'); }}>
            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: 10, letterSpacing: 1, color: '#8A8178' }}>KATA SANDI BARU</label>
                <span style={{ fontSize: 10, color: '#8A8178' }}>Belum dimasukkan</span>
              </div>
              <div className="input-field-wrap">
                <span className="input-icon-left">🔒</span>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter terenkripsi"
                  required
                />
                <button
                  type="button"
                  className="eye-btn-right"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="req-checklist">
              <span>⚪ Min. 8 Karakter</span>
              <span>⚪ Huruf Besar & Kecil</span>
              <span>⚪ Angka & Simbol</span>
            </div>

            <div className="input-group" style={{ marginTop: 8 }}>
              <label style={{ fontSize: 10, letterSpacing: 1, color: '#8A8178' }}>KONFIRMASI KATA SANDI BARU</label>
              <div className="input-field-wrap">
                <span className="input-icon-left">🔒</span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Ulangi kata sandi baru"
                  required
                />
                <button
                  type="button"
                  className="eye-btn-right"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="info-alert" style={{ marginTop: 8 }}>
              <span>🛡️</span>
              <p>Setelah disimpan, semua sesi aktif di peramban dan perangkat seluler lain akan otomatis dicabut demi alasan integritas keamanan.</p>
            </div>

            <button type="submit" className="btn-brown" style={{ marginTop: 16 }}>
              Simpan Sandi & Masuk Sekarang &rarr;
            </button>
          </form>
        </>
      )}
    </div>
  );
}