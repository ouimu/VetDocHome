'use client';

import TopBar from '@/components/TopBar';
import { patients } from '@/lib/data';
import { Search, Plus, Filter, AlertTriangle, Phone } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const statusBadge: Record<string, string> = {
  active: 'badge-green',
  inpatient: 'badge-teal',
  inactive: 'badge-gray',
};

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(patients[0]);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.owner.toLowerCase().includes(search.toLowerCase()) ||
    p.hn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Patients" subtitle="Patient & owner management" />

      <div className="flex flex-1 overflow-hidden">

        {/* Patient List */}
        <div className="w-80 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
          <div className="p-4 space-y-3 border-b border-gray-50">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, HN, owner..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#3DBCB8' } as React.CSSProperties}
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:bg-gray-50">
                <Filter size={12} /> Filter
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white ml-auto"
                style={{ background: '#3DBCB8' }}>
                <Plus size={12} /> New Patient
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filtered.map(p => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-all",
                  selected.id === p.id && "bg-gray-50"
                )}
              >
                <span className="text-2xl">{p.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                    <span className={clsx('badge text-xs flex-shrink-0', statusBadge[p.status])}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{p.hn} · {p.breed}</p>
                  <p className="text-xs text-gray-400 truncate">{p.owner}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Patient Detail */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {selected ? (
            <div className="max-w-3xl mx-auto space-y-5">

              {/* Header Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{selected.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
                      <span className={clsx('badge', statusBadge[selected.status])}>{selected.status}</span>
                    </div>
                    <p className="text-sm text-gray-500">{selected.breed} · {selected.species} · {selected.age} · {selected.weight}</p>
                    <p className="text-xs text-gray-400 mt-0.5">HN: {selected.hn}</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: '#3DBCB8' }}>
                    New Visit
                  </button>
                </div>

                {selected.allergies.length > 0 && (
                  <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                    <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-red-600">Drug Allergies: </span>
                      <span className="text-xs text-red-500">{selected.allergies.join(', ')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Owner Info */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Owner Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Owner Name</p>
                    <p className="text-sm font-medium text-gray-800">{selected.owner}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone</p>
                    <div className="flex items-center gap-1.5">
                      <Phone size={12} className="text-gray-400" />
                      <p className="text-sm font-medium text-gray-800">{selected.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Last Visit</p>
                    <p className="text-sm font-medium text-gray-800">{selected.lastVisit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Membership</p>
                    <span className="badge badge-teal text-xs">Gold Member</span>
                  </div>
                </div>
              </div>

              {/* Treatment History */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Treatment History</h3>
                <div className="space-y-4">
                  {[
                    { date: '2026-04-15', type: 'Checkup', doctor: 'Dr. Araya', note: 'General health examination. All vitals normal. Weight 5.2kg.' },
                    { date: '2026-03-10', type: 'Vaccination', doctor: 'Dr. Thanat', note: 'Annual rabies booster administered. No adverse reaction.' },
                    { date: '2026-01-22', type: 'Dental Cleaning', doctor: 'Dr. Araya', note: 'Tartar removed from upper molars. Minor gum inflammation noted.' },
                  ].map((h, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0" style={{ background: '#3DBCB8' }} />
                        {i < 2 && <div className="w-px flex-1 mt-1" style={{ background: '#E5E7EB' }} />}
                      </div>
                      <div className="pb-4">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-gray-800">{h.type}</span>
                          <span className="badge badge-gray text-xs">{h.doctor}</span>
                          <span className="text-xs text-gray-400">{h.date}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{h.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vaccination Records */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Vaccination Records</h3>
                <div className="space-y-2">
                  {[
                    { vaccine: 'Rabies', given: '2026-03-10', nextDue: '2027-03-10', status: 'ok' },
                    { vaccine: 'DHPP', given: '2025-11-05', nextDue: '2026-11-05', status: 'ok' },
                    { vaccine: 'Bordetella', given: '2025-09-14', nextDue: '2026-09-14', status: 'ok' },
                  ].map((v, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{v.vaccine}</p>
                        <p className="text-xs text-gray-400">Given: {v.given}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Next due</p>
                        <p className="text-xs font-medium text-gray-700">{v.nextDue}</p>
                      </div>
                      <span className="badge badge-green text-xs">Up to date</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Select a patient to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
