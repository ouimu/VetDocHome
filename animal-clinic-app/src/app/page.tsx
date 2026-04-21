'use client';

import TopBar from '@/components/TopBar';
import { stats, appointments, queue, revenueData } from '@/lib/data';
import { TrendingUp, TrendingDown, Minus, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import clsx from 'clsx';

const colorMap: Record<string, string> = {
  teal: '#3DBCB8', blue: '#3B82F6', yellow: '#F59E0B', green: '#10B981'
};
const bgMap: Record<string, string> = {
  teal: '#E8F7F7', blue: '#EFF6FF', yellow: '#FFFBEB', green: '#ECFDF5'
};

const statusStyle: Record<string, string> = {
  confirmed: 'badge-green',
  pending: 'badge-yellow',
  cancelled: 'badge-red',
};

const queueStyle: Record<string, { dot: string; label: string; badge: string }> = {
  'in-progress': { dot: '#3DBCB8', label: 'In Progress', badge: 'badge-teal' },
  'waiting': { dot: '#F59E0B', label: 'Waiting', badge: 'badge-yellow' },
  'scheduled': { dot: '#6B7280', label: 'Scheduled', badge: 'badge-gray' },
};

export default function DashboardPage() {
  const todayAppts = appointments.slice(0, 5);
  const activeQueue = queue.slice(0, 5);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Dashboard" subtitle="Welcome back, Dr. Araya 👋" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400 font-medium">{s.label}</span>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: bgMap[s.color] }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: colorMap[s.color] }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {s.trend === 'up' && <TrendingUp size={12} className="text-green-500" />}
                {s.trend === 'down' && <TrendingDown size={12} className="text-red-400" />}
                {s.trend === 'neutral' && <Minus size={12} className="text-gray-400" />}
                <span className={clsx("text-xs font-medium",
                  s.trend === 'up' ? 'text-green-500' :
                  s.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                )}>{s.change} from yesterday</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main content row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Today's Appointments */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-semibold text-gray-800">Today's Appointments</h2>
              <a href="/appointments" className="text-xs font-medium hover:underline" style={{ color: '#3DBCB8' }}>View all</a>
            </div>
            <div className="divide-y divide-gray-50">
              {todayAppts.map((a) => (
                <div key={a.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-all">
                  <span className="text-2xl">{a.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{a.pet} <span className="text-gray-400 font-normal">· {a.breed}</span></p>
                    <p className="text-xs text-gray-400">{a.owner} · {a.doctor}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-medium text-gray-700 mb-1">{a.time}</p>
                    <span className={clsx('badge text-xs', statusStyle[a.status] || 'badge-gray')}>
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Queue Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-semibold text-gray-800">Live Queue</h2>
              <a href="/queue" className="text-xs font-medium hover:underline" style={{ color: '#3DBCB8' }}>Manage</a>
            </div>
            <div className="divide-y divide-gray-50">
              {activeQueue.map((q) => {
                const s = queueStyle[q.status];
                return (
                  <div key={q.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-all">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: s.dot }}>
                      {q.number.slice(-3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{q.pet}</p>
                      <p className="text-xs text-gray-400 truncate">{q.type}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={10} />
                        <span>{q.waitTime}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Weekly Revenue</h2>
            <span className="text-xs text-gray-400">This week</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={revenueData} barCategoryGap="35%">
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `฿${(v/1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v) => [`฿${Number(v ?? 0).toLocaleString()}`, 'Revenue']}
                contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }}
                cursor={{ fill: '#F5F7FA' }}
              />
              <Bar dataKey="revenue" fill="#3DBCB8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
