import React from 'react';

export default function Register({ showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, setPage }) {
  return (
    <>
      <form className="form-box" onSubmit={(e) => { e.preventDefault(); setPage('login'); }}>
        <div className="input-group">
          <label>Nama Lengkap</label>
          <div className="input-field-wrap">
            <span className="input-icon-left">👤</span>
            <input type="text" placeholder="Masukkan Nama Lengkap Anda" />
          </div>
        </div>

        <div className="input-group">
          <label>Email</label>
          <div className="input-field-wrap">
            <span className="input-icon-left">👤</span>
            <input type="email" placeholder="Masukkan Email Anda" />
          </div>
        </div>

        <div className="input-group">
          <label>Username</label>
          <div className="input-field-wrap">
            <span className="input-icon-left">👤</span>
            <input type="text" placeholder="Masukkan Username Anda" />
          </div>
        </div>

        <div className="input-group">
          <label>Kata Sandi</label>
          <div className="input-field-wrap">
            <span className="input-icon-left">🔓</span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
            />
            <button
              type="button"
              className="eye-btn-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>
          <p className="password-hint">
            <span>ℹ️</span> Kata sandi harus minimal 8 karakter dengan kombinasi huruf, angka, dan simbol.
          </p>
        </div>

        <div className="input-group">
          <label>Konfirmasi Kata Sandi</label>
          <div className="input-field-wrap">
            <span className="input-icon-left">🔓</span>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
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

        <div className="checkbox-row">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Ingat Saya</label>
        </div>

        <button type="submit" className="btn-brown">
          Daftar
        </button>
      </form>

      <p className="switch-info">
        Sudah punya akun?{' '}
        <span className="switch-btn" onClick={() => setPage('login')}>
          Login &rarr;
        </span>
      </p>
    </>
  );
}