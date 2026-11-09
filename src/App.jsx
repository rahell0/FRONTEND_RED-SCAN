
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';

import {
  LayoutDashboard,
  History,
  Boxes,
  BarChart3,
  Clock,
  User,
  LogOut as LogOutIcon,
  Bell,
  Menu,
  X,
} from 'lucide-react';

import logo from './assets/logo.png';

import Welcome from './pages/Landingpage/page.jsx';
import Login from './pages/(auth)/Login/page.jsx';
import ForgotPassword from './pages/(auth)/ForgotPassword/page.jsx';

import Dashboard from './pages/Dashboard/page.jsx';
import ProfilePage from './pages/Profile/page.jsx';
import Stok from './pages/Stok/page.jsx';
import DataPemesanan from './pages/DataPemesanan/page.jsx';
import HistoryPage from './pages/History/page.jsx';
import LaporanOmzet from './pages/Omzet/page.jsx';

import Notifikasi from './components/Notifikasi';
import BuktiTransaksi from './components/BuktiTransaksi';
import LogOut from './components/LogOut';

const USER_STORAGE_KEY = 'redscan_user';

const getPageTitle = (pathname) => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/history': 'History',
    '/stok': 'Stok Bahan',
    '/laporan-omzet': 'Laporan Omzet',
    '/pemesanan': 'Data Pemesanan',
    '/profile': 'Profil Saya',
    '/notifikasi': 'Notifikasi',
    '/bukti-transaksi': 'Bukti Transaksi',
  };

  return titles[pathname] || 'REDScan POS';
};

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'History',
    path: '/history',
    icon: History,
    badge: '150',
    activePaths: ['/history', '/pemesanan', '/bukti-transaksi'],
  },
  {
    label: 'Stok Bahan',
    path: '/stok',
    icon: Boxes,
    dot: true,
  },
  {
    label: 'Laporan Omzet',
    path: '/laporan-omzet',
    icon: BarChart3,
  },
];

