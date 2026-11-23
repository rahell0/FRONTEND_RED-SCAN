
import { useState, useEffect } from 'react';

import {
  User,
  Mail,
  Lock,
  Edit2,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Save
} from 'lucide-react';

import API from '../../../services/api';

export default function ProfileInformation({ user, setUser }) {
  // DATA PROFIL
  const [name, setName] = useState(
    user?.name || user?.username || ''
  );

  const [email, setEmail] = useState(user?.email || '');

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileMessageType, setProfileMessageType] = useState('');

  // MODAL PASSWORD
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // SINKRONISASI DATA PROFIL
  useEffect(() => {
    setName(user?.name || user?.username || '');
    setEmail(user?.email || '');
  }, [user]);

  // ==========================================
  // SIMPAN PERUBAHAN PROFIL
  // ==========================================
  const handleSaveProfile = async (event) => {
    event.preventDefault();

    setProfileMessage('');
    setProfileMessageType('');

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      setProfileMessage('Nama dan email wajib diisi.');
      setProfileMessageType('error');
      return;
    }

    if (cleanName.length < 2 || cleanName.length > 100) {
      setProfileMessage('Nama harus terdiri dari 2 sampai 100 karakter.');
      setProfileMessageType('error');
      return;
    }

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailPattern.test(cleanEmail)) {
      setProfileMessage('Email harus menggunakan format @gmail.com.');
      setProfileMessageType('error');
      return;
    }

    setProfileLoading(true);

    try {
      const response = await API.put('/auth/profile', {
        name: cleanName,
        email: cleanEmail
      });

      if (!response.data.success) {
        setProfileMessage(
          response.data.message || 'Gagal memperbarui profil.'
        );
        setProfileMessageType('error');
        return;
      }

      const updatedUser = response.data.user;

      // Perbarui state user di seluruh website
      if (setUser) {
        setUser((previousUser) => ({
          ...previousUser,
          ...updatedUser
        }));
      }

      // Perbarui data user di localStorage
      localStorage.setItem(
      'redscan_user',
      JSON.stringify({
        ...user,
        ...updatedUser
      })
    );

      setName(updatedUser.name || '');
      setEmail(updatedUser.email || '');

      setProfileMessage('Profil berhasil diperbarui!');
      setProfileMessageType('success');

    } catch (error) {
      setProfileMessage(
        error.response?.data?.message ||
        'Gagal menghubungkan ke server backend.'
      );

      setProfileMessageType('error');
    } finally {
      setProfileLoading(false);
    }
  };

  // ==========================================
  // MODAL UBAH PASSWORD
  // ==========================================
  const openPasswordModal = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
    setMessageType('');

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    if (loading) return;

    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
    setMessageType('');
  };

  // ==========================================
  // PROSES UBAH PASSWORD
  // ==========================================
  const handleChangePassword = async (event) => {
    event.preventDefault();

    setMessage('');
    setMessageType('');

    if (newPassword !== confirmPassword) {
      setMessage('Konfirmasi kata sandi baru tidak cocok.');
      setMessageType('error');
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordPattern.test(newPassword)) {
      setMessage(
        'Kata sandi minimal 8 karakter dan harus memiliki huruf besar, huruf kecil, angka, serta simbol.'
      );
      setMessageType('error');
      return;
    }

    if (currentPassword === newPassword) {
      setMessage('Kata sandi baru harus berbeda dari kata sandi lama.');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/auth/change-password', {
        currentPassword,
        newPassword,
        confirmPassword
      });

      if (!response.data.success) {
        setMessage(
          response.data.message || 'Gagal mengubah kata sandi.'
        );
        setMessageType('error');
        return;
      }

      setMessage('Kata sandi berhasil diperbarui!');
      setMessageType('success');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setShowPasswordModal(false);
        setMessage('');
        setMessageType('');
      }, 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Gagal menghubungkan ke server backend.'
      );

      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">

      {/* NAMA LENGKAP */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[10px] font-extrabold text-[#1F1915] tracking-wider">
          NAMA LENGKAP
        </label>

        <div className="relative flex items-center w-full">
          <User
            size={16}
            className="text-[#8A8178] absolute left-3.5"
          />

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-[#FBF9F5] text-xs text-[#1F1915] outline-none focus:border-[#1E1715] transition-colors"
          />
        </div>
      </div>

      {/* ALAMAT EMAIL */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-extrabold text-[#1F1915] tracking-wider">
            ALAMAT EMAIL
          </label>

          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 size={13} />
            Email Terdaftar
          </span>
        </div>

        <div className="relative flex items-center w-full">
          <Mail
            size={16}
            className="text-[#8A8178] absolute left-3.5"
          />

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-[#FBF9F5] text-xs text-[#1F1915] outline-none focus:border-[#1E1715] transition-colors"
          />
        </div>
      </div>

      {/* PESAN PROFIL */}
      {profileMessage && (
        <div
          className={`p-3 rounded-xl text-xs font-medium ${
            profileMessageType === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {profileMessage}
        </div>
      )}

      {/* TOMBOL SIMPAN PROFIL */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSaveProfile}
          disabled={profileLoading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#210D04] text-white text-xs font-bold hover:bg-[#3B2415] disabled:bg-[#8C7B70] transition-colors"
        >
          <Save size={15} />
          {profileLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

      {/* KATA SANDI */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[10px] font-extrabold text-[#1F1915] tracking-wider">
          KATA SANDI
        </label>

        <div className="relative flex items-center w-full">
          <Lock
            size={16}
            className="text-[#8A8178] absolute left-3.5"
          />

          <input
            type="password"
            value="••••••••"
            readOnly
            autoComplete="off"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E6DFD5] bg-[#FBF9F5] text-xs text-[#1F1915] outline-none"
          />

          <button
            type="button"
            title="Ubah kata sandi"
            onClick={openPasswordModal}
            className="absolute right-3.5 bg-none border-none cursor-pointer text-[#8A8178] hover:text-[#1F1915]"
          >
            <Edit2 size={15} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mt-1">
          <span className="text-[10.5px] text-[#8A8178]">
            • Kata sandi harus minimal 8 karakter dengan kombinasi huruf,
            angka, dan simbol.
          </span>

          <button
            type="button"
            onClick={() => {
              alert('Fitur lupa kata sandi dapat diakses melalui halaman login.');
            }}
            className="text-xs font-bold text-[#8A8178] hover:underline"
          >
            Lupa Sandi
          </button>
        </div>
      </div>

      {/* MODAL UBAH KATA SANDI */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

            {/* HEADER MODAL */}
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-lg font-bold text-[#2C221E]">
                  Ubah Kata Sandi
                </h2>

                <p className="text-xs text-[#8A8178] mt-1">
                  Masukkan kata sandi lama dan kata sandi baru.
                </p>
              </div>

              <button
                type="button"
                onClick={closePasswordModal}
                disabled={loading}
                className="text-[#8A8178] hover:text-[#2C221E] disabled:opacity-50"
              >
                <X size={21} />
              </button>
            </div>

            {/* NOTIFIKASI */}
            {message && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs font-medium ${
                  messageType === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            <form
              onSubmit={handleChangePassword}
              className="space-y-4"
            >

              {/* KATA SANDI LAMA */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1.5">
                  Kata Sandi Lama
                </label>

                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    placeholder="Masukkan kata sandi lama"
                    required
                    autoComplete="current-password"
                    className="w-full border border-[#E6DFD5] rounded-xl px-3.5 py-3 pr-11 text-xs outline-none focus:border-[#2C221E]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8178]"
                  >
                    {showCurrentPassword
                      ? <EyeOff size={17} />
                      : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* KATA SANDI BARU */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1.5">
                  Kata Sandi Baru
                </label>

                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="Masukkan kata sandi baru"
                    required
                    autoComplete="new-password"
                    className="w-full border border-[#E6DFD5] rounded-xl px-3.5 py-3 pr-11 text-xs outline-none focus:border-[#2C221E]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8178]"
                  >
                    {showNewPassword
                      ? <EyeOff size={17} />
                      : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* KONFIRMASI KATA SANDI */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1.5">
                  Konfirmasi Kata Sandi Baru
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    required
                    autoComplete="new-password"
                    className="w-full border border-[#E6DFD5] rounded-xl px-3.5 py-3 pr-11 text-xs outline-none focus:border-[#2C221E]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8178]"
                  >
                    {showConfirmPassword
                      ? <EyeOff size={17} />
                      : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-[#8A8178] leading-relaxed">
                Kata sandi minimal 8 karakter dan harus memiliki huruf
                besar, huruf kecil, angka, serta simbol.
              </p>

              {/* TOMBOL */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closePasswordModal}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl border border-[#E6DFD5] text-xs font-bold text-[#5F5148] hover:bg-[#FBF9F5] disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-[#210D04] text-white text-xs font-bold hover:bg-[#3B2415] disabled:bg-[#8C7B70]"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
