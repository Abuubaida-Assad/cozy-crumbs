import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Key, Database, Globe, Bell, CheckCircle } from 'lucide-react';

export const AdminSettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Bakery Portal Settings
        </h1>
        <p className="text-xs text-slate-500">
          Administrator profile, API endpoints, and bakery store preferences.
        </p>
      </div>

      {/* Admin Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-slate-900">Admin Account Info</h2>
            <p className="text-xs text-slate-500">Currently authenticated administrator session</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-semibold uppercase block mb-1">Name</span>
            <p className="font-bold text-slate-800">{user?.name || 'Cozy Crumbs Admin'}</p>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase block mb-1">Email Address</span>
            <p className="font-bold text-slate-800">{user?.email || 'admin@cozycrumbs.com'}</p>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase block mb-1">Role Permissions</span>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent text-white font-bold text-[10px] uppercase">
              Full Administrator
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase block mb-1">Authentication Method</span>
            <p className="text-slate-700 font-mono">Bcrypt + Signed JWT (7 Days)</p>
          </div>
        </div>
      </div>

      {/* System Infrastructure Details */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-slate-900">Database & API Configuration</h2>
            <p className="text-xs text-slate-500">Backend connectivity status</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">REST API Base Endpoint</span>
              <span className="text-slate-500 font-mono text-[11px]">{import.meta.env.VITE_API_URL || 'http://localhost:5050/api'}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase border border-emerald-200">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">MongoDB Database Engine</span>
              <span className="text-slate-500 font-mono text-[11px]">Mongoose v8.9 / In-Memory & Local Auto-Recovery</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase border border-emerald-200">
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
