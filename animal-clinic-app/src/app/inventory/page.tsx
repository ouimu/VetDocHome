'use client';

import TopBar from '@/components/TopBar';
import { inventory } from '@/lib/data';
import { Search, Plus, AlertTriangle, Package } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const stockStatus: Record<string, { badge: string; label: string }> = {
  ok:       { badge: 'badge-green',  label: 'In Stock' },
  low:      { badge: 'badge-yellow', label: 'Low Stock' },
  critical: { badge: 'badge-red',    label: 'Critical' },
};

const categories = ['All', 'Antibiotics', 'Vaccines', 'Steroids', 'Fluids', 'Anesthetics', 'NSAIDs', 'Supplies', 'Grooming'];

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = inventory.filter(i =>
    (cat === 'All' || i.category === cat) &&
    (i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const alerts = inventory.filter(i => i.status !== 'ok');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Inventory" subtitle="Stock management & tracking" />

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {/* Alert banner */}
        {alerts.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-yellow-100 bg-yellow-50">
            <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0" />
            <p className="text-sm text-yellow-700">
              <span className="font-semibold">{alerts.length} items</span> need restocking:&nbsp;
              {alerts.map(a => a.name).join(', ')}
            </p>
            <button className="ml-auto text-xs font-medium px-3 py-1 rounded-lg text-white" style={{ background: '#F59E0B' }}>
              Order Now
            </button>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Items', value: inventory.length, color: '#3DBCB8', bg: '#E8F7F7' },
            { label: 'In Stock',   value: inventory.filter(i => i.status === 'ok').length,       color: '#10B981', bg: '#ECFDF5' },
            { label: 'Low Stock',  value: inventory.filter(i => i.status === 'low').length,      color: '#F59E0B', bg: '#FFFBEB' },
            { label: 'Critical',   value: inventory.filter(i => i.status === 'critical').length, color: '#EF4444', bg: '#FEF2F2' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <Package size={18} style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or SKU..."
              className="pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-64"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={clsx('px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                  cat === c ? 'text-white border-transparent' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                )}
                style={cat === c ? { background: '#3DBCB8' } : {}}>
                {c}
              </button>
            ))}
          </div>
          <button className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white"
            style={{ background: '#3DBCB8' }}>
            <Plus size={15} /> Add Item
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['SKU', 'Product Name', 'Category', 'Stock', 'Min Stock', 'Unit Price', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(item => {
                const s = stockStatus[item.status];
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{item.sku}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-800">{item.name}</td>
                    <td className="px-5 py-3.5 text-gray-500">{item.category}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min(100, (item.stock / (item.minStock * 3)) * 100)}%`,
                              background: item.status === 'ok' ? '#10B981' : item.status === 'low' ? '#F59E0B' : '#EF4444'
                            }} />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{item.stock}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{item.minStock} {item.unit}</td>
                    <td className="px-5 py-3.5 text-gray-700 font-medium">฿{item.price}</td>
                    <td className="px-5 py-3.5">
                      <span className={clsx('badge text-xs', s.badge)}>{s.label}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="text-xs font-medium px-3 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
