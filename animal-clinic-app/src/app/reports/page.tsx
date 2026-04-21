'use client';

import TopBar from '@/components/TopBar';
import { revenueData, appointmentTypeData, appointments } from '@/lib/data';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const PIE_COLORS = ['#3DBCB8', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6'];

export default function ReportsPage() {
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const confirmed = appointments.filter(a => a.status === 'confirmed').length;
  const cancelled = appointments.filter(a => a.status === 'cancelled').length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Reports & Analytics" subtitle="Clinical and financial performance" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Weekly Revenue',   value: `฿${totalRevenue.toLocaleString()}`, sub: 'This week' },
            { label: 'Total Appt.',      value: appointments.length, sub: 'This week' },
            { label: 'Confirmed',        value: confirmed, sub: `${Math.round(confirmed/appointments.length*100)}% rate` },
            { label: 'Cancellations',    value: cancelled,  sub: `${Math.round(cancelled/appointments.length*100)}% rate` },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 mb-2 font-medium">{k.label}</p>
              <p className="text-2xl font-bold text-gray-900">{k.value}</p>
              <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Revenue bar chart */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-800">Daily Revenue</h2>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">This week</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData} barCategoryGap="35%">
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  tickFormatter={(v) => `฿${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(v) => [`฿${Number(v ?? 0).toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }}
                  cursor={{ fill: '#F5F7FA' }}
                />
                <Bar dataKey="revenue" fill="#3DBCB8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Appointment type pie */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-800">Appointment Types</h2>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">This week</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={appointmentTypeData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                  dataKey="value" paddingAngle={3}>
                  {appointmentTypeData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${Number(v ?? 0)}%`, 'Share']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8}
                  formatter={(v) => <span style={{ fontSize: 12, color: '#6E6E73' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Services Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Top Services This Week</h2>
          <div className="space-y-3">
            {[
              { name: 'General Checkup',   count: 35, revenue: 17500, pct: 95 },
              { name: 'Vaccination',        count: 20, revenue: 5000,  pct: 54 },
              { name: 'Grooming',           count: 18, revenue: 6300,  pct: 49 },
              { name: 'Lab / X-ray',        count: 17, revenue: 12750, pct: 46 },
              { name: 'Surgery',            count: 10, revenue: 50000, pct: 27 },
            ].map(s => (
              <div key={s.name} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800">{s.name}</span>
                    <span className="text-xs text-gray-400">{s.count} visits · ฿{s.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: '#3DBCB8' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
