import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, CheckCircle2, ArrowRight, X, Send, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

export const CareersPage = () => {
  const { success } = useToast();
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicant, setApplicant] = useState({ name: '', email: '', phone: '', portfolio: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobs = [
    {
      id: '1',
      title: 'Senior Cake Artist & Sugar Confectioner',
      department: 'Bakery Production',
      location: 'Central Kitchen — Jubilee Hills, Hyderabad',
      type: 'Full-Time',
      experience: '3+ Years',
      description: 'Lead design and execution for multi-tiered wedding cakes, custom celebration cakes, fondant sculpting, and chocolate filigree work.',
      requirements: [
        'Demonstrated expertise in high-end fondant and buttercream piping.',
        'Knowledge of sugarcraft, marzipan, and chocolate tempering.',
        'Ability to work in a fast-paced morning production kitchen.',
      ],
    },
    {
      id: '2',
      title: 'Master Pastry & Sourdough Baker',
      department: 'Bread & Viennoiserie',
      location: 'Central Kitchen — Madhapur, Hyderabad',
      type: 'Full-Time',
      experience: '2+ Years',
      description: 'Oversee laminated doughs, authentic European croissants, brioche, and long-fermentation natural sourdough loaves on stone deck ovens.',
      requirements: [
        'Hands-on experience with deck ovens, lamination, and levain maintenance.',
        'Deep understanding of hydration, fermentation temps, and scoring techniques.',
      ],
    },
    {
      id: '3',
      title: 'Bakery Outlet Store Manager',
      department: 'Retail Operations',
      location: 'Banjara Hills Outlet, Hyderabad',
      type: 'Full-Time',
      experience: '2+ Years',
      description: 'Manage daily outlet retail operations, inventory replenishment, guest hospitality, team scheduling, and quality assurance.',
      requirements: [
        'Experience in cafe/bakery retail management or hospitality.',
        'Warm customer engagement and POS inventory management.',
      ],
    },
    {
      id: '4',
      title: 'Guest Experience & Barista Associate',
      department: 'Customer Service',
      location: 'All Hyderabad Outlets',
      type: 'Full-Time / Part-Time',
      experience: 'Fresher / 1 Year',
      description: 'Welcome customers, recommend bakery pairings, craft signature espresso brews, cold shakes, and package celebration cakes with utmost care.',
      requirements: [
        'Cheerful personality, punctuality, and passion for artisan coffee & desserts.',
      ],
    },
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedJob(null);
      setApplicant({ name: '', email: '', phone: '', portfolio: '', notes: '' });
      success('Your application has been received! Our hiring team will contact you shortly.');
    }, 1200);
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="font-sans text-accent font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
            CAREERS AT COZY CRUMBS
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-cocoa tracking-tight mb-3 sm:mb-4">
            Join the Cozy Crumbs Family
          </h1>
          <p className="font-sans text-xs sm:text-sm text-cocoa/75 leading-relaxed max-w-xl mx-auto">
            We are always looking for passionate bakers, innovative cake artists, and warm hospitality pros who care deeply about the craft of fine baking.
          </p>
        </div>

        {/* Culture Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cocoa/10 shadow-soft text-center">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-display text-base font-bold text-cocoa mb-1">State-of-the-Art Kitchens</h3>
            <p className="text-xs text-cocoa/70">European stone deck ovens, climate-controlled chocolate rooms, and premium tools.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-cocoa/10 shadow-soft text-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-display text-base font-bold text-cocoa mb-1">Growth & Learning</h3>
            <p className="text-xs text-cocoa/70">Masterclasses with visiting pastry chefs and fast-track culinary leadership tracks.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-cocoa/10 shadow-soft text-center">
            <Briefcase className="w-8 h-8 text-cocoa mx-auto mb-3" />
            <h3 className="font-display text-base font-bold text-cocoa mb-1">Competitive Benefits</h3>
            <p className="text-xs text-cocoa/70">Industry-leading compensation, health insurance coverage, and bakery allowances.</p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-cocoa mb-6">Current Openings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-cocoa/10 shadow-soft transition-all duration-300 hover:shadow-hover hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-accent-soft text-accent px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold text-cocoa-light bg-cream-beige px-2.5 py-0.5 rounded-md">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-cocoa mb-2">{job.title}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-cocoa-light mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {job.experience}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-cocoa/75 leading-relaxed mb-5">
                    {job.description}
                  </p>

                  <div className="mb-6 space-y-1.5">
                    <span className="text-xs font-bold text-cocoa uppercase block">Requirements:</span>
                    {job.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-cocoa/70">
                        <span className="text-accent font-bold">•</span>
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-cocoa/10">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full btn-primary py-3 text-xs"
                  >
                    <span>APPLY FOR POSITION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-cocoa-dark/70 backdrop-blur-sm" onClick={() => setSelectedJob(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white rounded-3xl p-5 sm:p-7 md:p-8 max-w-lg w-full shadow-2xl border border-cocoa/10 z-10 my-auto max-h-[90dvh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-cream-beige text-cocoa flex items-center justify-center hover:bg-cream-sand"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-1">
                JOB APPLICATION
              </span>
              <h3 className="font-display text-xl font-bold text-cocoa mb-1">
                {selectedJob.title}
              </h3>
              <p className="text-xs text-cocoa-light mb-6">{selectedJob.location}</p>

              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="admin-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicant.name}
                    onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="admin-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                      placeholder="john@example.com"
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={applicant.phone}
                      onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="admin-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="admin-label">Portfolio / Resume Link</label>
                  <input
                    type="url"
                    value={applicant.portfolio}
                    onChange={(e) => setApplicant({ ...applicant, portfolio: e.target.value })}
                    placeholder="https://linkedin.com/in/... or drive link"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="admin-label">Why Cozy Crumbs? (Short Note)</label>
                  <textarea
                    rows="3"
                    value={applicant.notes}
                    onChange={(e) => setApplicant({ ...applicant, notes: e.target.value })}
                    placeholder="Tell us about your baking passion or relevant experience..."
                    className="admin-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3.5 text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT APPLICATION'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};
