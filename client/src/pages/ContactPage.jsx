import React, { useState } from 'react';
import { contactService } from '../services/contactService';
import { useToast } from '../context/ToastContext';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage = () => {
  const { success, error: toastError } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await contactService.submitContact(formData);
      if (res.success) {
        setSubmitted(true);
        success('Message sent successfully! Our bakery team will be in touch shortly.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      toastError(err.response?.data?.message || 'Failed to submit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#FCFAF7] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="font-sans text-[#8C735A] font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
            GET IN TOUCH
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3A2923] tracking-tight mb-2 sm:mb-3">
            Contact Cozy Crumbs
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#6F5746] leading-relaxed">
            Have a question about custom celebration orders, menu ingredients, or baking timings? We would love to hear from you.
          </p>
        </div>

        {/* Contact Form & Main Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-[#3A2923]/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#E8DED1] flex items-center justify-center text-[#3A2923]">
                <MessageSquare className="w-5 h-5 text-[#8C735A]" />
              </div>
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#3A2923]">Send Us a Message</h2>
                <p className="text-xs text-[#6F5746]">Our bakery team responds promptly.</p>
              </div>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#3A2923] mb-2">Message Sent!</h3>
                <p className="font-sans text-xs sm:text-sm text-[#6F5746] max-w-sm mx-auto mb-6">
                  Thank you for reaching out. A representative from Cozy Crumbs will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#3A2923] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2923] mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#3A2923]/10 text-xs sm:text-sm text-[#3A2923] placeholder:text-[#6F5746]/50 focus:outline-none focus:ring-2 focus:ring-[#8C735A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2923] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#3A2923]/10 text-xs sm:text-sm text-[#3A2923] placeholder:text-[#6F5746]/50 focus:outline-none focus:ring-2 focus:ring-[#8C735A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2923] mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone number"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#3A2923]/10 text-xs sm:text-sm text-[#3A2923] placeholder:text-[#6F5746]/50 focus:outline-none focus:ring-2 focus:ring-[#8C735A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2923] mb-1">
                    Message *
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your celebration or query..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#3A2923]/10 text-xs sm:text-sm text-[#3A2923] placeholder:text-[#6F5746]/50 focus:outline-none focus:ring-2 focus:ring-[#8C735A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#3A2923] hover:bg-[#24130D] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Contact Information Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#24130D] text-[#FCFAF7] rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B09A7C] block mb-1">
                COZY CRUMBS
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Bakery Information
              </h3>
              <p className="text-xs text-[#E8DED1]/80 leading-relaxed">
                Handcrafted baking, celebration cakes, and daily artisanal breads.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm pt-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#B09A7C] flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/50 block">Phone</span>
                  <a href="tel:7098322796" className="text-white hover:text-[#B09A7C] font-semibold transition-colors">
                    7098322796
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#B09A7C] flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/50 block">Email</span>
                  <a href="mailto:cozycrumbs6767@gmail.com" className="text-white hover:text-[#B09A7C] font-semibold transition-colors">
                    cozycrumbs6767@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#B09A7C] flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/50 block">Address</span>
                  <span className="text-white font-medium">
                    Gachibowli TNGOS Colony
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
