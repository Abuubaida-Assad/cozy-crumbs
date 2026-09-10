import React from 'react';
import { ShoppingBag, Clock, CheckCircle2, AlertCircle, Store } from 'lucide-react';

export const AdminOrdersPage = () => {
  const sampleOrders = [
    {
      id: 'ORD-9821',
      customer: 'Ananya Sharma',
      phone: '+91 98490 12345',
      store: 'Cozy Crumbs — Jubilee Hills',
      items: 'Black Forest Signature Cake (1kg), 4x Chicken Puff',
      total: 759,
      status: 'Preparing',
      time: '12 mins ago',
    },
    {
      id: 'ORD-9820',
      customer: 'Vikram Reddy',
      phone: '+91 97000 54321',
      store: 'Cozy Crumbs — Banjara Hills',
      items: 'Royal Red Velvet Cake (500g), Artisan Sourdough Loaf',
      total: 694,
      status: 'Ready for Pickup',
      time: '34 mins ago',
    },
    {
      id: 'ORD-9819',
      customer: 'Meera Patel',
      phone: '+91 99887 76655',
      store: 'Cozy Crumbs — Madhapur',
      items: '2x Osmania Butter Biscuits Box, 2x Cold Coffee',
      total: 540,
      status: 'Completed',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Bakery Orders & Store Pickups
        </h1>
        <p className="text-xs text-slate-500">
          Monitor order preparation flow across Hyderabad retail branches.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Order ID</th>
                <th className="py-3.5 px-4 font-bold">Customer</th>
                <th className="py-3.5 px-4 font-bold">Outlet Location</th>
                <th className="py-3.5 px-4 font-bold">Items Summary</th>
                <th className="py-3.5 px-4 font-bold">Amount</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {ord.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-800 block">{ord.customer}</span>
                    <span className="text-[11px] text-slate-400">{ord.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {ord.store}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                    {ord.items}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    ₹{ord.total}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        ord.status === 'Preparing'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : ord.status === 'Ready for Pickup'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
