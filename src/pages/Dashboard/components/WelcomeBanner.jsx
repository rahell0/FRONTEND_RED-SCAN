
import { Sparkles } from 'lucide-react';

export default function WelcomeBanner({ user, shift }) {
  return (
    <div className="bg-[#EBE2D7] rounded-3xl p-6 sm:p-8 flex items-center justify-between border border-[#E0D5C7] shadow-sm">
      <div className="flex flex-col gap-2.5">
        <div className="inline-flex items-center gap-1.5 text-[#8B6B58] text-[11px] font-bold uppercase tracking-wider bg-[#DFD4C5] px-3.5 py-1.5 rounded-full w-fit">
          <Sparkles size={14} />
          <span>SESI KASIR AKTIF</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight m-0">
          Halo {user?.name || 'Kasir'}, Selamat Bekerja !
        </h2>

        <div className="bg-[#D4C7B7] text-[#5C4A3E] text-xs font-bold px-3.5 py-1.5 rounded-xl w-fit">
          Shift: {shift || '16:00 - 00:00'}
        </div>
      </div>

      <div className="hidden sm:flex w-22 h-22 bg-[#DFD4C5]/70 rounded-full items-center justify-center border-4 border-[#E5DACD] shrink-0">
        <div className="w-13 h-13 bg-[#D4C6B6] rounded-full flex items-center justify-center rotate-12 text-2xl">
          ☕
        </div>
      </div>
    </div>
  );
}
