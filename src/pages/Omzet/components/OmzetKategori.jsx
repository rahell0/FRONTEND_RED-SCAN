import React from 'react';

const omzetByCategory = [
  {
    category: 'Espresso Based',
    totalQty: 184,
    totalRevenue: 'Rp 2.450.000',
    share: '50.5%',
  },
  {
    category: 'Manual Brew',
    totalQty: 62,
    totalRevenue: 'Rp 990.000',
    share: '20.4%',
  },
  {
    category: 'Non-Coffee',
    totalQty: 85,
    totalRevenue: 'Rp 1.100.000',
    share: '22.7%',
  },
  {
    category: 'Snacks & Bakery',
    totalQty: 41,
    totalRevenue: 'Rp 310.000',
    share: '6.4%',
  },
];

export default function OmzetKategori() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#1F1915]">
            Omzet per Kategori
          </h3>

          <span className="text-[10px] bg-[#F4F1EA] text-[#7A7167] font-semibold px-2 py-1 rounded-md">
            4 Kategori
          </span>
        </div>

        <div className="space-y-4">
          {omzetByCategory.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#1F1915]">
                  {item.category}
                </span>

                <span className="font-bold text-[#E54322]">
                  {item.totalRevenue}
                </span>
              </div>

              <div className="w-full bg-[#F4F1EA] h-2 rounded-full overflow-hidden flex">
                <div
                  className="bg-[#1C1613] h-full rounded-full"
                  style={{ width: item.share }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-[#8C827A]">
                <span>{item.totalQty} porsi terjual</span>
                <span>{item.share} dari total</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-[#F4F1EA] rounded-xl border border-[#E6DFD5] text-center text-xs text-[#7A7167]">
        Kategori terlaris hari ini:{' '}
        <strong className="text-[#1F1915]">Espresso Based</strong>
      </div>
    </div>
  );
}