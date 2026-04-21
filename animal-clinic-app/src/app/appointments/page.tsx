'use client';

import TopBar from '@/components/TopBar';
import { appointments, doctors } from '@/lib/data';
import { Plus, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const statusStyle: Record<string, { badge: string; dot: string }> = {
  confirmed: { badge: 'badge-green', dot: '#10B981' },
  pending:   { badge: 'badge-yellow', dot: '#F59E0B' },
  cancelled: { badge: 'badge-red', dot: '#EF4444' },
};

const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];

export default function AppointmentsPage() {
  const [view, setView] = useState<'list' | 'day'>('list');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Appointments" subtitle="Schedule & booking management" />

      <div className="flex-1 overflow-hidden flex flex-col">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-gray-400 hover:text-gray-700 transition-all">
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-gray-800">Monday, April 21, 2026</span>
            <button className="flex items-center gap-1 text-gray-400 hover:text-gray-700 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {(['list', 'day'] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={clsx('px-3 py-1 text-xs font-medium rounded-lg transition-all capitalize',
                    view === v ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'
                  )}>
                  {v === 'list' ? 'List' : 'Day View'}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white"
              style={{ background: '#3DBCB8' }}>
              <Plus size={15} /> New Appointment
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {view === 'list' ? (
            <div className="max-w-4xl mx-auto space-y-3">
              {/* Doctor filter chips */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs text-gray-400 font-medium">Doctor:</span>
                {['All', ...doctors.map(d => d.name.replace('Dr. ', ''))].map(d => (
                  <button key={d}
                    className={clsx('px-3 py-1 rounded-full text-xs font-medium border transition-all',
                      d === 'All' ? 'text-white border-transparent' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    )}
                    style={d === 'All' ? { background: '#3DBCB8' } : {}}>
                    {d}
                  </button>
                ))}
              </div>

              {appointments.map(a => {
                const s = statusStyle[a.status];
                return (
                  <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow transition-all cursor-pointer">
                    {/* Time */}
                    <div className="w-16 text-center flex-shrink-0">
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mb-0.5">
                        <Clock size={10} />
                      </div>
                      <p className="text-sm font-bold text-gray-800">{a.time}</p>
                    </div>

                    {/* Divider dot */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.dot }} />
                    </div>

                    {/* Pet */}
                    <span className="text-3xl flex-shrink-0">{a.avatar}</span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-gray-900">{a.pet}</p>
                        <span className="text-xs text-gray-400">{a.breed}</span>
                      </div>
                      <p className="text-xs text-gray-400">{a.owner}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-2 py-1 bg-gray-50 rounded-lg text-xs text-gray-600 font-medium">{a.type}</span>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-1 justify-end">
                        <User size={11} />
                        <span>{a.doctor}</span>
                      </div>
                      <span className={clsx('badge text-xs', s.badge)}>
                        {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Day View */
            <div className="flex gap-4 h-full">
              {doctors.map(doc => (
                <div key={doc.id} className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-4 py-3 border-b border-gray-50 text-center">
                    <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-400">{doc.specialty}</p>
                    <span className={clsx('badge text-xs mt-1', doc.status === 'on-duty' ? 'badge-green' : 'badge-gray')}>
                      {doc.status}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {hours.map(h => {
                      const appt = appointments.find(a => a.time === h && a.doctor === doc.name);
                      return (
                        <div key={h} className="flex border-b border-gray-50 min-h-12">
                          <div className="w-12 flex-shrink-0 text-xs text-gray-300 px-2 pt-2">{h}</div>
                          <div className="flex-1 p-1">
                            {appt && (
                              <div className="rounded-lg px-2 py-1.5 text-xs"
                                style={{ background: '#E8F7F7', borderLeft: '3px solid #3DBCB8' }}>
                                <p className="font-medium text-gray-800">{appt.pet}</p>
                                <p className="text-gray-400">{appt.type}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
