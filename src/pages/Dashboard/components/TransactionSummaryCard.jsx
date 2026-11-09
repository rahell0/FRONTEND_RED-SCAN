
import { Receipt } from 'lucide-react';

export default function TransactionSummaryCard({
  totalTransaksi = 0,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Total Transaksi
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {Number(totalTransaksi || 0).toLocaleString('id-ID')}
          </h2>
        </div>

        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <Receipt size={24} />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Transaksi yang tercatat
      </p>
    </div>
  );
}
