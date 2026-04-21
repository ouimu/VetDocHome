'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, ClipboardList, Calendar,
  Package, Receipt, BarChart2, Settings, PawPrint, LogOut,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/queue', label: 'Queue', icon: ClipboardList },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/billing', label: 'Billing', icon: Receipt },
  { href: '/reports', label: 'Reports', icon: BarChart2 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="flex flex-col h-screen bg-white border-r border-gray-100 transition-all duration-300 relative flex-shrink-0"
      style={{ width: collapsed ? '68px' : '220px' }}
    >
      {/* Logo */}
      <div className={clsx(
        "flex items-center gap-3 px-4 py-5 border-b border-gray-100",
        collapsed && "justify-center px-0"
      )}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#3DBCB8' }}>
          <PawPrint className="text-white" size={20} />
        </div>
        {!collapsed && (
          <div>
            <p className="font-700 text-sm text-gray-900 leading-tight font-semibold">VetCare</p>
            <p className="text-xs text-gray-400">Animal Hospital</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  title={collapsed ? label : undefined}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    active
                      ? "text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800",
                    collapsed && "justify-center"
                  )}
                  style={active ? { background: '#3DBCB8' } : {}}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 p-3">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0" style={{ background: '#3DBCB8' }}>
              AS
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">Dr. Araya</p>
              <p className="text-xs text-gray-400 truncate">Administrator</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
