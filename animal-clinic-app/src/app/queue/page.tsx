'use client';

import TopBar from '@/components/TopBar';
import { queue } from '@/lib/data';
import { Clock, CheckCircle, PlayCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const statusConfig: Record<string, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  'in-progress': { label: 'In Progress', bg: '#E8F7F7', text: '#2A9A96', icon: PlayCircle },
  'waiting':     { label: 'Waiting',     bg: '#FFFBEB', text: '#D97706', icon: Clock },
  'scheduled':   { label: 'Scheduled',   bg: '#F5F5F7', text: '#6E6E73', icon: Clock },
};

export default function QueuePage() {
  const [items, setItems] = useState(queue);

  const advance = (id: number) => {
    setItems(prev => prev.map(q => {
      if (q.id !== id) return q;
      if (q.status === 'waiting') return { ...q, status: 'in-progress' };
      if (q.status === 'in-progress') return { ...q, status: 'done' };
      return q;
    }).filter(q => q.status !== 'done'));
  };

  const inProgress = items.filter(q => q.status === 'in-progress');
  const waiting    = items.filter(q => q.status === 'waiting');
  const scheduled  = items.filter(q => q.status === 'scheduled');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Queue Management" subtitle="Real-time service queue" />

      <div className="flex-1 overflow-y-auto p-6">

        {/* Summary bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'In Progress', count: inProgress.length, color: '#3DBCB8', bg: '#E8F7F7' },
            { label: 'Waiting',     count: waiting.length,    color: '#F59E0B', bg: '#FFFBEB' },
            { label: 'Scheduled',   count: scheduled.length,  color: '#6B7280', bg: '#F5F7FA' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                style={{ background: s.bg, color: s.color }}>
                {s.count}
              </div>
              <span className="text-sm font-medium text-gray-600">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Queue columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(['in-progress', 'waiting', 'scheduled'] as const).map(status => {
            const cfg = statusConfig[status];
            const Icon = cfg.icon;
            const col = items.filter(q => q.status === status);

            return (
              <div key={status} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
                  <Icon size={15} style={{ color: cfg.text }} />
                  <span className="text-sm font-semibold" style={{ color: cfg.text }}>{cfg.label}</span>
                  <span className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: cfg.bg, color: cfg.text }}>{col.length}</span>
                </div>

                <div className="divide-y divide-gray-50">
                  {col.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-8">No patients</p>
                  )}
                  {col.map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: cfg.text }}>
                          {q.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{q.pet}</p>
                          <p className="text-xs text-gray-400 truncate">{q.owner}</p>
                        </div>
                        <span className="text-xl">{q.avatar}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span className="px-2 py-1 bg-gray-50 rounded-lg">{q.type}</span>
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          <span>{q.waitTime}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 mb-3">{q.doctor}</p>

                      {status !== 'scheduled' && (
                        <button
                          onClick={() => advance(q.id)}
                          className="w-full py-1.5 rounded-lg text-xs font-medium transition-all text-white"
                          style={{ background: status === 'in-progress' ? '#10B981' : '#3DBCB8' }}
                        >
                          {status === 'in-progress' ? (
                            <span className="flex items-center justify-center gap-1"><CheckCircle size={12} /> Mark Done</span>
                          ) : (
                            <span className="flex items-center justify-center gap-1"><PlayCircle size={12} /> Call In</span>
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
