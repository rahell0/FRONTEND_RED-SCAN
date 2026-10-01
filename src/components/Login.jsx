import React from 'react';

export default function Login({ shift, setShift, showPassword, setShowPassword, setPage }) {
  return (
    <>
      <form className="form-box" onSubmit={(e) => { e.preventDefault(); setPage('dashboard'); }}>
        <div className="input-group">
          <label>Username/Email</label>
          <div className="input-field-wrap">
            <span className="input-icon-left">👤</span>
            <input type="text" placeholder="Masukkan Username/Email Anda" defaultValue="Annisa K." />
          </div>
        </div>

        <div className="input-group">
          <label>Kata Sandi</label>
          <div className="input-field-wrap">
            <span className="input-icon-left">🔓</span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              defaultValue="12345678"
            />
            <button
              type="button"
              className="eye-btn-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>
          <div className="forgot-link">
            <a href="#forgot" onClick={(e) => { e.preventDefault(); setPage('forgot'); }}>
              Lupa Kata Sandi?
            </a>
          </div>
        </div>

        <div className="input-group">
          <label>Shift</label>
          <div className="input-field-wrap">
            <span className="input-icon-left">⏱️</span>
            <select value={shift} onChange={(e) => setShift(e.target.value)}>
              <option value="08:00 - 16:00">Shift: 08:00 - 16:00</option>
              <option value="16:00 - 00:00">Shift: 16:00 - 00:00</option>
            </select>
            <span className="select-arrow-right">▼</span>
          </div>
        </div>

        <button type="submit" className="btn-brown">
          Login
        </button>
      </form>

      <p className="switch-info">
        Belum punya akun?{' '}
        <span className="switch-btn" onClick={() => setPage('register')}>
          Daftar &rarr;
        </span>
      </p>
    </>
  );
}