import React from 'react';

export default function Dashboard({ shift, setPage }) {
  return (
    <div className="dash-layout">
      {/* SIDEBAR KIRI */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-brand">
            <div className="sidebar-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <div>
              <div className="sidebar-brand-title">REDScan</div>
              <div className="sidebar-brand-sub">POS ENTERPRISE CLOUD</div>
            </div>
          </div>

          <div className="menu-label">MENU UTAMA</div>
          <nav className="nav-list">
            <div className="nav-item active">
              <div className="nav-left">
                <span>🎛️</span>
                <span>Dashboard</span>
              </div>
              <span className="badge-dot"></span>
            </div>

            <div className="nav-item">
              <div className="nav-left">
                <span>🕒</span>
                <span>History</span>
              </div>
              <span className="badge-count">150</span>
            </div>

            <div className="nav-item">
              <div className="nav-left">
                <span>📦</span>
                <span>Stok Bahan</span>
              </div>
              <span className="badge-dot-yellow"></span>
            </div>

            <div className="nav-item">
              <div className="nav-left">
                <span>📊</span>
                <span>Laporan Omzet</span>
              </div>
            </div>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="user-avatar">AK</div>
            <div>
              <div className="user-name">Annisa K. (Username)</div>
              <div className="user-role">Head Cashier</div>
            </div>
          </div>

          <div className="shift-badge-side">
            <span>⏱️ Shift: {shift}</span>
            <span className="status-tag">Aktif</span>
          </div>

          <div className="action-btns">
            <button className="btn-side-sub">👤 Profil</button>
            <button className="btn-side-sub" onClick={() => setPage('login')}>🚪 Tutup Shift</button>
          </div>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="dash-main">
        {/* TOPBAR */}
        <header className="dash-topbar">
          <div>
            <h1 className="dash-title">Dashboard Kasir</h1>
            <p className="dash-subtitle">Terminal Kasir #T-01 • Posisi: Kasir Utama • Malang Outlet</p>
          </div>

          <div className="topbar-right">
            <div className="time-box">
              <span>⏱️️</span>
              <div>
                <div>10:03:24</div>
                <div className="time-sub">WAKTU LOKAL TERMINAL</div>
              </div>
            </div>

            <div className="icon-btn-top">
              🔔
              <span className="notif-dot"></span>
            </div>

            <div className="user-pill">
              <div className="user-avatar" style={{ width: 26, height: 26, fontSize: 10 }}>U</div>
              <span>Username <span style={{ color: '#8C827A', fontWeight: 500 }}>Kasir #01</span></span>
            </div>
          </div>
        </header>

        {/* BANNER WELCOME */}
        <div className="banner-welcome">
          <div>
            <div className="banner-tag">✳️ SESI KASIR AKTIF</div>
            <h2 className="banner-title">Halo Username, Selamat Bekerja !</h2>
            <div className="banner-shift-pill">
              ⏱️ Shift Pagi: {shift}
            </div>
          </div>
          <div className="banner-bg-decor"></div>
        </div>

        {/* METRICS GRID */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="card-header-top">
              <span className="metric-title">TOTAL TRANSAKSI<br />HARI INI</span>
              <div className="metric-icon-box">📄</div>
            </div>
            <div>
              <div className="metric-val-row">
                <span className="metric-num">150</span>
                <span className="metric-unit">struk tercetak</span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="card-header-top">
              <span className="metric-title">TOTAL OMZET HARI<br />INI</span>
              <div className="metric-icon-box">💵</div>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Rp</div>
              <div className="metric-num">3.500.000</div>
              <div className="omzet-breakdown">
                <div className="breakdown-item">
                  <span className="dot-blue"></span> QRIS: Rp 2.450.000
                </div>
                <div className="breakdown-item">
                  <span className="dot-orange"></span> Tunai: Rp 1.050.000
                </div>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="card-header-top">
              <span className="metric-title">LIHAT PESANAN<br />HARI INI</span>
              <div className="metric-icon-box">🧃</div>
            </div>
            <div>
              <div className="metric-val-row">
                <span className="metric-num">0</span>
                <span className="metric-unit" style={{ fontWeight: 700, color: '#1F1915' }}>PESANAN ANTRE</span>
              </div>
              <p style={{ fontSize: 10, color: '#8C827A', marginTop: 4 }}>
                Semua pesanan shift ini telah terselesaikan dengan baik.
              </p>
              <button className="btn-order-screen">
                Buka Layar Pemesanan &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* TABEL TRANSAKSI TERKINI */}
        <div className="table-card">
          <div className="table-header">
            <div>
              <div className="table-title">
                Aktivitas Transaksi Terkini
                <span className="shift-tag-sm">Shift 1</span>
              </div>
              <p className="table-sub">Daftar transaksi kasir yang selesai diproses hari ini</p>
            </div>
          </div>

          <div className="search-row">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Cari No. Struk / Meja..." />
            </div>
            <button className="btn-refresh">🔄</button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>WAKTU</th>
                <th>NO. INVOICE</th>
                <th>PELANGGAN / MEJA</th>
                <th>METODE</th>
                <th>AKSI</th>
                <th style={{ textAlign: 'right' }}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tx-time">09:08:12</td>
                <td className="tx-inv">#TRX-882910</td>
                <td>
                  <div className="tx-cust-name">Dimas Arya</div>
                  <div className="tx-cust-sub">Meja 04 • Dine In</div>
                </td>
                <td><span className="pay-badge pay-qris">QRIS BCA</span></td>
                <td><button className="btn-print">Print Struk</button></td>
                <td className="tx-total">Rp 48.000</td>
              </tr>

              <tr>
                <td className="tx-time">09:02:45</td>
                <td className="tx-inv">#TRX-882909</td>
                <td>
                  <div className="tx-cust-name">Siti Nurhaliza</div>
                  <div className="tx-cust-sub">Take Away</div>
                </td>
                <td><span className="pay-badge pay-cash">Tunai</span></td>
                <td><button className="btn-print">Print Struk</button></td>
                <td className="tx-total">Rp 26.000</td>
              </tr>

              <tr>
                <td className="tx-time">08:54:19</td>
                <td className="tx-inv">#TRX-882908</td>
                <td>
                  <div className="tx-cust-name">Rian Hidayat</div>
                  <div className="tx-cust-sub">Meja 09 • Dine In</div>
                </td>
                <td><span className="pay-badge pay-qris">QRIS GoPay</span></td>
                <td><button className="btn-print">Print Struk</button></td>
                <td className="tx-total">Rp 74.000</td>
              </tr>

              <tr>
                <td className="tx-time">08:45:00</td>
                <td className="tx-inv">#TRX-882907</td>
                <td>
                  <div className="tx-cust-name">Budi Santoso</div>
                  <div className="tx-cust-sub">Meja 02 • Dine In</div>
                </td>
                <td><span className="pay-badge pay-debit">Debit Mandiri</span></td>
                <td><button className="btn-print">Print Struk</button></td>
                <td className="tx-total">Rp 112.000</td>
              </tr>
            </tbody>
          </table>

          <div className="table-footer">
            <span>Menampilkan 4 dari 150 transaksi hari ini</span>
            <span className="link-history">Buka Semua Riwayat &rsaquo;</span>
          </div>
        </div>
      </main>
    </div>
  );
}