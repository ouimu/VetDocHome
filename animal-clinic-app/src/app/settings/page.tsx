'use client';

import TopBar from '@/components/TopBar';
import { doctors } from '@/lib/data';
import { Building2, Users, Clock, Shield, Bell, Globe } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const sections = [
  { id: 'hospital',      label: 'Hospital Info',     icon: Building2 },
  { id: 'doctors',       label: 'Doctors',           icon: Users },
  { id: 'hours',         label: 'Operating Hours',   icon: Clock },
  { id: 'access',        label: 'Access Control',    icon: Shield },
  { id: 'notifications', label: 'Notifications',     icon: Bell },
  { id: 'system',        label: 'System',            icon: Globe },
];

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-700">{label}</span>
      <button onClick={() => setOn(!on)}
        className={clsx('w-10 h-5 rounded-full transition-all flex items-center px-0.5 flex-shrink-0',
          on ? 'justify-end' : 'justify-start'
        )}
        style={{ background: on ? '#3DBCB8' : '#E5E7EB' }}>
        <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
      </button>
    </div>
  );
}

function Field({ label, value, type = 'text' }: { label: string; value: string; type?: string }) {
  return (
    <div>
      <label className="text-xs text-gray-400 font-medium block mb-1">{label}</label>
      <input defaultValue={value} type={type}
        className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2"
        style={{ '--tw-ring-color': '#3DBCB8' } as React.CSSProperties}
      />
    </div>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState('hospital');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Settings" subtitle="System configuration & administration" />

      <div className="flex flex-1 overflow-hidden">

        {/* Section Nav */}
        <nav className="w-52 flex-shrink-0 bg-white border-r border-gray-100 py-4">
          <ul className="space-y-0.5 px-2">
            {sections.map(s => (
              <li key={s.id}>
                <button onClick={() => setActive(s.id)}
                  className={clsx('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                    active === s.id ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
                  )}
                  style={active === s.id ? { background: '#3DBCB8' } : {}}>
                  <s.icon size={16} />
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-2xl mx-auto space-y-5">

            {active === 'hospital' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h2 className="text-sm font-semibold text-gray-800 mb-2">Hospital Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Clinic Name" value="VetCare Animal Hospital" />
                  <Field label="Branch" value="Main Branch" />
                  <Field label="Phone" value="02-XXX-XXXX" type="tel" />
                  <Field label="Email" value="info@vetcare.th" type="email" />
                </div>
                <Field label="Address" value="123 Sukhumvit Rd., Khlong Toei, Bangkok 10110" />
                <Field label="Line OA ID" value="@vetcare_clinic" />
                <button className="px-5 py-2 rounded-xl text-sm font-medium text-white mt-2" style={{ background: '#3DBCB8' }}>
                  Save Changes
                </button>
              </div>
            )}

            {active === 'doctors' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <h2 className="text-sm font-semibold text-gray-800">Doctors & Staff</h2>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: '#3DBCB8' }}>+ Add Doctor</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {doctors.map(d => (
                    <div key={d.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: '#3DBCB8' }}>
                          {d.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{d.name}</p>
                          <p className="text-xs text-gray-400">{d.specialty} · {d.schedule}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={clsx('badge text-xs', d.status === 'on-duty' ? 'badge-green' : 'badge-gray')}>
                          {d.status}
                        </span>
                        <button className="text-xs px-2 py-1 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === 'hours' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3">
                <h2 className="text-sm font-semibold text-gray-800 mb-2">Operating Hours</h2>
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
                  <div key={day} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700 w-28">{day}</span>
                    <div className="flex items-center gap-2">
                      <input defaultValue={day === 'Sunday' ? '' : '08:00'} type="time"
                        className="px-2 py-1 border border-gray-100 rounded-lg text-xs bg-gray-50 focus:outline-none" />
                      <span className="text-gray-400 text-xs">–</span>
                      <input defaultValue={day === 'Sunday' ? '' : '17:00'} type="time"
                        className="px-2 py-1 border border-gray-100 rounded-lg text-xs bg-gray-50 focus:outline-none" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={clsx('badge text-xs', day === 'Sunday' ? 'badge-gray' : 'badge-green')}>
                        {day === 'Sunday' ? 'Closed' : 'Open'}
                      </span>
                    </div>
                  </div>
                ))}
                <button className="px-5 py-2 rounded-xl text-sm font-medium text-white mt-2" style={{ background: '#3DBCB8' }}>
                  Save Hours
                </button>
              </div>
            )}

            {active === 'access' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-2">
                <h2 className="text-sm font-semibold text-gray-800 mb-3">Access Control (RBAC)</h2>
                {[
                  { role: 'Administrator', perms: 'Full access — all modules' },
                  { role: 'Veterinarian',  perms: 'Patients, EHR, Queue, Appointments' },
                  { role: 'Receptionist',  perms: 'Queue, Appointments, Billing' },
                  { role: 'Inventory Mgr', perms: 'Inventory, Reports (view only)' },
                ].map(r => (
                  <div key={r.role} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{r.role}</p>
                      <p className="text-xs text-gray-400">{r.perms}</p>
                    </div>
                    <button className="text-xs px-3 py-1 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">Configure</button>
                  </div>
                ))}
              </div>
            )}

            {active === 'notifications' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-800 mb-4">Notification Settings</h2>
                <Toggle label="Send appointment reminders via SMS" defaultOn={true} />
                <Toggle label="Send appointment reminders via LINE OA" defaultOn={true} />
                <Toggle label="Notify staff on new queue entry" defaultOn={true} />
                <Toggle label="Low stock alerts" defaultOn={true} />
                <Toggle label="Daily revenue summary email" defaultOn={false} />
                <Toggle label="User login activity alerts" defaultOn={false} />
              </div>
            )}

            {active === 'system' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-800 mb-4">System Settings</h2>
                <Toggle label="Enable multi-branch mode" defaultOn={true} />
                <Toggle label="Allow login time restrictions" defaultOn={false} />
                <Toggle label="Track user activity logs" defaultOn={true} />
                <Toggle label="Enable Loyalty Points system" defaultOn={true} />
                <Toggle label="Allow discount pre-sets" defaultOn={true} />
                <Toggle label="Enable Blood Bank module" defaultOn={false} />
                <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-sm font-medium text-red-700 mb-1">Danger Zone</p>
                  <p className="text-xs text-red-400 mb-3">These actions are irreversible. Proceed with caution.</p>
                  <button className="text-xs px-3 py-1.5 border border-red-300 text-red-500 rounded-lg hover:bg-red-100 transition-all">
                    Clear All Data (Test Mode)
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
