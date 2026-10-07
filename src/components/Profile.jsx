import React from 'react';
import { 
  User, 
  CheckCircle2, 
  Camera, 
  Mail, 
  Lock, 
  Edit2, 
  Save, 
  Coffee, 
  LogOut 
} from 'lucide-react';

export default function Profile({ shift, setPage }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* CARD BANNER PROFIL */}
      <div className="bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden w-full shadow-xs">
        <div className="bg-[#1E1715] h-36 p-6 flex justify-between items-start relative overflow-hidden">
          {/* Pattern Accent Background */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', 
              backgroundSize: '16px 16px' 
            }} 
          />

          <div className="relative z-10">
            <span className="text-[11px] text-[#DFD4C5] bg-[#DFD4C5]/15 px-3 py-1 rounded-full border border-[#DFD4C5]/20 font-semibold">
              Akun Terverifikasi
            </span>
          </div>

          <div className="relative z-10 w-20 h-20 bg-[#DFD4C5]/70 rounded-full flex items-center justify-center border-4 border-[#E5DACD] shrink-0">
            <div className="w-12 h-12 bg-[#D4C6B6] rounded-full flex items-center justify-center rotate-12">
              <Coffee size={22} className="text-[#1E1715]" />
            </div>
          </div>
        </div>

        <div className="px-7 pb-6 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-12 gap-4">
            <div className="flex items-end gap-4">
              <div className="relative z-20">
                <div className="w-24 h-24 rounded-full bg-[#D9D2C9] border-4 border-white flex items-center justify-center shadow-md">
                  <User size={52} className="text-[#8A8178]" />
                </div>
                <button className="absolute bottom-0.5 right-0.5 bg-[#1E1715] text-white border-2 border-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-[#322723] transition-colors">
                  <Camera size={13} />
                </button>
              </div>

              <div className="mb-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xl font-extrabold text-[#1F1915] m-0">Annisa K.</h3>
                  <CheckCircle2 size={18} className="text-emerald-600" />
                </div>
                <p className="text-xs text-[#8A8178] mt-1 m-0">
                  Head Cashier • Shift Pagi ({shift?.time || '08:00 - 16:00'})
                </p>
              </div>
            </div>

            <div className="bg-[#F9F8F6] border border-[#E6DFD5] rounded-xl px-4 py-2 text-center self-start sm:self-auto">
              <div className="text-[9px] font-extrabold text-[#8A8178] tracking-wider">STATUS AKUN</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-extrabold text-emerald-600">Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FORM INFORMASI PRIBADI */}
      <div className="bg-white rounded-2xl p-7 border border-[#E6DFD5] flex flex-col gap-5 w-full shadow-xs">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-base font-extrabold text-[#1F1915] m-0">Informasi Pribadi</h4>
            <p className="text-xs text-[#8A8178] mt-1 m-0">Perbarui data profil, nama lengkap, dan kredensial akun Anda.</p>
          </div>
          <span className="text-[11px] font-bold text-[#6B655F] bg-[#F5F2EB] px-2.5 py-1 rounded-md border border-[#E6DFD5]">
            ID: RDS-9942
          </span>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {/* Input Nama Lengkap */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[10px] font-extrabold text-[#1F1915] tracking-wider">NAMA LENGKAP</label>
            <div className="relative flex items-center w-full">
              <User size={16} className="text-[#8A8178] absolute left-3.5" />
              <input 
                type="text" 
                defaultValue="Annisa K." 
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-[#FBF9F5] text-xs text-[#1F1915] outline-none focus:border-[#1E1715] transition-colors"
              />
            </div>
          </div>

          {/* Input Alamat Email */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-extrabold text-[#1F1915] tracking-wider">ALAMAT EMAIL</label>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={13} /> Email Terverifikasi
              </span>
            </div>
            <div className="relative flex items-center w-full">
              <Mail size={16} className="text-[#8A8178] absolute left-3.5" />
              <input 
                type="email" 
                defaultValue="annisa.redscan@outlet.id" 
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-[#FBF9F5] text-xs text-[#1F1915] outline-none focus:border-[#1E1715] transition-colors"
              />
            </div>
          </div>

          {/* Input Kata Sandi */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[10px] font-extrabold text-[#1F1915] tracking-wider">KATA SANDI</label>
            <div className="relative flex items-center w-full">
              <Lock size={16} className="text-[#8A8178] absolute left-3.5" />
              <input 
                type="password" 
                defaultValue="123456781234" 
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E6DFD5] bg-[#FBF9F5] text-xs text-[#1F1915] outline-none focus:border-[#1E1715] transition-colors"
              />
              <button className="absolute right-3.5 bg-none border-none cursor-pointer text-[#8A8178] hover:text-[#1F1915]">
                <Edit2 size={15} />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mt-1">
              <span className="text-[10.5px] text-[#8A8178]">• Kata sandi harus minimal 8 karakter dengan kombinasi huruf, angka, dan simbol.</span>
              <span className="text-xs font-bold text-[#8A8178] hover:underline cursor-pointer">Lupa Sandi</span>
            </div>
          </div>
        </div>

        {/* Tombol Aksi Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-[#F3EFEA] mt-2 w-full">
          <button 
            onClick={() => setPage && setPage('welcome')}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-xl text-xs font-bold text-[#1F1915] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Tutup Shift / Keluar</span>
          </button>

          <div className="flex gap-3 items-center w-full sm:w-auto justify-end">
            <button className="px-4 py-2.5 bg-transparent border-none text-xs font-bold text-[#8A8178] hover:text-[#1F1915] transition-colors cursor-pointer">
              Batal
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E1715] text-white border-none rounded-xl text-xs font-bold hover:bg-[#322723] transition-colors cursor-pointer">
              <Save size={16} />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}