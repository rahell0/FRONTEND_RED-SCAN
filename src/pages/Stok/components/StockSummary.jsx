
export default function StockSummary({
  totalBahan,
  stokMenipis,
  stokHabis,
}) {
  const summaries = [
    {
      title: 'TOTAL BAHAN',
      value: totalBahan,
      description: 'Total bahan terdaftar',
      color: 'text-blue-600',
    },
    {
      title: 'STOK MENIPIS',
      value: stokMenipis,
      description: 'Bahan perlu diperhatikan',
      color: 'text-orange-600',
    },
    {
      title: 'STOK HABIS',
      value: stokHabis,
      description: 'Bahan dengan stok nol',
      color: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {summaries.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500">
            {item.title}
          </p>

          <p className={`mt-3 text-3xl font-bold ${item.color}`}>
            {item.value}
          </p>

          <p className="mt-2 text-sm text-gray-400">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
