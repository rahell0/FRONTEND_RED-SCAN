import React, { useState } from 'react';
import API from '../../../services/api';

function Login({ shift, setShift, showPassword, setShowPassword, setPage, setUser }) {
  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post('/auth/login', {
        username: userInput,
        password: passwordInput,
      });

      alert(response.data.message || 'Login berhasil!');

      if (setUser) {
        setUser(response.data.user);
      }

      setPage('dashboard');
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Login gagal. Silakan periksa kembali akun Anda.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-center mb-4">Login REDScan</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="text-xs font-semibold">Username / Email</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg text-sm mt-1"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Masukkan username atau email"
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full p-2 border rounded-lg text-sm mt-1"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Masukkan password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E54322] text-white py-2 rounded-xl text-sm font-bold mt-2 hover:bg-[#c8371a] transition-all"
        >
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      <div className="text-center mt-4 text-xs">
        <button 
          onClick={() => setPage('forgot')} 
          className="text-gray-600 hover:underline"
        >
          Lupa Password?
        </button>
      </div>
    </div>
  );
}

export default Login;