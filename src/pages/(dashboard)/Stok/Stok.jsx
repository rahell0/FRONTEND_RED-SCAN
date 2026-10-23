import React, { useState } from 'react';
import { 
  Search,
  Plus,
  Pencil,
  MoreHorizontal,
  X,
  Check
} from 'lucide-react';

export default function Stok({ setPage }) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Data Stok Bahan Baku
  const [stockData, setStockData] = useState([
    // --- BAHAN MINUMAN ---
    { id: '2010001', name: 'Biji Kopi Espresso Blend', category: 'Biji-bijian', stock: 18, unit: 'kg', status: 'Cukup' },
    { id: '2010002', name: 'Air Mineral (Galon/Pouch)', category: 'Bahan Cair', stock: 25, unit: 'galon', status: 'Cukup' },
    { id: '2010003', name: 'Es Batu (Ice Cube)', category: 'Bahan Cair', stock: 50, unit: 'bag', status: 'Cukup' },
    { id: '2010004', name: 'Fresh Milk (Susu Segar)', category: 'Dairy & Lemak', stock: 8, unit: 'liter', status: 'Menipis' },
    { id: '2010005', name: 'Susu UHT', category: 'Dairy & Lemak', stock: 24, unit: 'liter', status: 'Cukup' },
    { id: '2010006', name: 'Bubuk Cokelat / Cocoa Powder', category: 'Bubuk & Rempah', stock: 15, unit: 'kg', status: 'Cukup' },
    { id: '2010007', name: 'Sirup Gula Aren Cair', category: 'Bahan Cair', stock: 12, unit: 'botol', status: 'Cukup' },
    { id: '2010008', name: 'Krimer Nabati / Evaporated Milk', category: 'Dairy & Lemak', stock: 10, unit: 'kaleng', status: 'Cukup' },
    { id: '2010009', name: 'Bubuk Matcha Premium', category: 'Bubuk & Rempah', stock: 3, unit: 'kg', status: 'Menipis' },
    { id: '2010010', name: 'Simpel Sirup / Sirup Gula', category: 'Bahan Cair', stock: 15, unit: 'botol', status: 'Cukup' },
    { id: '2010011', name: 'Teh Hitam / Teh Hijau Seduh', category: 'Bahan Kering/Beku', stock: 8, unit: 'pack', status: 'Cukup' },
    { id: '2010012', name: 'Sirup Peach', category: 'Bahan Cair', stock: 5, unit: 'botol', status: 'Cukup' },
    { id: '2010013', name: 'Buah Peach Potong', category: 'Bahan Kering/Beku', stock: 4, unit: 'kaleng', status: 'Menipis' },
    { id: '2010014', name: 'Daun Mint Segar', category: 'Bubuk & Rempah', stock: 2, unit: 'pack', status: 'Menipis' },

    // --- BAHAN MAKANAN ---
    { id: '2020001', name: 'Tepung Terigu Protein Tinggi', category: 'Bahan Kering/Beku', stock: 40, unit: 'kg', status: 'Cukup' },
    { id: '2020002', name: 'Butter Block Premium (Mentega)', category: 'Dairy & Lemak', stock: 4, unit: 'kg', status: 'Menipis' },
    { id: '2020003', name: 'Ragi Instan, Gula, Garam', category: 'Bubuk & Rempah', stock: 10, unit: 'pack', status: 'Cukup' },
    { id: '2020004', name: 'Telur Ayam Segar', category: 'Daging & Olahan', stock: 15, unit: 'kg', status: 'Cukup' },
    { id: '2020005', name: 'Bubuk Kayu Manis & Brown Sugar', category: 'Bubuk & Rempah', stock: 5, unit: 'pack', status: 'Cukup' },
    { id: '2020006', name: 'Cream Cheese Frosting', category: 'Dairy & Lemak', stock: 3, unit: 'jar', status: 'Menipis' },
    { id: '2020007', name: 'Kentang Goreng Beku (French Fries)', category: 'Bahan Kering/Beku', stock: 30, unit: 'kg', status: 'Cukup' },
    { id: '2020008', name: 'Minyak Truffle (Truffle Oil)', category: 'Bahan Cair', stock: 2, unit: 'botol', status: 'Menipis' },
    { id: '2020009', name: 'Keju Parmesan Parut', category: 'Dairy & Lemak', stock: 2, unit: 'kg', status: 'Menipis' },
    { id: '2020010', name: 'Daun Peterseli Cincang', category: 'Bubuk & Rempah', stock: 1, unit: 'pack', status: 'Menipis' },
    { id: '2020011', name: 'Kepakan Ayam Segar', category: 'Daging & Olahan', stock: 20, unit: 'kg', status: 'Cukup' },
    { id: '2020012', name: 'Bumbu Marinasi Ayam', category: 'Bubuk & Rempah', stock: 6, unit: 'pack', status: 'Cukup' },
    { id: '2020013', name: 'Saus BBQ / Honey Mustard / Buffalo', category: 'Bahan Cair', stock: 8, unit: 'botol', status: 'Cukup' },
    { id: '2020014', name: 'Minyak Goreng', category: 'Bahan Cair', stock: 25, unit: 'liter', status: 'Cukup' },
    { id: '2020015', name: 'Roti Tawar Panggang', category: 'Bahan Kering/Beku', stock: 12, unit: 'pack', status: 'Cukup' },
    { id: '2020016', name: 'Daging Ayam Fillet', category: 'Daging & Olahan', stock: 10, unit: 'kg', status: 'Cukup' },
    { id: '2020017', name: 'Smoked Beef', category: 'Daging & Olahan', stock: 12, unit: 'pack', status: 'Cukup' },
    { id: '2020018', name: 'Keju Lembaran (Cheese Slice)', category: 'Dairy & Lemak', stock: 8, unit: 'pack', status: 'Cukup' },
    { id: '2020019', name: 'Selada & Tomat Segar', category: 'Bahan Kering/Beku', stock: 5, unit: 'kg', status: 'Menipis' },
    { id: '2020020', name: 'Mayones & Saus Sambal', category: 'Bahan Cair', stock: 10, unit: 'pouch', status: 'Cukup' },
    { id: '2020021', name: 'Nasi Putih', category: 'Bahan Kering/Beku', stock: 25, unit: 'kg', status: 'Cukup' },
    { id: '2020022', name: 'Bumbu Nasi Goreng (Bawang & Cabai)', category: 'Bubuk & Rempah', stock: 7, unit: 'pack', status: 'Cukup' },
    { id: '2020023', name: 'Sosis & Bakso Sapi', category: 'Daging & Olahan', stock: 15, unit: 'pack', status: 'Cukup' },
    { id: '2020024', name: 'Kecap Manis, Asin & Minyak Wijen', category: 'Bahan Cair', stock: 9, unit: 'botol', status: 'Cukup' },
    { id: '2020025', name: 'Kerupuk & Acar Pelengkap', category: 'Bahan Kering/Beku', stock: 6, unit: 'pack', status: 'Cukup' },
  ]);

  const categories = [
    'Semua',
    'Biji-bijian',
    'Bahan Cair',
    'Bubuk & Rempah',
    'Dairy & Lemak',
    'Daging & Olahan',
    'Bahan Kering/Beku'
  ];

  // State Modal Pop-up Edit/Tambah
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Bahan Cair',
    stock: 0,
    unit: 'kg',
    status: 'Cukup'
  });

  // Buka Modal Edit
  const handleOpenEdit = (item) => {
    setEditItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  // Buka Modal Tambah
  const handleOpenAdd = () => {
    setEditItem(null);
    setFormData({
      id: `20200${stockData.length + 1}`,
      name: '',
      category: 'Bahan Cair',
      stock: 10,
      unit: 'kg',
      status: 'Cukup'
    });
    setIsModalOpen(true);
  };

  // Simpan Data (Tambah / Edit)
  const handleSave = (e) => {
    e.preventDefault();
    if (editItem) {
      setStockData(stockData.map(item => item.id === editItem.id ? formData : item));
    } else {
      setStockData([...stockData, formData]);
    }
    setIsModalOpen(false);
  };

  const filteredStock = stockData.filter((item) => {
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stockMenipisCount = stockData.filter(i => i.status === 'Menipis').length;

  return (
    <div className="w-full h-full flex flex-col gap-4 box-border min-w-0">
      
      {/* KARTU RINGKASAN STOK */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#EADED2] p-4 rounded-xl text-center">
          <div className="text-[9px] font-extrabold text-[#786C62] tracking-wider mb-0.5 uppercase">TOTAL BAHAN</div>
          <div className="text-xl font-extrabold text-[#1C1917]">
            {stockData.length} <span className="text-xs font-semibold text-[#786C62]">Jenis</span>
          </div>
        </div>

        <div className="bg-[#FFF8E7] p-4 rounded-xl text-center border border-[#FDE68A]">
          <div className="text-[9px] font-extrabold text-[#B45309] tracking-wider mb-0.5 uppercase">STOK MENIPIS</div>
          <div className="text-xl font-extrabold text-[#92400E]">
            {stockMenipisCount} <span className="text-xs font-semibold text-[#B45309]">Bahan</span>
          </div>
        </div>

        <div className="bg-[#EFFCF6] p-4 rounded-xl text-center border border-[#A7F3D0]">
          <div className="text-[9px] font-extrabold text-[#047857] tracking-wider mb-0.5 uppercase">PERMINTAAN RESTOCK</div>
          <div className="text-xl font-extrabold text-[#065F46]">
            2 <span className="text-xs font-semibold text-[#047857]">Pending</span>
          </div>
        </div>
      </div>

      {/* PENCARIAN & TOMBOL TAMBAH */}
      <div className="flex justify-between items-center gap-3">
        <div className="relative flex-1 max-w-sm flex items-center">
          <Search className="absolute left-3.5 text-gray-400 pointer-events-none" size={16} />
          <input
            type="text"
            placeholder="Cari bahan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-transparent bg-white text-xs text-[#1F1915] placeholder-gray-400 outline-none shadow-sm focus:border-gray-300 transition-all"
          />
        </div>

        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 bg-[#231B17] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#3B2E28] transition-colors cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>Tambah Bahan</span>
        </button>
      </div>

      {/* FILTER KATEGORI */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#231B17] text-white border-[#231B17]'
                : 'bg-white text-[#6B655F] border-transparent hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TABEL DATA STOK */}
      <div className="bg-white rounded-xl border border-[#E2DBD0] overflow-hidden flex-1 flex flex-col justify-between shadow-sm min-h-0">
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#8B9EA8] text-[#1E293B] z-10">
              <tr>
                <th className="py-2.5 px-3.5 text-[9px] font-extrabold tracking-wider w-24">KODE BAHAN</th>
                <th className="py-2.5 px-3.5 text-[9px] font-extrabold tracking-wider">NAMA BAHAN</th>
                <th className="py-2.5 px-3.5 text-[9px] font-extrabold tracking-wider">KATEGORI</th>
                <th className="py-2.5 px-3.5 text-[9px] font-extrabold tracking-wider text-center">SISA STOK</th>
                <th className="py-2.5 px-3.5 text-[9px] font-extrabold tracking-wider">SATUAN</th>
                <th className="py-2.5 px-3.5 text-[9px] font-extrabold tracking-wider">STATUS</th>
                <th className="py-2.5 px-3.5 text-[9px] font-extrabold tracking-wider text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStock.length > 0 ? (
                filteredStock.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3.5 text-xs font-semibold text-slate-500">{item.id}</td>
                    <td className="py-2.5 px-3.5 text-xs font-bold text-slate-900">{item.name}</td>
                    <td className="py-2.5 px-3.5 text-xs text-slate-500">{item.category}</td>
                    <td className={`py-2.5 px-3.5 text-xs font-extrabold text-center ${
                      item.status === 'Menipis' ? 'text-amber-600' : 'text-slate-800'
                    }`}>
                      {item.stock}
                    </td>
                    <td className="py-2.5 px-3.5 text-xs text-slate-500">{item.unit}</td>
                    <td className="py-2.5 px-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Menipis' 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        • {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-1 hover:bg-amber-50 rounded text-amber-600 transition-colors cursor-pointer"
                          title="Edit Bahan"
                        >
                          <Pencil size={14} />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors cursor-pointer">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-xs text-gray-400 font-semibold">
                    Tidak ada bahan baku yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER TABEL */}
        <div className="py-2.5 px-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500">
            Menampilkan <strong className="text-slate-700">{filteredStock.length}</strong> dari total <strong className="text-slate-700">{stockData.length}</strong> bahan baku
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            Scroll Ke Bawah Untuk Melihat Selengkapnya
          </span>
        </div>
      </div>

      {/* POP-UP MODAL FORM (EDIT & TAMBAH BAHAN) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-[#1F1915]">
                {editItem ? 'Edit Stok Bahan' : 'Tambah Bahan Baru'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-3 mt-4">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">Nama Bahan</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Contoh: Fresh Milk"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#231B17]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Kategori</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#231B17] bg-white"
                  >
                    {categories.filter(c => c !== 'Semua').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Satuan</label>
                  <input 
                    type="text" 
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    placeholder="kg / liter / pack"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#231B17]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Jumlah Stok</label>
                  <input 
                    type="number" 
                    required
                    value={formData.stock}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setFormData({
                        ...formData, 
                        stock: val,
                        status: val <= 5 ? 'Menipis' : 'Cukup'
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#231B17]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Status Stok</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#231B17] bg-white"
                  >
                    <option value="Cukup">Cukup</option>
                    <option value="Menipis">Menipis</option>
                  </select>
                </div>
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
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}