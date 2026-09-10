import React, { useState, useEffect } from 'react';
import { contactService } from '../../services/contactService';
import { LoadingSpinner } from '../../components/SkeletonLoader';
import { useToast } from '../../context/ToastContext';
import { Mail, Phone, Calendar, Clock, MessageSquare, CheckCircle, Reply } from 'lucide-react';

export const AdminMessagesPage = () => {
  const { success, error: toastError } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      const res = await contactService.getMessages();
      if (res.success) {
        setMessages(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
      toastError('Failed to load customer inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'unread' ? 'read' : currentStatus === 'read' ? 'replied' : 'unread';
    try {
      const res = await contactService.updateStatus(id, nextStatus);
      if (res.success) {
        success(`Message marked as ${nextStatus}`);
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, status: nextStatus } : m))
        );
      }
    } catch (err) {
      toastError('Failed to update status');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading customer messages..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Customer Inquiries & Messages
        </h1>
        <p className="text-xs text-slate-500">
          Review catering inquiries, custom celebration requests, and store feedback.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-display text-base font-bold text-slate-700 mb-1">No Messages Yet</h3>
          <p className="text-xs text-slate-400">Customer contact submissions will show up here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-xs transition-all ${
                msg.status === 'unread'
                  ? 'border-accent/40 bg-amber-50/20 shadow-sm'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {msg.name ? msg.name[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{msg.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <a href={`mailto:${msg.email}`} className="text-accent hover:underline">
                          {msg.email}
                        </a>
                      </span>
                      {msg.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <a href={`tel:${msg.phone}`} className="hover:underline">
                            {msg.phone}
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      msg.status === 'unread'
                        ? 'bg-amber-100 text-amber-800'
                        : msg.status === 'replied'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {msg.status}
                  </span>

                  <button
                    onClick={() => handleToggleStatus(msg._id, msg.status)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline px-2 py-1"
                  >
                    Toggle Status
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Subject: <span className="text-slate-900 font-semibold">{msg.subject || 'General Inquiry'}</span>
                </span>
                <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {msg.message}
                </p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Received on {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