function DashboardLayout({
  children,
  user,
  shift,
  setShowLogoutModal,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeUserName =
    user?.name || user?.username || 'Admin';

  const initials = activeUserName.substring(0, 2).toUpperCase();

  // Tutup drawer saat pindah halaman.
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Tutup drawer dengan tombol Escape.
  useEffect(() => {
    if (!sidebarOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  return (
    <div className="flex w-full h-dvh overflow-hidden bg-[#F4F1EA] text-[#1F1915] antialiased">

      {/* BACKDROP MOBILE */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        id="main-sidebar"
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-dvh w-[min(280px,85vw)] shrink-0
          flex-col justify-between overflow-y-auto
          border-r border-[#2D2420]
          bg-[#1C1613] p-5 text-white
          transition-transform duration-300 ease-in-out
          md:static md:z-auto md:h-full md:w-64
          md:min-w-0 md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          <div className="mb-8 mt-1 flex items-center justify-between gap-3 px-2">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={logo}
                alt="REDScan Logo"
                className="h-7 w-auto shrink-0 object-contain"
              />

              <div className="min-w-0">
                <h1 className="text-base font-bold leading-none tracking-tight text-white">
                  REDScan
                </h1>
                <p className="mt-1 text-[9px] font-medium uppercase tracking-wider text-[#8C827A]">
                  POS Enterprise
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Tutup sidebar"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-[#C2B7AC] hover:bg-[#332620] md:hidden"
            >
              <X size={19} />
            </button>
          </div>

          <div className="mb-2.5 px-3 text-[10px] font-bold uppercase tracking-widest text-[#786E65]">
            Menu Utama
          </div>

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const activePaths = item.activePaths || [item.path];
              const isActive = activePaths.includes(location.pathname);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-xs transition-all duration-200 ${
                    isActive
                      ? 'border-[#47362E] bg-[#332620] font-semibold text-white shadow-sm'
                      : 'border-transparent font-medium text-[#A3988E] hover:bg-[#261E1A] hover:text-white'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon
                      size={17}
                      className={`shrink-0 ${
                        isActive
                          ? item.path === '/dashboard'
                            ? 'text-[#E54322]'
                            : 'text-white'
                          : 'text-[#8C827A]'
                      }`}
                    />
                    <span className="truncate tracking-wide">
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <span className="rounded-md border border-[#3A2D26] bg-[#2A201B] px-2 py-0.5 text-[10px] font-semibold text-[#C2B7AC]">
                      {item.badge}
                    </span>
                  )}

                  {item.dot && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  )}

                  {item.path === '/dashboard' && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* USER SIDEBAR */}
        <div className="mt-6 flex flex-col gap-3 border-t border-[#2D2420] pt-4">
          <div className="flex min-w-0 items-center gap-3 px-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#524137] bg-[#3B2E27] text-xs font-bold uppercase text-white">
              {initials}
            </div>

            <div className="min-w-0">
              <h4 className="m-0 truncate text-xs font-bold tracking-tight text-white">
                {activeUserName}
              </h4>
              <p className="m-0 mt-0.5 truncate text-[10px] font-medium text-[#8C827A]">
                {user?.role || 'Admin'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-xl border border-[#332721] bg-[#241C18] p-2.5">
            <div className="flex min-w-0 items-center gap-2 text-[11px] font-medium text-[#C2B7AC]">
              <Clock className="shrink-0 text-amber-500" size={13} />
              <span className="truncate">Shift: {typeof shift === 'string' ? shift : shift?.time || '-'}</span>
            </div>
            <span className="shrink-0 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
              AKTIF
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/profile"
              className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-[#332721] bg-[#241C18] p-2 text-[11px] font-medium text-[#C2B7AC] transition-all hover:bg-[#2F241F] hover:text-white"
            >
              <User size={13} className="shrink-0" />
              <span>Profil</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-[#42221B] bg-[#2C1914] p-2 text-[11px] font-medium text-red-400 transition-all hover:bg-[#3D211A]"
            >
              <LogOutIcon size={13} className="shrink-0" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* AREA KANAN */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-30 flex h-16 min-h-16 shrink-0 items-center justify-between gap-3 border-b border-[#E6DFD5] bg-white px-4 shadow-xs sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Buka menu"
              aria-controls="main-sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 text-[#6B6259] transition-colors hover:bg-[#F4F1EA] hover:text-[#1F1915] md:hidden"
            >
              <Menu size={21} />
            </button>

            <h2 className="truncate text-xs font-bold uppercase tracking-wider text-[#1F1915] sm:text-sm">
              {getPageTitle(location.pathname)}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <button
              type="button"
              aria-label="Buka notifikasi"
              onClick={() => navigate('/notifikasi')}
              className="relative rounded-xl p-2 text-[#6B6259] transition-all hover:bg-[#F4F1EA] hover:text-[#1F1915]"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E54322]" />
            </button>

            <div className="hidden h-5 w-px bg-[#E6DFD5] sm:block" />

            <div className="max-w-[120px] text-right text-xs leading-tight sm:max-w-none">
              <p className="truncate font-bold text-[#1F1915]">
                {activeUserName}
              </p>
              <p className="mt-1 hidden text-[10px] font-medium text-[#8A8178] sm:block">
                Malang Outlet
              </p>
            </div>
          </div>
        </header>

        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-[#F4F1EA] p-3 sm:p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function LogOutWrapper({
  showLogoutModal,
  setShowLogoutModal,
  onLogout,
}) {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
    navigate('/auth/login', { replace: true });
  };

  return (
    <LogOut
      isOpen={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      onConfirm={handleConfirmLogout}
      sessionId="#8820-POS-01"
    />
  );
}

export default function App() {
  const [shift, setShift] = useState('16:00 - 00:00');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Gagal membaca data user:', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Gagal menyimpan data user:', error);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setSelectedTransaction(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const protectedPage = (content) => (
    user ? content : <Navigate to="/auth/login" replace />
  );

  const layout = (children) => (
    <DashboardLayout
      user={user}
      shift={shift}
      setShowLogoutModal={setShowLogoutModal}
    >
      {children}
    </DashboardLayout>
  );

  return (
    <Router>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
          font-family: 'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: -0.02em;
        }

        html, body, #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
        }

        img, svg, video, canvas {
          max-width: 100%;
        }

        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: #d1c7bd;
          border-radius: 99px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a89f95;
        }
      `}</style>

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex min-h-dvh w-full items-center justify-center bg-[#EFECE6] p-3 antialiased sm:p-4">
              <Welcome />
            </div>
          }
        />

        <Route
          path="/auth/login"
          element={
            <div className="flex min-h-dvh w-full items-center justify-center bg-[#EFECE6] p-3 antialiased sm:p-4">
              <div className="flex w-full max-w-[440px] flex-col items-center rounded-[24px] border border-[#D8D1C7] bg-[#EAE6DE] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:rounded-[32px] sm:p-9">
                <Login
                  shift={shift}
                  setShift={setShift}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  setUser={setUser}
                />
              </div>
            </div>
          }
        />

        <Route
          path="/auth/forgot-password"
          element={
            <div className="flex min-h-dvh w-full items-center justify-center bg-[#EFECE6] p-3 antialiased sm:p-4">
              <div className="flex w-full max-w-[440px] flex-col items-center rounded-[24px] border border-[#D8D1C7] bg-[#EAE6DE] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:rounded-[32px] sm:p-9">
                <ForgotPassword />
              </div>
            </div>
          }
        />

        <Route
          path="/dashboard"
          element={protectedPage(
            layout(
              <Dashboard
                user={user}
                shift={shift}
                setSelectedTransaction={setSelectedTransaction}
                onOpenLogout={() => setShowLogoutModal(true)}
              />
            )
          )}
        />

        <Route
          path="/history"
          element={protectedPage(
            layout(
              <HistoryPage
                user={user}
                shift={shift}
                setSelectedTransaction={setSelectedTransaction}
                onOpenLogout={() => setShowLogoutModal(true)}
              />
            )
          )}
        />

        <Route
          path="/bukti-transaksi"
          element={protectedPage(
            layout(
              <BuktiTransaksi
                selectedTransaction={selectedTransaction}
                user={user}
                onOpenLogout={() => setShowLogoutModal(true)}
              />
            )
          )}
        />

        <Route
          path="/pemesanan"
          element={protectedPage(
            layout(
              <DataPemesanan
                user={user}
                shift={shift}
                onOpenLogout={() => setShowLogoutModal(true)}
              />
            )
          )}
        />

        <Route
          path="/stok"
          element={protectedPage(
            layout(
              <Stok
                user={user}
                shift={shift}
                onOpenLogout={() => setShowLogoutModal(true)}
              />
            )
          )}
        />

        <Route
          path="/laporan-omzet"
          element={protectedPage(
            layout(
              <LaporanOmzet
                user={user}
                shift={shift}
                onOpenLogout={() => setShowLogoutModal(true)}
              />
            )
          )}
        />

        <Route
          path="/profile"
          element={protectedPage(
            layout(
              <ProfilePage
                user={user}
                setUser={setUser}
                shift={shift}
                onOpenLogout={() => setShowLogoutModal(true)}
              />
            )
          )}
        />

        <Route
          path="/notifikasi"
          element={protectedPage(
            layout(
              <Notifikasi
                user={user}
                shift={shift}
                onOpenLogout={() => setShowLogoutModal(true)}
              />
            )
          )}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <LogOutWrapper
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        onLogout={handleLogout}
      />
    </Router>
  );
}
