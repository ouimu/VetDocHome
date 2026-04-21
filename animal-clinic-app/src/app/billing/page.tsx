'use client';

import TopBar from '@/components/TopBar';
import { billingRecords } from '@/lib/data';
import { Receipt, Plus, CreditCard, Banknote, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

const statusStyle: Record<string, string> = {
  paid:    'badge-green',
  pending: 'badge-yellow',
  overdue: 'badge-red',
};

const payIcon: Record<string, React.ElementType> = {
  'Cash': Banknote,
  'Credit Card': CreditCard,
  'Transfer': ArrowUpRight,
  '-': Receipt,
};

export default function BillingPage() {
  const totalPaid    = billingRecords.filter(b => b.status === 'paid').reduce((s, b) => s + b.total, 0);
  const totalPending = billingRecords.filter(b => b.status === 'pending').reduce((s, b) => s + b.total, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Billing & Payments" subtitle="Invoice and payment management" />

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Collected',  value: `฿${totalPaid.toLocaleString()}`,    color: '#10B981', bg: '#ECFDF5', icon: Banknote },
            { label: 'Pending Payment',  value: `฿${totalPending.toLocaleString()}`, color: '#F59E0B', bg: '#FFFBEB', icon: Receipt },
            { label: 'Invoices Today',   value: billingRecords.length,               color: '#3DBCB8', bg: '#E8F7F7', icon: CreditCard },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Recent Invoices</h2>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white"
            style={{ background: '#3DBCB8' }}>
            <Plus size={15} /> New Invoice
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Invoice No.', 'Patient', 'Owner', 'Services', 'Payment', 'Total', 'Status', 'Date', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {billingRecords.map(b => {
                const PayIcon = payIcon[b.payMethod] ?? Receipt;
                return (
                  <tr key={b.id} className="hover:bg-gray-50 transition-all cursor-pointer">
                    <td className="px-5 py-4 font-mono text-xs text-gray-500">{b.invoiceNo}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">{b.pet}</td>
                    <td className="px-5 py-4 text-gray-500">{b.owner}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {b.services.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <PayIcon size={13} />
                        <span className="text-xs">{b.payMethod}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-bold text-gray-900">฿{b.total.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={clsx('badge text-xs', statusStyle[b.status])}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-400">{b.date}</td>
                    <td className="px-5 py-4">
                      <button className="text-xs font-medium px-3 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* POS Quick Add */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick POS — Add Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'General Checkup', price: 500 },
              { label: 'Vaccination', price: 250 },
              { label: 'Grooming (Small)', price: 350 },
              { label: 'X-ray', price: 1200 },
              { label: 'Lab Blood Test', price: 650 },
              { label: 'Dental Cleaning', price: 1800 },
              { label: 'Hospitalization/day', price: 800 },
              { label: 'Surgery (Minor)', price: 5000 },
            ].map(s => (
              <button key={s.label}
                className="flex flex-col items-start p-3 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all text-left group">
                <span className="text-xs font-medium text-gray-700 group-hover:text-teal-700 leading-snug">{s.label}</span>
                <span className="text-sm font-bold mt-1 group-hover:text-teal-600" style={{ color: '#3DBCB8' }}>฿{s.price}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
