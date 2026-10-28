import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { Eye, EyeOff, Lock, User, Clock, ShieldCheck } from 'lucide-react';
import API from '../../../services/api'; // pastikan path api.jsx sesuai

export default function Login({ shift, setShift, showPassword, setShowPassword, setUser }) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // 1. Kirim request ke Endpoint Auth Backend MySQL
      const response = await API.post('/auth/login', {
        email: userInput,
        password: password
      });

      if (response.data.success) {
        const userData = response.data.user;

        // 2. Simpan user ke state App.jsx jika ada
        if (setUser) {
          setUser((prev) => ({
            ...prev,
            id: userData.id,
            name: userData.nama || userInput,
            username: userInput,
            role: userData.role
          }));
        }

        // 3. Simpan session user ke localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // 4. Pindah ke Halaman Dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      // Tangkap pesan error dari Backend
      const msg = error.response?.data?.message || 'Gagal terhubung ke server backend!';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* LOGO & BRANDING */}
      <div className="flex flex-col items-center mb-5">
        <img 
          src={logo} 
          alt="REDScan Logo" 
          className="w-12 h-12 object-contain mb-1.5" 
        />
        <h1 className="text-lg font-bold text-[#E54322] tracking-tight">REDScan</h1>
        <p className="text-[10px] font-semibold text-[#A89C90] tracking-wider uppercase">POS ENTERPRISE CLOUD</p>
      </div>

      {/* ALERT ERROR NOTIFICATION */}
      {errorMessage && (
        <div className="w-full p-2.5 mb-3.5 bg-red-100 border border-red-400 text-red-700 text-xs rounded-xl font-medium text-center">
          {errorMessage}
        </div>
      )}

      {/* FORM LOGIN */}
      <form onSubmit={handleSubmit} className="w-full space-y-3.5 text-left">
        <div>
          <label className="text-xs font-bold text-[#2C221E] block mb-1">Username/Email</label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
              <User size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Masukkan Username/Email Anda" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              required
              className="w-full h-11 pl-11 pr-4 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#2C221E] block mb-1">Kata Sandi</label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
              <Lock size={18} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-11 pl-11 pr-11 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] placeholder-[#B5A99B] focus:outline-none focus:border-[#210D04] transition-colors"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 flex items-center justify-center text-[#A39788] hover:text-[#2C221E] cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex justify-end mt-1.5">
            <button 
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-[11px] font-semibold text-[#2C221E] hover:underline cursor-pointer"
            >
              Lupa Kata Sandi?
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#2C221E] block mb-1">Shift</label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#A39788]">
              <Clock size={18} />
            </div>
            <select 
              value={shift} 
              onChange={(e) => setShift(e.target.value)}
              className="w-full h-11 pl-11 pr-8 bg-white border border-[#D8D1C7] rounded-xl text-xs text-[#2C221E] focus:outline-none focus:border-[#210D04] appearance-none cursor-pointer transition-colors"
            >
              <option value="08:00 - 16:00">Shift: 08:00 - 16:00</option>
              <option value="16:00 - 00:00">Shift: 16:00 - 00:00</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#210D04] hover:bg-[#3B2415] active:bg-[#120702] disabled:bg-[#8C7B70] text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center"
        >
          {loading ? 'Memproses Login...' : 'Login'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => navigate('/register')}
          className="text-xs text-[#6B5E52] cursor-pointer"
        >
          Belum punya akun? <span className="font-bold text-[#2C221E]">Daftar →</span>
        </button>
      </div>

      {/* FOOTER */}
      <div className="mt-8 pt-3 flex flex-col items-center justify-center gap-1 text-[9px] text-[#A39788]">
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