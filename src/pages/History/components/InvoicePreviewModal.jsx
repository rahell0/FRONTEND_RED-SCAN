import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import logo from '../../../assets/logo.png';

export default function InvoicePreviewModal({
  selectedInvoice,
  isModalOpen,
  setIsModalOpen,
}) {
  if (!isModalOpen || !selectedInvoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Fitur unduh PDF belum diimplementasikan.
    // Nantinya bisa dihubungkan ke library pembuat PDF.
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-gray-100 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-5 w-auto object-contain" />
            <span className="font-extrabold text-sm text-[#1F1915]">
              REDScan POS
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-dashed border-gray-300 text-xs text-gray-700 flex flex-col gap-2">
          <div className="text-center pb-2 border-b border-gray-200">
            <p className="font-bold text-slate-800 m-0">
              {selectedInvoice.invoiceId}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5 m-0">
              {selectedInvoice.date} • {selectedInvoice.time}
            </p>
            <p className="text-[10px] text-gray-500 m-0">
              Kasir: {selectedInvoice.kasir}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 py-1">
            {selectedInvoice.details?.map((item, i) => (
              <div key={i} className="flex justify-between text-[11px]">
                <span>
                  {item.qty}x {item.name}
                </span>
                <span className="font-bold">
                  Rp {(item.qty * item.price).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-200 flex flex-col gap-1">
            <div className="flex justify-between text-[11px]">
              <span>Metode Bayar</span>
              <span className="font-bold">{selectedInvoice.method}</span>
            </div>

            <div className="flex justify-between text-xs font-black text-slate-900 pt-1 border-t border-gray-300">
              <span>TOTAL</span>
              <span>{selectedInvoice.totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handlePrint}
            className="py-2 px-3 bg-[#231B17] text-white rounded-xl text-xs font-bold hover:bg-[#3B2E28] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Printer size={14} />
            <span>Cetak Struk</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="py-2 px-3 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Download size={14} />
            <span>Unduh PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}