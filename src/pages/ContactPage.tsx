import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Send, Mail, Phone, Clock, Github, Twitter, Linkedin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [projectType, setProjectType] = useState<'web' | 'ai' | 'fullstack' | 'advisory'>('web');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$5k - $15k',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid work email.');
      return;
    }
    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please share a brief project summary.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', budget: '$5k - $15k', message: '' });
    }, 600);
  };

  return (
    <div className="w-full pt-28 pb-20">
      {/* 1. Page Header */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="text-xs font-sans tracking-widest text-[#FF4F38] uppercase mb-4 block font-semibold">
            Inquiries & Technical Engagements
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight font-['Syne',sans-serif] text-neutral-900 leading-[0.95] mb-6">
            Initiate
            <br />
            Project Scoping.
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl">
            Currently accepting select full-stack website development builds, autonomous AI automation contracts, and engineering advisory.
          </p>
        </motion.div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Direct Channels & Studio Telemetry */}
          <div className="lg:col-span-5 space-y-8">
            {/* Availability Box */}
            <div className="p-6 rounded-2xl bg-neutral-950 text-white border border-neutral-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-sans uppercase tracking-wider text-emerald-400 font-semibold">
                  Q4 Availability Active
                </span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                Booking 2 upcoming production slots for web architecture and enterprise AI workflows.
              </p>
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-sans pt-4 border-t border-neutral-800">
                <Clock className="w-3.5 h-3.5" />
                <span>Response SLA: &lt; 24 business hours</span>
              </div>
            </div>

            {/* Direct Email & Phone */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-sans text-neutral-400 uppercase tracking-wider block mb-1">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:hi@arthurjones.dev"
                  className="text-base font-bold text-neutral-900 hover:text-neutral-600 transition-colors font-sans flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-500" />
                  hi@arthurjones.dev
                </a>
              </div>

              <div className="pt-3 border-t border-neutral-100">
                <span className="text-xs font-sans text-neutral-400 uppercase tracking-wider block mb-1">
                  Telephone
                </span>
                <a
                  href="tel:+16504395756"
                  className="text-base font-bold text-neutral-900 hover:text-neutral-600 transition-colors font-sans flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  +1 (650) 439-5756
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
              <span className="text-xs font-sans text-neutral-400 uppercase tracking-wider block mb-3">
                Developer Network
              </span>
              <div className="flex items-center gap-4 text-neutral-700">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-sans hover:text-neutral-950 transition-colors"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-sans hover:text-neutral-950 transition-colors"
                >
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-sans hover:text-neutral-950 transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Scoping Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-xs space-y-6">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Inquiry received. Arthur will review your architecture and reply within 24 hours.</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-center gap-3 text-sm"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {/* Project Category Pills */}
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-neutral-600 mb-3">
                  Engagement Domain
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'web', label: 'Website Dev' },
                    { id: 'ai', label: 'AI Automation' },
                    { id: 'fullstack', label: 'Full-Stack + AI' },
                    { id: 'advisory', label: 'Advisory' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setProjectType(cat.id as any)}
                      className={`px-3 py-2 rounded-lg text-xs font-sans transition-all cursor-pointer text-center ${
                        projectType === cat.id
                          ? 'bg-neutral-900 text-white font-bold'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-sans font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:border-neutral-950 transition-all text-sm"
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="contact-email" className="block text-xs font-sans font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                  Work Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:border-neutral-950 transition-all text-sm"
                />
              </div>

              {/* Budget / Scope */}
              <div>
                <label htmlFor="contact-budget" className="block text-xs font-sans font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                  Estimated Investment Scope
                </label>
                <select
                  id="contact-budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:border-neutral-950 transition-all text-sm bg-white"
                >
                  <option value="< $5k">&lt; $5k (Sprint / Consultation)</option>
                  <option value="$5k - $15k">$5k - $15k (Core Platform / Workflow)</option>
                  <option value="$15k - $30k">$15k - $30k (Full-Stack + Multi-Agent)</option>
                  <option value="$30k+">$30k+ (Enterprise Infrastructure)</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-sans font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                  Project Brief & Architecture Goals
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Tell me about your product, desired timeline, and core technical requirements..."
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:border-neutral-950 transition-all text-sm resize-y"
                />
              </div>

              {/* Red button: "Send Inquiry" */}
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#FF4F38] hover:bg-[#E03F29] text-white font-semibold text-sm transition-colors cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{status === 'submitting' ? 'Submitting Brief...' : 'Send Project Inquiry'}</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
