import React from 'react';

export default function Welcome({ setPage }) {
  return (
    <>
      <h1 className="tagline-text">
        Gak Pakai Lama, <br />
        Pesan Langsung dari HP—mu.
      </h1>

      <div style={{ width: '100%' }}>
        <button className="btn-brown" onClick={() => setPage('login')}>
          Login
        </button>
        <p className="switch-info">
          Belum punya akun?{' '}
          <span className="switch-btn" onClick={() => setPage('register')}>
            Daftar &rarr;
          </span>
        </p>
      </div>
    </>
  );
}