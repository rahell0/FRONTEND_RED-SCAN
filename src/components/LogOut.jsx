import React from 'react';
import { LogOut as LogOutIcon, X, RotateCcw } from 'lucide-react';

export default function LogOut({ isOpen, onClose, onConfirm, sessionId = '#8820-POS-01' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* CARD MODAL */}
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 flex flex-col items-center text-center relative animate-in fade-in zoom-in duration-200">
        
        {/* TOMBOL CLOSE (X) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* JUDUL MODAL */}
        <h2 className="text-lg font-black text-[#1F1915] mt-1 mb-5">
          Konfirmasi Log Out
        </h2>

        {/* IKON UTAMA */}
        <div className="w-20 h-20 bg-[#F7F3EC] rounded-2xl flex items-center justify-center mb-5 border border-[#EAE3D9]">
          <LogOutIcon size={36} className="text-[#3B2E28] translate-x-0.5" />
        </div>

        {/* PESAN KONFIRMASI */}
        <h3 className="text-sm font-bold text-[#1F1915] max-w-xs leading-snug mb-2">
          Apakah Anda yakin ingin keluar dari sistem POS REDScan?
        </h3>
        <p className="text-[11px] text-gray-400 max-w-xs leading-normal mb-6">
          Pastikan seluruh transaksi kasir yang sedang berjalan telah selesai atau disimpan sebelum keluar.
        </p>

        {/* TOMBOL AKSI */}
        <div className="w-full flex flex-col gap-2.5">
          {/* TOMBOL YA, LOG OUT */}
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-[#3B2E28] hover:bg-[#281F1B] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <LogOutIcon size={14} />
            <span>YA, LOG OUT</span>
          </button>

          {/* TOMBOL TIDAK, KEMBALI */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#241C18] hover:bg-[#1A1411] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <RotateCcw size={14} />
            <span>TIDAK, KEMBALI</span>
          </button>
        </div>

        {/* FOOTER SESI ID */}
        <div className="mt-5 pt-3 text-[10px] text-gray-400 flex items-center justify-center gap-1">
          <LogOutIcon size={11} className="text-gray-400 opacity-60" />
          <span>Sesi Kasir ID: <strong className="font-bold text-gray-500">{sessionId}</strong></span>
        </div>

      </div>
    </div>
  );
}