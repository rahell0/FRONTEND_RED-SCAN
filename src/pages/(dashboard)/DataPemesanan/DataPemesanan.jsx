import React, { useState, useMemo, useCallback } from 'react';
import { 
  Search,
  Pencil,
  MoreHorizontal,
  X,
  Check
} from 'lucide-react';

const FILTER_OPTIONS = ['Semua', 'Dine In', 'Take Away', 'Diproses', 'Selesai', 'Menunggu Pembayaran'];

const INITIAL_ORDERS = [
  {
    id: '2010001',
    customer: 'Dhea',
    time: '15.00',
    type: 'Dine In',
    items: [
      { name: 'Matcha Latte', qty: 1 },
      { name: 'Cheese Cake', qty: 2 }
    ],
    status: 'Selesai'
  },
  {
    id: '2010002',
    customer: 'Yolanda',
    time: '15.03',
    type: 'Take Away',
    items: [
      { name: 'Matcha Latte', qty: 1 }
    ],
    status: 'Diproses'
  },
  {
    id: '2010003',
    customer: 'Rahel',
    time: '15.10',
    type: 'Dine In',
    items: [
      { name: 'Matcha Latte', qty: 1 },
      { name: 'Cheese Cake', qty: 2 }
    ],
    status: 'Menunggu Pembayaran'
  },
  {
    id: '2010004',
    customer: 'Jesicca',
    time: '15.12',
    type: 'Take Away',
    items: [
      { name: 'Cheese Cake', qty: 2 }
    ],
    status: 'Selesai'
  },
  {
    id: '2010005',
    customer: 'Lestari',
    time: '15.20',
    type: 'Dine In',
    items: [
      { name: 'Cheese Cake', qty: 2 }
    ],
    status: 'Selesai'
  },
  {
    id: '2010006',
    customer: 'Angeliqia',
    time: '15.30',
    type: 'Dine In',
    items: [
      { name: 'Cheese Cake', qty: 2 }
    ],
    status: 'Diproses'
  },
  {
    id: '2010007',
    customer: 'Valentina',
    time: '16.00',
    type: 'Take Away',
    items: [
      { name: 'Matcha Latte', qty: 1 }
    ],
    status: 'Menunggu Pembayaran'
  },
  {
    id: '2010008',
    customer: 'Gratia',
    time: '16.45',
    type: 'Dine In',
    items: [
      { name: 'Matcha Latte', qty: 1 },
      { name: 'Cheese Cake', qty: 2 }
    ],
    status: 'Diproses'
  }
];

export default function DataPemesanan() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderData, setOrderData] = useState(INITIAL_ORDERS);

  // State Modal Edit / Detail Status Pesanan
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    customer: '',
    time: '',
    type: 'Dine In',
    status: 'Diproses'
  });

  // MEMOIZATION: Mencegah re-kalkulasi pencarian/filter di luar perubahan data & query
  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    return orderData.filter((item) => {
      const matchesFilter = activeFilter === 'Semua' 
        || item.status === activeFilter 
        || item.type === activeFilter;

      if (!matchesFilter) return false;

      if (!query) return true;

      return item.customer.toLowerCase().includes(query) ||
             item.id.toLowerCase().includes(query);
    });
  }, [orderData, activeFilter, searchQuery]);

  // Buka Modal Edit Status
  const handleOpenEdit = useCallback((order) => {
    setSelectedOrder(order);
    setFormData({ ...order });
    setIsModalOpen(true);
  }, []);

  // Simpan Perubahan Status
  const handleSave = (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setOrderData(prev => 
      prev.map(item => 
        item.id === selectedOrder.id 
          ? { ...item, status: formData.status, type: formData.type } 
          : item
      )
    );
    setIsModalOpen(false);
  };

  // Helper Badge Status Styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selesai':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Diproses':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Menunggu Pembayaran':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* INPUT PENCARIAN */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        <input
          type="text"
          placeholder="Cari Nama Pesanan atau ID Pesanan . . ."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-transparent bg-white text-xs text-[#1F1915] placeholder-gray-400 outline-none shadow-xs focus:border-gray-300 transition-all"
        />
      </div>

      {/* FILTER TAB BUTTONS */}
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setActiveFilter(opt)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              activeFilter === opt
                ? 'bg-[#708B96] text-white border-[#708B96] shadow-xs'
                : 'bg-white text-[#6B655F] border-transparent hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* TABEL DATA PESANAN */}
      <div className="bg-white rounded-2xl border border-[#E2DBD0] overflow-hidden flex flex-col justify-between shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#8B9EA8] text-[#1E293B]">
              <tr>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider w-28">ID PESANAN</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider">NAMA PELANGGAN</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider">JAM</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider">ITEM PESANAN</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider text-center">STATUS</th>
                <th className="py-2.5 px-4 text-[9px] font-extrabold tracking-wider text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-xs font-bold text-slate-800">{item.id}</td>
                    <td className="py-3 px-4 text-xs font-semibold text-slate-900">{item.customer}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{item.time}</td>
                    <td className="py-3 px-4 text-xs text-slate-600 leading-tight">
                      {item.items.map((it, idx) => (
                        <div key={idx}>
                          <span className="font-semibold text-slate-500">{it.qty}x</span> {it.name}
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(item.status)}`}>
                        • {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors cursor-pointer"
                          title="Edit Status Pesanan"
                        >
                          <Pencil size={14} />
                        </button>
                        <button className="p-1 hover:bg-slate-100 rounded text-slate-400 transition-colors cursor-pointer">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400 text-xs">
                    Tidak ada pesanan yang sesuai filter atau pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER TABEL */}
        <div className="py-2.5 px-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500">
            Menampilkan {filteredOrders.length} dari total {orderData.length} pesanan
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
            Scroll Ke Bawah Untuk Melihat Selengkapnya
          </span>
        </div>
      </div>

      {/* POP-UP MODAL EDIT STATUS PESANAN */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-[#1F1915]">
                  Edit Pesanan #{selectedOrder.id}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Pelanggan: {selectedOrder.customer}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-3 mt-4">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">Tipe Pesanan</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#231B17] bg-white font-medium"
                >
                  <option value="Dine In">Dine In (Makan di Tempat)</option>
                  <option value="Take Away">Take Away (Bawa Pulang)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">Status Pesanan</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#231B17] bg-white font-bold"
                >
                  <option value="Diproses" className="text-amber-600 font-bold">Diproses</option>
                  <option value="Selesai" className="text-emerald-600 font-bold">Selesai</option>
                  <option value="Menunggu Pembayaran" className="text-rose-600 font-bold">Menunggu Pembayaran</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end mt-4 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#231B17] text-white rounded-xl text-xs font-bold hover:bg-[#3B2E28] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}