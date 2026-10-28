import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation, 
  useNavigate,
  Navigate 
} from 'react-router-dom';

import { 
  LayoutDashboard, 
  History, 
  Boxes, 
  BarChart3, 
  Clock, 
  User, 
  LogOut as LogOutIcon, 
  Bell 
} from 'lucide-react';

// Import logo dari folder assets
import logo from "./assets/logo.png";

// Import Halaman Utama (Sub-Folder pages)
import Welcome from './pages/Landingpage/Welcome';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword';
import Dashboard from './pages/(dashboard)/Dashboard/Dashboard';
import ProfilePage from './pages/(dashboard)/Profile/Profile';
import Stok from './pages/(dashboard)/Stok/Stok';
import DataPemesanan from './pages/(dashboard)/DataPemesanan/DataPemesanan';
import HistoryPage from './pages/(dashboard)/History/History';
import LaporanOmzet from './pages/(dashboard)/Omzet/LaporanOmzet';

// Import Komponen Reusable
import Notifikasi from './components/Notifikasi';
import BuktiTransaksi from './components/BuktiTransaksi';
import LogOut from './components/LogOut';

// Helper untuk format judul header berdasarkan URL path aktif
const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/dashboard': return 'Dashboard';
    case '/history': return 'History';
    case '/stok': return 'Stok Bahan';
    case '/laporan-omzet': return 'Laporan Omzet';
    case '/pemesanan': return 'Data Pemesanan';
    case '/profile': return 'Profil Saya';
    case '/notifikasi': return 'Notifikasi';
    case '/bukti-transaksi': return 'Bukti Transaksi';
    default: return 'REDScan POS';
  }
};

