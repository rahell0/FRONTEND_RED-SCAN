
import { useState, useEffect } from 'react';
import { User, Mail, Lock, Edit2, CheckCircle2 } from 'lucide-react';

export default function ProfileInformation({ user, setUser }) {
  const [name, setName] = useState(
    user?.name || user?.username || ''
  );

  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    setName(user?.name || user?.username || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);

    if (setUser) {
      setUser((previousUser) => ({
        ...previousUser,
        name: newName,
      }));
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (setUser) {
      setUser((previousUser) => ({
        ...previousUser,
        email: newEmail,
      }));
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[10px] font-extrabold text-[#1F1915] tracking-wider">
          NAMA LENGKAP
        </label>

        <div className="relative flex items-center w-full">
          <User size={16} className="text-[#8A8178] absolute left-3.5" />

          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-[#FBF9F5] text-xs text-[#1F1915] outline-none focus:border-[#1E1715] transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-extrabold text-[#1F1915] tracking-wider">
            ALAMAT EMAIL
          </label>

          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 size={13} />
            Email Terverifikasi
          </span>
        </div>

        <div className="relative flex items-center w-full">
          <Mail size={16} className="text-[#8A8178] absolute left-3.5" />

          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-[#FBF9F5] text-xs text-[#1F1915] outline-none focus:border-[#1E1715] transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[10px] font-extrabold text-[#1F1915] tracking-wider">
          KATA SANDI
        </label>

        <div className="relative flex items-center w-full">
          <Lock size={16} className="text-[#8A8178] absolute left-3.5" />

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
            onClick={() => {
              alert('Fitur ubah kata sandi belum dihubungkan ke backend.');
            }}
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
    </div>
  );
}
