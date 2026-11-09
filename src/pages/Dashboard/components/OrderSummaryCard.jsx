
import { ShoppingBag } from 'lucide-react';

export default function OrderSummaryCard({
  pesananDiproses = 0,
  onClick,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between shadow-xs min-w-0">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">
            Pesanan Diproses
          </p>

          <h2 className="text-3xl font-bold text-[#402719] mt-2">
            {Number(pesananDiproses || 0).toLocaleString('id-ID')}
          </h2>
        </div>

        <div className="bg-[#E9E1CF] p-3 rounded-2xl">
          <ShoppingBag size={22} className="text-[#402719]" />
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="text-sm font-semibold text-[#708B96] text-left mt-5"
      >
        Lihat pemesanan →
      </button>
    </div>
  );
}
