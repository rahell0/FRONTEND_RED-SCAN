
import {
  User,
  CheckCircle2,
  Camera,
  Coffee,
} from 'lucide-react';

export default function ProfileHeader({ user, shift }) {
  const userName =
    user?.name ||
    user?.username ||
    'Pengguna';

  const userRole =
    user?.role ||
    'Cashier';

  const shiftTime =
    typeof shift === 'string'
      ? shift
      : shift?.time || '08:00 - 16:00';

  return (
    <div className="bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden w-full shadow-xs">
      <div className="bg-[#1E1715] h-36 p-6 flex justify-between items-start relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#FFFFFF 1px, transparent 1px)',
            backgroundSize: '16px 16px',
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

              <button
                type="button"
                title="Ubah foto profil"
                className="absolute bottom-0.5 right-0.5 bg-[#1E1715] text-white border-2 border-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-[#322723] transition-colors"
              >
                <Camera size={13} />
              </button>
            </div>

            <div className="mb-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xl font-extrabold text-[#1F1915] m-0">
                  {userName}
                </h3>

                <CheckCircle2
                  size={18}
                  className="text-emerald-600"
                />
              </div>

              <p className="text-xs text-[#8A8178] mt-1 m-0">
                {userRole} • Shift ({shiftTime})
              </p>
            </div>
          </div>

          <div className="bg-[#F9F8F6] border border-[#E6DFD5] rounded-xl px-4 py-2 text-center self-start sm:self-auto">
            <div className="text-[9px] font-extrabold text-[#8A8178] tracking-wider">
              STATUS AKUN
            </div>

            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-extrabold text-emerald-600">
                Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
