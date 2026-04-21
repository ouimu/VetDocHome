'use client';

import { Bell, Search } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 gap-4">
      {/* Title */}
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-gray-900 truncate">{title}</h1>
        {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle || dateStr}</p>}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients, records..."
            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 w-64"
            style={{ '--tw-ring-color': '#3DBCB8' } as React.CSSProperties}
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-all">
          <Bell size={17} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#3DBCB8' }} />
        </button>

        {/* Date */}
        <span className="text-xs text-gray-400 hidden lg:block whitespace-nowrap">{dateStr}</span>
      </div>
    </header>
  );
}
