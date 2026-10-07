import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, ArrowUpRight, Phone } from 'lucide-react';
import { submitContact } from '../../lib/submitContact';
import { FravLogoMark } from './FravLogoMark';

interface FravContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FravContactModal: React.FC<FravContactModalProps> = ({ isOpen, onClose }) => {
  const [focus, setFocus] = useState<'WEB' | 'AUTOMATION' | 'BOTH'>('BOTH');
  const [formData, setFormData] = useState({ name: '', email: '', note: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim()) || !formData.note.trim()) {
      setError('Please provide your name, a valid email address, and a message.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await submitContact({
        formType: 'contact-modal',
        name: formData.name,
        email: formData.email,
        focus,
        message: formData.note,
        website: formData.website,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', note: '', website: '' });
        onClose();
      }, 2000);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'We could not send your message. Please try again or email admin@fravautomationlab.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-[#0E0E0E] border border-white/20 rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <div>
                <span className="mb-1 flex items-center gap-2 text-[10px] font-sans text-neutral-400 uppercase tracking-widest">
                  <FravLogoMark className="h-3 w-6 text-neutral-400" />
                  FRAV AUTOMATION
                </span>
                <h3 className="text-3xl sm:text-4xl font-black font-['Syne',sans-serif] uppercase tracking-tight">
                  CONTACT US
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-2 rounded-full border border-white/10 hover:border-white text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Submission State */}
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                <h4 className="text-2xl font-bold font-['Syne',sans-serif] uppercase">
                  TRANSMISSION RECEIVED
                </h4>
                <p className="text-sm font-sans text-neutral-400">
                  FRAV Automation will review your scope within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                {error && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-sans flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Focus selection */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-2">
                    DISCIPLINE
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['WEB', 'AUTOMATION', 'BOTH'] as const).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFocus(item)}
                        className={`py-2 text-xs font-sans uppercase rounded-lg border transition-all cursor-pointer ${
                          focus === item
                            ? 'bg-white text-black font-bold border-white'
                            : 'bg-neutral-900/60 text-neutral-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {item === 'WEB' ? 'WEBSITE DEVELOPMENT' : item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name or company"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white text-sm font-sans transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hello@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white text-sm font-sans transition-colors"
                  />
                </div>

                {/* Scope Note */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-widest text-neutral-400 mb-2">
                    SCOPE / OBJECTIVE
                  </label>
                  <textarea
                    rows={3}
                    required
                    maxLength={5000}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Brief objective, timeline, or architecture..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white text-sm font-sans transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-white hover:bg-[#FF4F38] text-black hover:text-white font-['Syne',sans-serif] font-black text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'SENDING...' : 'SEND BRIEF'}</span>
                  {!isSubmitting && <ArrowUpRight className="w-4 h-4" />}
                </button>
              </form>
            )}

            {/* Direct Channel */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-sans text-neutral-400 gap-3">
              <a
                href="tel:+41442114890"
                className="px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white font-bold transition-all flex items-center justify-center gap-2 self-start"
                aria-label="Call studio"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF4F38]" />
                <span>CALL US: +41 44 211 48 90</span>
              </a>
              <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                <span>EMAIL:</span>
                <a href="mailto:admin@fravautomationlab.com" className="text-neutral-300 hover:text-white transition-colors">
                  admin@fravautomationlab.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
