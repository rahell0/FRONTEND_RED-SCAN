import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';

export default function App() {
  const [page, setPage] = useState('welcome'); // 'welcome' | 'login' | 'register' | 'forgot' | 'dashboard'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [shift, setShift] = useState('08:00 - 16:00');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box !important;
          margin: 0 !important;
          padding: 0 !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        body, html {
          width: 100vw !important;
          min-height: 100vh !important;
          background-color: #EFECE6 !important;
          color: #1F1915 !important;
        }

        /* --- STYLES AUTH (WELCOME, LOGIN, REGISTER, FORGOT) --- */
        .auth-container {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100vw !important;
          min-height: 100vh !important;
          background-color: #EFECE6 !important;
          padding: 24px !important;
        }

        .card-box {
          background-color: #EFECE6 !important;
          width: 100% !important;
          max-width: 440px !important;
          min-height: 600px !important;
          border-radius: 32px !important;
          border: 1px solid #D1C9C1 !important;
          box-shadow: 12px 12px 0px #5A5652 !important;
          padding: 36px 32px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          align-items: center !important;
          text-align: center !important;
        }

        .logo-section {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }

        .logo-box {
          width: 64px !important;
          height: 64px !important;
          background: linear-gradient(135deg, #E54322, #C22D11) !important;
          border-radius: 18px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-bottom: 8px !important;
          box-shadow: 0 4px 12px rgba(229, 67, 34, 0.25) !important;
        }

        .logo-title {
          font-size: 22px !important;
          font-weight: 800 !important;
          color: #E54322 !important;
        }

        .logo-subtitle {
          font-size: 8.5px !important;
          font-weight: 700 !important;
          color: #C2B9B0 !important;
          letter-spacing: 1.5px !important;
          margin-top: 2px !important;
        }

        .tagline-text {
          font-size: 23px !important;
          font-weight: 700 !important;
          color: #1F1915 !important;
          line-height: 1.45 !important;
          margin: 36px 0 !important;
        }

        .btn-brown {
          width: 100% !important;
          background-color: #33241C !important;
          color: #FFFFFF !important;
          border: none !important;
          padding: 14px 0 !important;
          border-radius: 12px !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          margin-top: 10px !important;
        }

        .btn-brown:hover {
          background-color: #231812 !important;
        }

        .switch-info {
          font-size: 13.5px !important;
          color: #8A8178 !important;
          margin-top: 14px !important;
        }

        .switch-btn {
          color: #1F1915 !important;
          font-weight: 700 !important;
          cursor: pointer !important;
        }

        .form-box {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
          text-align: left !important;
          margin: 12px 0 !important;
        }

        .input-group {
          display: flex !important;
          flex-direction: column !important;
          gap: 6px !important;
        }

        .input-group label {
          font-size: 12.5px !important;
          font-weight: 700 !important;
          color: #1F1915 !important;
        }

        .input-field-wrap {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
        }

        .input-field-wrap input, .input-field-wrap select {
          width: 100% !important;
          padding: 11px 38px 11px 38px !important;
          border-radius: 12px !important;
          border: 1px solid #D8D1C9 !important;
          background-color: #FFFFFF !important;
          font-size: 13px !important;
          outline: none !important;
          color: #333 !important;
          appearance: none !important;
          -webkit-appearance: none !important;
        }

        .input-icon-left {
          position: absolute !important;
          left: 12px !important;
          font-size: 14px !important;
          color: #8A8178 !important;
          pointer-events: none !important;
        }

        .select-arrow-right {
          position: absolute !important;
          right: 14px !important;
          font-size: 10px !important;
          color: #1F1915 !important;
          pointer-events: none !important;
        }

        .eye-btn-right {
          position: absolute !important;
          right: 12px !important;
          background: none !important;
          border: none !important;
          cursor: pointer !important;
          font-size: 14px !important;
          opacity: 0.6 !important;
        }

        .forgot-link {
          text-align: right !important;
          margin-top: 4px !important;
        }

        .forgot-link a {
          font-size: 11.5px !important;
          font-weight: 600 !important;
          color: #1F1915 !important;
          text-decoration: none !important;
        }

        /* STYLES KHUSUS LUPA KATA SANDI */
        .forgot-wrapper {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }

        .forgot-header-bar {
          width: 100% !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          font-size: 9.5px !important;
          font-weight: 700 !important;
          margin-bottom: 12px !important;
        }

        .green-text { color: #059669 !important; }
        .muted-text { color: #8A8178 !important; }

        .progress-bar-container {
          width: 100% !important;
          display: grid !important;
          grid-template-columns: 1fr 1fr 1fr !important;
          gap: 6px !important;
          margin-bottom: 20px !important;
        }

        .progress-step {
          height: 24px !important;
          background-color: #E2DBD0 !important;
          border-radius: 6px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 9px !important;
          font-weight: 700 !important;
          color: #8A8178 !important;
        }

        .progress-step.active {
          background-color: #33241C !important;
          color: #FFFFFF !important;
        }

        .forgot-icon-box {
          width: 64px !important;
          height: 64px !important;
          background-color: #E2DBD0 !important;
          border-radius: 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
          margin-bottom: 12px !important;
        }

        .lock-badge {
          position: absolute !important;
          bottom: -4px !important;
          right: -4px !important;
          background-color: #33241C !important;
          color: #FFF !important;
          font-size: 10px !important;
          padding: 2px 4px !important;
          border-radius: 50% !important;
        }

        .forgot-title {
          font-size: 20px !important;
          font-weight: 800 !important;
          color: #1F1915 !important;
          margin-bottom: 6px !important;
        }

        .forgot-desc {
          font-size: 11.5px !important;
          color: #6B6259 !important;
          line-height: 1.4 !important;
          margin-bottom: 14px !important;
        }

        .info-alert {
          background-color: #F3EFEA !important;
          border: 1px solid #E2DBD0 !important;
          border-radius: 10px !important;
          padding: 10px !important;
          display: flex !important;
          gap: 8px !important;
          font-size: 10px !important;
          color: #6B6259 !important;
          text-align: left !important;
          line-height: 1.35 !important;
        }

        .email-pill {
          background-color: #FAF8F5 !important;
          border: 1px solid #E2DBD0 !important;
          border-radius: 20px !important;
          padding: 4px 12px !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          color: #1F1915 !important;
          margin-bottom: 12px !important;
        }

        .edit-link {
          color: #059669 !important;
          cursor: pointer !important;
        }

        .otp-container {
          display: flex !important;
          justify-content: space-between !important;
          gap: 6px !important;
          margin: 8px 0 !important;
        }

        .otp-input {
          width: 44px !important;
          height: 48px !important;
          text-align: center !important;
          font-size: 18px !important;
          font-weight: 800 !important;
          border-radius: 10px !important;
          border: 1px solid #D8D1C9 !important;
          background-color: #FFFFFF !important;
          outline: none !important;
        }

        .timer-row {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          background-color: #F3EFEA !important;
          padding: 8px 12px !important;
          border-radius: 8px !important;
          font-size: 10.5px !important;
          color: #6B6259 !important;
          margin-top: 8px !important;
        }

        .resend-link {
          font-weight: 700 !important;
          color: #1F1915 !important;
          cursor: pointer !important;
        }

        .back-link {
          font-size: 11.5px !important;
          font-weight: 700 !important;
          color: #1F1915 !important;
          text-align: center !important;
          margin-top: 12px !important;
          cursor: pointer !important;
        }

        .req-checklist {
          display: flex !important;
          justify-content: space-between !important;
          font-size: 9.5px !important;
          color: #8A8178 !important;
          font-weight: 600 !important;
          margin-top: 4px !important;
        }

        .step-checks {
          display: flex !important;
          gap: 8px !important;
          font-size: 8.5px !important;
          color: #8A8178 !important;
        }

        .footer-security-notes {
          display: flex !important;
          gap: 8px !important;
          font-size: 9.5px !important;
          color: #8A8178 !important;
          margin-top: 16px !important;
        }

        .footer-sec {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 4px !important;
          margin-top: 16px !important;
        }

        .enc-text {
          font-size: 10.5px !important;
          color: #8A8178 !important;
          font-weight: 600 !important;
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
        }

        .copy-text {
          font-size: 9px !important;
          color: #B5ACA3 !important;
        }

        /* --- STYLES DASHBOARD KASIR (TIDAK BERUBAH) --- */
        .dash-layout {
          display: flex !important;
          width: 100vw !important;
          min-height: 100vh !important;
          background-color: #EFECE6 !important;
        }
        /* ... SISA CSS DASHBOARD SAMA PERSIS ... */
      `}</style>

      {/* HALAMAN AUTH */}
      {page !== 'dashboard' && (
        <div className="auth-container">
          <div className="card-box">
            <div className="logo-section">
              <div className="logo-box">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <span className="logo-title">REDScan</span>
              <span className="logo-subtitle">POS ENTERPRISE CLOUD</span>
            </div>

            {page === 'welcome' && <Welcome setPage={setPage} />}
            {page === 'login' && (
              <Login
                shift={shift}
                setShift={setShift}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                setPage={setPage}
              />
            )}
            {page === 'register' && (
              <Register
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                setPage={setPage}
              />
            )}
            {page === 'forgot' && <ForgotPassword setPage={setPage} />}

            <div className="footer-sec">
              <p className="enc-text">🛡️ Enkripsi Berstandar Industri 256–Bit</p>
              <p className="copy-text">© 2025 REDScan Security System. Seluruh hak cipta dilindungi.</p>
            </div>
          </div>
        </div>
      )}

      {/* HALAMAN DASHBOARD */}
      {page === 'dashboard' && <Dashboard shift={shift} setPage={setPage} />}
    </>
  );
}