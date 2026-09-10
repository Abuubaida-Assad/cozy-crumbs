import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { contactService } from '../../services/contactService';
import {
  Cake,
  FolderTree,
  Sparkles,
  CheckCircle2,
  Plus,
  ArrowRight,
  MessageSquare,
  TrendingUp,
  Store,
  ExternalLink,
} from 'lucide-react';
import { LoadingSpinner } from '../../components/SkeletonLoader';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    featuredProducts: 0,
    availableProducts: 0,
    totalMessages: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [prodRes, catRes, msgRes] = await Promise.all([
          productService.getProducts({ all: 'true' }),
          categoryService.getCategories(true),
          contactService.getMessages().catch(() => ({ data: [] })),
        ]);

        const prods = prodRes.data || [];
        const cats = catRes.data || [];
        const msgs = msgRes.data || [];

        setStats({
          totalProducts: prodRes.total || prods.length,
          totalCategories: cats.length,
          featuredProducts: prods.filter((p) => p.isFeatured).length,
          availableProducts: prods.filter((p) => p.isAvailable).length,
          totalMessages: msgs.length,
        });

        setRecentProducts(prods.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading bakery analytics..." />;
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Cake,
      color: 'bg-amber-500',
      link: '/admin/products',
    },
    {
      title: 'Active Categories',
      value: stats.totalCategories,
      icon: FolderTree,
      color: 'bg-emerald-500',
      link: '/admin/categories',
    },
    {
      title: 'Signature Featured',
      value: stats.featuredProducts,
      icon: Sparkles,
      color: 'bg-purple-500',
      link: '/admin/products',
    },
    {
      title: 'Available Products',
      value: stats.availableProducts,
      icon: CheckCircle2,
      color: 'bg-blue-500',
      link: '/admin/products',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-slate-700">
        <div>
          <span className="text-xs font-bold tracking-widest text-accent-soft uppercase block mb-1">
            CONTROL CENTER
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Bakery Catalog & Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Manage your artisanal cakes, pastry inventory, bakery categories, and monitor customer inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Products</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ExternalLink className="w-4 h-4 text-accent-soft" />
            <span>View Store</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  {card.title}
                </span>
                <span className="font-sans text-3xl font-black text-slate-900 tabular-nums">
                  {card.value}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Products Overview & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Products Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Recently Added Bakery Items
              </h2>
              <p className="text-xs text-slate-500">Live products synced to the customer catalog</p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-accent hover:underline flex items-center gap-1 uppercase"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentProducts.map((prod) => (
                  <tr key={prod._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                        />
                        <span className="font-bold text-slate-800 max-w-[180px] truncate block">
                          {prod.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-600 font-medium">
                      {typeof prod.category === 'object' ? prod.category?.name : 'General'}
                    </td>
                    <td className="py-3 font-extrabold text-slate-900">
                      ₹{prod.price}
                    </td>
                    <td className="py-3">
                      {prod.isAvailable ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                          Hidden
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Shortcuts & Management Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="font-display text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Quick Shortcuts
            </h3>
            <div className="space-y-2.5">
              <Link
                to="/admin/products"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-900 transition-colors text-xs font-semibold text-slate-700"
              >
                <span className="flex items-center gap-2">
                  <Cake className="w-4 h-4 text-amber-600" />
                  Add & Edit Products
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/admin/categories"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 transition-colors text-xs font-semibold text-slate-700"
              >
                <span className="flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-emerald-600" />
                  Category Management
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/admin/messages"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-900 transition-colors text-xs font-semibold text-slate-700"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  Contact Inquiries ({stats.totalMessages})
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-soft block mb-1">
              SYSTEM STATUS
            </span>
            <h4 className="font-display font-bold text-base mb-2">Live Production Database</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>MongoDB Database Connected</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>REST API Server Online (Port 5050)</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>JWT Authentication Active</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