// Komponen Layout Utama (Sidebar + Header + Area Konten)
function DashboardLayout({ children, user, shift, setShowLogoutModal }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#F4F1EA] text-[#1F1915] antialiased">
      
      {/* SIDEBAR KIRI */}
      <aside className="w-64 min-w-[256px] bg-[#1C1613] text-white flex flex-col justify-between p-5 shrink-0 h-full select-none border-r border-[#2D2420]">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-3 px-2 mb-8 mt-1">
            <img src={logo} alt="REDScan Logo" className="h-7 w-auto object-contain" />
            <div>
              <h1 className="text-base font-bold leading-none text-white tracking-tight">REDScan</h1>
              <p className="text-[9px] text-[#8C827A] font-medium tracking-wider uppercase mt-1">POS Enterprise</p>
            </div>
          </div>

          {/* Navigasi Menu Utama */}
          <div className="text-[10px] font-bold text-[#786E65] uppercase tracking-widest px-3 mb-2.5">
            Menu Utama
          </div>
          <nav className="flex flex-col gap-1.5">
            {/* Dashboard */}
            <Link
              to="/dashboard"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full transition-all duration-200 ${
                location.pathname === '/dashboard' 
                  ? 'bg-[#332620] text-white shadow-sm border border-[#47362E]' 
                  : 'text-[#A3988E] hover:bg-[#261E1A] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className={location.pathname === '/dashboard' ? 'text-[#E54322]' : 'text-[#8C827A]'} size={17} />
                <span className="tracking-wide">Dashboard</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
            </Link>

            {/* History */}
            <Link
              to="/history"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium w-full transition-all duration-200 ${
                ['/history', '/pemesanan', '/bukti-transaksi'].includes(location.pathname)
                  ? 'bg-[#332620] text-white shadow-sm border border-[#47362E]' 
                  : 'text-[#A3988E] hover:bg-[#261E1A] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <History size={17} className={['/history', '/pemesanan', '/bukti-transaksi'].includes(location.pathname) ? 'text-white' : 'text-[#8C827A]'} />
                <span className="tracking-wide">History</span>
              </div>
              <span className="text-[10px] bg-[#2A201B] px-2 py-0.5 rounded-md text-[#C2B7AC] font-semibold border border-[#3A2D26]">150</span>
            </Link>

            {/* Stok Bahan */}
            <Link
              to="/stok"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium w-full transition-all duration-200 ${
                location.pathname === '/stok' 
                  ? 'bg-[#332620] text-white shadow-sm border border-[#47362E]' 
                  : 'text-[#A3988E] hover:bg-[#261E1A] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Boxes size={17} className={location.pathname === '/stok' ? 'text-white' : 'text-[#8C827A]'} />
                <span className="tracking-wide">Stok Bahan</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            </Link>

            {/* Laporan Omzet */}
            <Link
              to="/laporan-omzet"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium w-full text-left transition-all duration-200 ${
                location.pathname === '/laporan-omzet' 
                  ? 'bg-[#332620] text-white shadow-sm border border-[#47362E]' 
                  : 'text-[#A3988E] hover:bg-[#261E1A] hover:text-white'
              }`}
            >
              <BarChart3 size={17} className={location.pathname === '/laporan-omzet' ? 'text-white' : 'text-[#8C827A]'} />
              <span className="tracking-wide">Laporan Omzet</span>
            </Link>
          </nav>
        </div>

        {/* Profile Sidebar Bawah */}
        <div className="pt-4 border-t border-[#2D2420] flex flex-col gap-3">
          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 rounded-full bg-[#3B2E27] text-white flex items-center justify-center font-bold text-xs border border-[#524137] shrink-0 uppercase">
              {user?.name ? user.name.substring(0, 2) : 'AK'}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate m-0 tracking-tight">
                {user?.name || 'Annisa K.'}
              </h4>
              <p className="text-[10px] text-[#8C827A] mt-0.5 m-0 font-medium">Head Cashier</p>
            </div>
          </div>

          <div className="bg-[#241C18] p-2.5 rounded-xl flex items-center justify-between border border-[#332721]">
            <div className="flex items-center gap-2 text-[#C2B7AC] text-[11px] font-medium">
              <Clock className="text-amber-500" size={13} />
              <span>Shift: {shift}</span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/20">
              AKTIF
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link 
              to="/profile"
              className="flex items-center justify-center gap-1.5 p-2 bg-[#241C18] text-[#C2B7AC] rounded-xl border border-[#332721] text-[11px] font-medium hover:bg-[#2F241F] hover:text-white transition-all cursor-pointer"
            >
              <User size={13} />
              <span>Profil</span>
            </Link>
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center justify-center gap-1.5 p-2 bg-[#2C1914] text-red-400 rounded-xl border border-[#42221B] text-[11px] font-medium hover:bg-[#3D211A] transition-all cursor-pointer"
            >
              <LogOutIcon size={13} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* AREA KANAN */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* HEADER ATAS */}
        <header className="h-16 min-h-[64px] bg-white border-b border-[#E6DFD5] px-6 flex items-center justify-between shrink-0 z-10 shadow-xs">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-[#1F1915] uppercase tracking-wider">
              {getPageTitle(location.pathname)}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/notifikasi')}
              className="relative p-2 text-[#6B6259] hover:text-[#1F1915] rounded-xl hover:bg-[#F4F1EA] transition-all cursor-pointer"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E54322]"></span>
            </button>

            <div className="h-5 w-[1px] bg-[#E6DFD5]"></div>

            <div className="text-xs text-right leading-tight">
              <p className="font-bold text-[#1F1915]">{user?.name || 'Annisa K.'}</p>
              <p className="text-[10px] text-[#8A8178] font-medium">Malang Outlet</p>
            </div>
          </div>
        </header>

        {/* AREA KONTEN UTAMA */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F4F1EA]">
          {children}
        </main>

      </div>
    </div>
  );
}

// Wrapper khusus modal logout agar bisa akses useNavigate()
function LogOutWrapper({ showLogoutModal, setShowLogoutModal }) {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/login');
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // STATE POPUP LOGOUT
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // STATE NAMA USER GLOBAL
  const [user, setUser] = useState({
    name: 'Annisa K.',
    email: 'annisa@redscan.pos',
    username: 'annisa_kasir'
  });

  return (
    <Router>
      {/* GOOGLE FONTS MODERN */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        * {
          font-family: 'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: -0.02em;
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
        {/* HALAMAN AUTHENTICATION (BEBAS LAYOUT DASHBOARD) */}
        <Route path="/" element={
          <div className="min-h-screen w-full bg-[#EFECE6] flex justify-center items-center p-4 antialiased">
            <Welcome />
          </div>
        } />
        
        <Route path="/login" element={
          <div className="min-h-screen w-full bg-[#EFECE6] flex justify-center items-center p-4 antialiased">
            <div className="bg-[#EAE6DE] w-full max-w-[440px] rounded-[32px] border border-[#D8D1C7] shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-7 sm:p-9 flex flex-col items-center">
              <Login
                shift={shift}
                setShift={setShift}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                setUser={setUser}
              />
            </div>
          </div>
        } />

        <Route path="/register" element={
          <div className="min-h-screen w-full bg-[#EFECE6] flex justify-center items-center p-4 antialiased">
            <div className="bg-[#EAE6DE] w-full max-w-[440px] rounded-[32px] border border-[#D8D1C7] shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-7 sm:p-9 flex flex-col items-center">
              <Register
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                setUser={setUser}
              />
            </div>
          </div>
        } />

        <Route path="/forgot-password" element={
          <div className="min-h-screen w-full bg-[#EFECE6] flex justify-center items-center p-4 antialiased">
            <div className="bg-[#EAE6DE] w-full max-w-[440px] rounded-[32px] border border-[#D8D1C7] shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-7 sm:p-9 flex flex-col items-center">
              <ForgotPassword />
            </div>
          </div>
        } />

        {/* HALAMAN DASHBOARD & KONTEN (DIBUNGKUS LAYOUT DASHBOARD) */}
        <Route path="/dashboard" element={
          <DashboardLayout user={user} shift={shift} setShowLogoutModal={setShowLogoutModal}>
            <Dashboard 
              user={user} 
              shift={shift} 
              setSelectedTransaction={setSelectedTransaction} 
              onOpenLogout={() => setShowLogoutModal(true)}
            />
          </DashboardLayout>
        } />

        <Route path="/history" element={
          <DashboardLayout user={user} shift={shift} setShowLogoutModal={setShowLogoutModal}>
            <HistoryPage 
              user={user} 
              shift={shift} 
              setSelectedTransaction={setSelectedTransaction} 
              onOpenLogout={() => setShowLogoutModal(true)}
            />
          </DashboardLayout>
        } />

        <Route path="/bukti-transaksi" element={
          <DashboardLayout user={user} shift={shift} setShowLogoutModal={setShowLogoutModal}>
            <BuktiTransaksi 
              selectedTransaction={selectedTransaction} 
              user={user} 
              onOpenLogout={() => setShowLogoutModal(true)}
            />
          </DashboardLayout>
        } />

        <Route path="/pemesanan" element={
          <DashboardLayout user={user} shift={shift} setShowLogoutModal={setShowLogoutModal}>
            <DataPemesanan user={user} shift={shift} onOpenLogout={() => setShowLogoutModal(true)} />
          </DashboardLayout>
        } />

        <Route path="/stok" element={
          <DashboardLayout user={user} shift={shift} setShowLogoutModal={setShowLogoutModal}>
            <Stok user={user} shift={shift} onOpenLogout={() => setShowLogoutModal(true)} />
          </DashboardLayout>
        } />

        <Route path="/laporan-omzet" element={
          <DashboardLayout user={user} shift={shift} setShowLogoutModal={setShowLogoutModal}>
            <LaporanOmzet user={user} shift={shift} onOpenLogout={() => setShowLogoutModal(true)} />
          </DashboardLayout>
        } />

        <Route path="/profile" element={
          <DashboardLayout user={user} shift={shift} setShowLogoutModal={setShowLogoutModal}>
            <ProfilePage user={user} setUser={setUser} shift={shift} onOpenLogout={() => setShowLogoutModal(true)} />
          </DashboardLayout>
        } />

        <Route path="/notifikasi" element={
          <DashboardLayout user={user} shift={shift} setShowLogoutModal={setShowLogoutModal}>
            <Notifikasi user={user} shift={shift} onOpenLogout={() => setShowLogoutModal(true)} />
          </DashboardLayout>
        } />

        {/* Fallback ke halaman utama jika memasukkan URL yang salah */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* POPUP LOGOUT GLOBAL */}
      <LogOutWrapper 
        showLogoutModal={showLogoutModal} 
        setShowLogoutModal={setShowLogoutModal} 
      />
    </Router>
  );
}