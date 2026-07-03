import React, { useState } from 'react';
import { Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Contact({ personalData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset status
    setStatus('loading');
    setStatusMsg('');

    // Explicit email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setStatusMsg('Please enter a valid email address.');
      return;
    }

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMsg(data.message || 'Thank you! Your message has been sent successfully.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'Failed to submit form. Please check your inputs.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setStatusMsg('Connection failed. Please ensure the backend is running.');
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal delay={100} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <div className="w-12 h-1 bg-violet-600 dark:bg-violet-500 rounded-full mx-auto mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400">
              Have a question or want to work together? Send me a message!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Card (Left) */}
          <ScrollReveal delay={200} duration={800} className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200/40 dark:border-slate-800">
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                Contact Information
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Feel free to contact me via email or submit the form. I typically respond within 24 hours.
              </p>

              <div className="space-y-4">
                <a 
                  href={`mailto:${personalData?.email || 'mdeepak1610@gmail.com'}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100/70 dark:bg-slate-900/45 dark:hover:bg-slate-900/90 border border-slate-200/10 dark:border-slate-800/40 transition-colors group"
                >
                  <div className="p-3 bg-white dark:bg-slate-950 text-violet-600 dark:text-violet-400 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Email Me</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{personalData?.email || 'mdeepak1610@gmail.com'}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/45 border border-slate-200/10 dark:border-slate-800/45">
                  <div className="p-3 bg-white dark:bg-slate-950 text-violet-600 dark:text-violet-400 rounded-lg shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Location</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{personalData?.location || 'India'}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Card (Right) */}
          <ScrollReveal delay={300} duration={800} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200/40 dark:border-slate-800">
              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-900/50">
                  <CheckCircle2 size={20} className="flex-shrink-0" />
                  <span className="text-sm font-semibold">{statusMsg}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/50">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <span className="text-sm font-semibold">{statusMsg}</span>
                </div>
              )}

              {/* Name & Email Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 dark:focus:border-violet-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 dark:focus:border-violet-500 transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 dark:focus:border-violet-500 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 dark:focus:border-violet-500 transition-all resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-750 hover:to-indigo-750 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] transition-all shadow-md"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
