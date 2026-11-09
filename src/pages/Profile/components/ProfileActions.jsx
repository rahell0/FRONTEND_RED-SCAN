
import { LogOut, Save } from 'lucide-react';

export default function ProfileActions({ setPage }) {
  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-base font-extrabold text-[#1F1915] m-0">
            Informasi Pribadi
          </h4>
          <p className="text-xs text-[#8A8178] mt-1 m-0">
            Perbarui data profil, nama lengkap, dan kredensial akun Anda.
          </p>
        </div>

        <span className="text-[11px] font-bold text-[#6B655F] bg-[#F5F2EB] px-2.5 py-1 rounded-md border border-[#E6DFD5]">
          ID: RDS-9942
        </span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-[#F3EFEA] mt-2 w-full">
        <button
          type="button"
          onClick={() => setPage?.('welcome')}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-xl text-xs font-bold text-[#1F1915] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          <span>Tutup Shift / Keluar</span>
        </button>

        <div className="flex gap-3 items-center w-full sm:w-auto justify-end">
          <button
            type="button"
            className="px-4 py-2.5 bg-transparent border-none text-xs font-bold text-[#8A8178] hover:text-[#1F1915] transition-colors cursor-pointer"
          >
            Batal
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E1715] text-white border-none rounded-xl text-xs font-bold hover:bg-[#322723] transition-colors cursor-pointer"
          >
            <Save size={16} />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>
    </>
  );
}
