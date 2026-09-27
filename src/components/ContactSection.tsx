import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, Mail, ArrowRight, Phone } from 'lucide-react';

const BUDGETS = ['< $5k', '$5k–$10k', '$10k–$25k', '$25k+'];

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', whatsapp: false, budget: '$20k–$50k', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!form.email.trim() || !isValidEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!form.message.trim()) {
      setError('Please describe your project goals.');
      return;
    }

    setError('');
    setSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'd12bf1db-d00c-4775-8348-5cec24b82ab3';

    try {
      let success = false;

      if (accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const formData = new FormData();
        formData.append('access_key', accessKey);
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('budget', form.budget);
        formData.append('message', form.message);
        formData.append('subject', `New Project Brief from ${form.name}`);
        if (form.phone) {
          formData.append('phone', form.phone);
          formData.append('preferred_contact', form.whatsapp ? 'WhatsApp' : 'Phone/Email');
        }

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json().catch(() => null);
        if (res.ok && data?.success) {
          success = true;
        }
      }

      if (!success) {
        const subject = encodeURIComponent(`Project Brief from ${form.name}`);
        const body = encodeURIComponent(
          `Hi Suman,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}${form.whatsapp ? ' (WhatsApp)' : ''}\nBudget: ${form.budget}\n\nProject Goals:\n${form.message}`
        );

        if (form.whatsapp && form.phone) {
          const waMsg = encodeURIComponent(
            `Hi Suman! I'm ${form.name}.\nEmail: ${form.email}\nPhone: ${form.phone}\nBudget: ${form.budget}\n\nProject Goals:\n${form.message}`
          );
          window.open(`https://wa.me/919832550125?text=${waMsg}`, '_blank');
        } else {
          window.location.href = `mailto:sumanverse95@gmail.com?subject=${subject}&body=${body}`;
        }
      }

      setSubmitted(true);
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#2563EB', '#0F2C59', '#60A5FA', '#93C5FD'],
      });
    } catch {
      const subject = encodeURIComponent(`Project Brief from ${form.name}`);
      const body = encodeURIComponent(
        `Hi Suman,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nBudget: ${form.budget}\n\nProject Goals:\n${form.message}`
      );
      window.location.href = `mailto:sumanverse95@gmail.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden">
      <div className="blob blob-blue absolute -top-40 right-0 w-[500px] h-[500px] opacity-25 pulse-glow" />
      <div className="blob blob-navy absolute -bottom-32 left-0 w-[400px] h-[400px] opacity-20" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="reveal">
              <div className="flex items-center gap-2 mb-2">
                <img src="/logo.png" alt="Suman Verse Logo" width="24" height="24" className="w-6 h-6 object-contain drop-shadow-xs" />
                <p className="section-label !mb-0">Start a Conversation</p>
              </div>
              <h2 className="font-monument text-[clamp(1.8rem,4vw,3.2rem)] text-[#0F172A] dark:text-[#F8FAFC] leading-[1.05] tracking-tight uppercase">
                HAVE A PROJECT<br />
                IN MIND? LET'S BUILD<br />
                <span className="grad-blue">SOMETHING UNFORGETTABLE.</span>
              </h2>
            </div>

            <p className="reveal text-base text-[#0F172A]/65 dark:text-[#F8FAFC]/65 font-light leading-relaxed max-w-md" data-delay="80">
              Available for freelance projects, full-time frontend roles, and website development collaborations.
            </p>

            <div className="reveal space-y-3 pt-2 border-t border-[#0F2C59]/08 dark:border-white/10" data-delay="160">
              <a
                href="mailto:sumanverse95@gmail.com"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#0F2C59]/08 dark:border-white/10 hover:border-[#2563EB] hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F2C59]/06 dark:bg-white/10 text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono text-[#0F2C59]/40 dark:text-white/40 uppercase tracking-widest">Direct Email</p>
                  <p className="text-sm font-semibold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">sumanverse95@gmail.com</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#0F172A]/30 dark:text-white/30 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            <div className="reveal" data-delay="240">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#0F2C59]/40 dark:text-white/40 mb-3">Digital Presence</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Trustpilot', href: 'https://www.trustpilot.com/review/suman-verse.vercel.app', svg: 'M24 9.17H14.832L12 0.5L9.168 9.17H0L7.416 14.529L4.584 23.199L12 17.841L19.416 23.199L16.584 14.529L24 9.17Z' },
                  { label: 'GitHub', href: 'https://github.com/suman-verse', svg: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
                  { label: 'Discord', href: 'https://discord.com/users/1130046717878878272', svg: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' },
                  { label: 'WhatsApp', href: 'https://wa.me/919832550125', svg: 'M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.003L2 22l5.129-1.343a9.92 9.92 0 0 0 4.883 1.28h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.038-5.176-2.926-7.066A9.917 9.917 0 0 0 12.012 2zm.004 1.666c4.588 0 8.32 3.731 8.321 8.318 0 2.223-.865 4.312-2.439 5.885-1.575 1.574-3.665 2.439-5.882 2.439h-.003a8.257 8.257 0 0 1-4.214-1.157l-.302-.18-3.13.82.835-3.048-.197-.314a8.267 8.267 0 0 1-1.312-4.444c.001-4.587 3.734-8.32 8.321-8.32zm4.567 10.742c-.25-.125-1.479-.73-1.708-.813-.229-.083-.396-.125-.563.125-.166.25-.646.812-.792.979-.146.166-.292.187-.542.062a6.852 6.852 0 0 1-2.016-1.242 7.55 7.55 0 0 1-1.396-1.739c-.146-.25-.015-.385.11-.51.112-.112.25-.292.375-.438.125-.146.166-.25.25-.417.083-.166.042-.312-.021-.437-.063-.125-.563-1.354-.771-1.854-.203-.487-.41-.421-.563-.428l-.479-.009c-.167 0-.438.062-.667.312s-.875.854-.875 2.083c0 1.229.896 2.417 1.021 2.583.125.167 1.763 2.693 4.27 3.776.596.257 1.062.411 1.425.526.598.19 1.142.163 1.572.099.48-.071 1.479-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.104-.229-.166-.479-.291z' },
                  { label: 'Instagram', href: 'https://www.instagram.com/_suman_verse?igsh=ZThxMXB4cGV4Nms3', svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#0F2C59]/08 dark:border-white/10 text-[#0F172A] dark:text-white text-xs font-mono hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-[#60A5FA] hover:shadow-sm transition-all duration-300"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d={link.svg} /></svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 reveal" data-delay="100">
            <div className="card rounded-3xl p-8 md:p-12 bg-white/95 dark:bg-[#1E293B]/95">
              {submitted ? (
                <div className="py-14 flex flex-col items-center text-center gap-5 animate__animated animate__fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#0F172A] dark:text-[#F8FAFC]">Message Received</h3>
                  <p className="text-sm text-[#0F172A]/60 dark:text-[#F8FAFC]/60 font-light max-w-xs leading-relaxed">
                    I personally review every inquiry and aim to respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', whatsapp: false, budget: '$20k–$50k', message: '' }); }}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-[#0F2C59] dark:bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-2">
                    <h3 className="font-monument text-lg text-[#0F172A] dark:text-[#F8FAFC]">Project Brief</h3>
                    <p className="text-xs text-[#0F172A]/50 dark:text-[#F8FAFC]/50 font-mono mt-1">Fill out the form and I'll respond within 24h</p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-mono">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { key: 'name', label: 'Your Name', placeholder: 'Sarah Jenkins', type: 'text' },
                      { key: 'email', label: 'Email Address', placeholder: 'sarah@company.com', type: 'email' },
                    ].map(({ key, label, placeholder, type }) => (
                      <div key={key} className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#0F2C59]/60 dark:text-white/60 font-bold">{label} *</label>
                        <input
                          type={type}
                          value={form[key as keyof typeof form] as string}
                          onChange={(e) => update(key, e.target.value)}
                          placeholder={placeholder}
                          className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-black border border-[#0F2C59]/12 dark:border-white/10 text-sm text-[#0F172A] dark:text-white placeholder:text-[#0F172A]/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all shadow-xs"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#0F2C59]/60 dark:text-white/60 font-bold flex items-center gap-1.5">
                      <Phone className="w-3 h-3" />
                      Phone Number
                      <span className="text-[#0F2C59]/30 dark:text-white/30 normal-case font-normal">(optional)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="+91 98325 50125"
                        className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-white dark:bg-black border border-[#0F2C59]/12 dark:border-white/10 text-sm text-[#0F172A] dark:text-white placeholder:text-[#0F172A]/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, whatsapp: !f.whatsapp }))}
                        className={`shrink-0 flex items-center gap-2 px-4 py-3.5 rounded-xl border text-xs font-mono font-semibold transition-all duration-300 whitespace-nowrap ${form.whatsapp
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                          : 'bg-white dark:bg-black border-[#0F2C59]/12 dark:border-white/10 text-[#0F172A]/60 dark:text-white/60 hover:border-emerald-400 hover:text-emerald-600'
                          }`}
                        title="Check if this number is also on WhatsApp"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.003L2 22l5.129-1.343a9.92 9.92 0 0 0 4.883 1.28h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.038-5.176-2.926-7.066A9.917 9.917 0 0 0 12.012 2zm.004 1.666c4.588 0 8.32 3.731 8.321 8.318 0 2.223-.865 4.312-2.439 5.885-1.575 1.574-3.665 2.439-5.882 2.439h-.003a8.257 8.257 0 0 1-4.214-1.157l-.302-.18-3.13.82.835-3.048-.197-.314a8.267 8.267 0 0 1-1.312-4.444c.001-4.587 3.734-8.32 8.321-8.32zm4.567 10.742c-.25-.125-1.479-.73-1.708-.813-.229-.083-.396-.125-.563.125-.166.25-.646.812-.792.979-.146.166-.292.187-.542.062a6.852 6.852 0 0 1-2.016-1.242 7.55 7.55 0 0 1-1.396-1.739c-.146-.25-.015-.385.11-.51.112-.112.25-.292.375-.438.125-.146.166-.25.25-.417.083-.166.042-.312-.021-.437-.063-.125-.563-1.354-.771-1.854-.203-.487-.41-.421-.563-.428l-.479-.009c-.167 0-.438.062-.667.312s-.875.854-.875 2.083c0 1.229.896 2.417 1.021 2.583.125.167 1.763 2.693 4.27 3.776.596.257 1.062.411 1.425.526.598.19 1.142.163 1.572.099.48-.071 1.479-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.104-.229-.166-.479-.291z" />
                        </svg>
                        WhatsApp
                      </button>
                    </div>
                    {form.whatsapp && form.phone && (
                      <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                        WhatsApp preferred — I'll reach out via WhatsApp
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#0F2C59]/60 dark:text-white/60 font-bold">Project Budget</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => update('budget', b)}
                          className={`py-3 px-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 ${form.budget === b
                            ? 'bg-[#0F2C59] dark:bg-[#2563EB] text-white shadow-md'
                            : 'bg-white dark:bg-black text-[#0F172A]/70 dark:text-white/70 border border-[#0F2C59]/10 dark:border-white/10 hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-[#60A5FA]'
                            }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#0F2C59]/60 dark:text-white/60 font-bold">Project Goals *</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Briefly describe your objectives, challenges, and timeline..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-black border border-[#0F2C59]/12 dark:border-white/10 text-sm text-[#0F172A] dark:text-white placeholder:text-[#0F172A]/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all resize-none shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-4 rounded-xl bg-[#0F2C59] dark:bg-[#2563EB] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="font-mono text-xs tracking-wider animate-pulse">Transmitting Brief…</span>
                    ) : (
                      <>Submit Project Brief <Send className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-[#0F172A]/35 dark:text-white/35 font-mono">
                    No spam · Typically responds within 4 business hours
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
