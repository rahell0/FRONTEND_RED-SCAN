
import { Wallet } from 'lucide-react';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function RevenueCard({
  totalOmzet = 0,
  qrisOmzet = 0,
  tunaiOmzet = 0,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Omzet</p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {formatRupiah(totalOmzet)}
          </h2>
        </div>

        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
          <Wallet size={24} />
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-500">QRIS</span>
          <span className="font-medium text-gray-700">
            {formatRupiah(qrisOmzet)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-500">Tunai</span>
          <span className="font-medium text-gray-700">
            {formatRupiah(tunaiOmzet)}
          </span>
        </div>
      </div>
    </div>
  );
}
