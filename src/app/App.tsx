import { useState } from "react";
import { BookOpen, Star, ChevronDown, ArrowRight, Check, Menu, X } from "lucide-react";

const NAV_LINKS = ["Subjects", "How It Works", "Tutors", "Testimonials", "Contact"];

const SUBJECTS = [
  { name: "Mathematics", icon: "∑", desc: "Algebra through Calculus, Statistics, SAT/ACT prep", levels: "Grade 1 – University" },
  { name: "Sciences", icon: "⚗", desc: "Physics, Chemistry, Biology, AP & IB programmes", levels: "Grade 1 – University" },
  { name: "English & Writing", icon: "✍", desc: "Essay craft, literary analysis, college applications", levels: "Grade 1 – University" },
  { name: "History & Humanities", icon: "🏛", desc: "World history, economics, philosophy, debate", levels: "Grade 1 – University" },
  { name: "Languages", icon: "言", desc: "English, ESL prep", levels: "All levels" },
  { name: "Test Preparation", icon: "◈", desc: "SAT, ACT, GRE, GMAT, LSAT, MCAT", levels: "High School – Graduate" },
];

const STEPS = [
  { num: "01", title: "Tell Me Your Goals", body: "Fill out a short intake form about subjects, schedule preferences, and what you want to achieve. No commitment required." },
  { num: "02", title: "Get a Callback", body: "I will reach out to discuss your goals and how I can help you achieve them." },
  { num: "03", title: "Confirm free session", body: "Schedule and confirm your free introductory session with me." },
  { num: "04", title: "Start Learning", body: "Confirm your regular schedule and begin. Sessions are held online via our whiteboard platform or in person where available." },
];

const TUTORS = [
  {
    name: "Lavesh Nama Kamalesh",
    subject: "Computer Science & Engineering graduate",
    bio: "With a passion for software development and education, I’ve spent the past 3+ years empowering students through a STEM-focused approach to learning. I believe education works best when it connects to what students already love, so I tailor my teaching to their personal interests to make concepts engaging and intuitive.\n\nOutside of coding and teaching, you can usually find me playing the guitar, playing a game of chess, or solving Rubik's cubes.",    linkedin: "https://www.linkedin.com/in/lavesh-nama-kamalesh-1b7938193/",    rating: 4.97,
    sessions: 1240,
    img: "photo.jpg",
  }
];

const TESTIMONIALS = [
  {
    quote: "My daughter went from a C in Pre-Calculus to an A– in one semester. More importantly, she stopped dreading homework.",
    name: "Margaret Liu",
    context: "Parent of 10th-grade student",
  },
  {
    quote: "I needed literally 20 more points on the SAT for my target school. I got 60. Lavesh's strategy sessions just were unlike anything I'd tried.",
    name: "Daniel Okafor",
    context: "Admitted to Algonquin College, Class of 2028",
  },
  {
    quote:"Lavesh figured out how to explain complex concepts in a way that actually clicked for me. I am so so so thankful for him because I absolutely hated math before then.",
    name: "Susanne Erikkson",
    context: "Admitted to Carleton University",
  }
];

const FAQS = [
  { q: "How long are sessions?", a: "Standard sessions run 60 or 90 minutes. You can adjust length based on subject and student age." },
  { q: "What platform do online sessions use?", a: "We use a combination of Google Meet and an integrated whiteboard environment." },
  { q: "Do you offer group sessions?", a: "We can definetly look into some group sessions if yours and few other students are interested in learning the same topic/s.." },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className="fill-accent text-accent" />
      ))}
      <span className="ml-1.5 font-mono text-xs text-muted-foreground">{rating}</span>
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left text-foreground hover:text-primary transition-colors"
      >
        <span className="font-medium text-base" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>{q}</span>
        <ChevronDown size={18} className={`shrink-0 transition-transform text-muted-foreground ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="pb-5 text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen size={20} className="text-accent" />
            <span className="font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meridian Tutoring
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 transition-opacity">
              Book a Free Session
            </a>
          </div>

          <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-muted-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a href="#contact" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 text-center">
              Book a Free Session
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-16 min-h-screen grid md:grid-cols-2">
        {/* Left — text panel */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-6 bg-primary">
          <p className="text-accent text-xs tracking-widest uppercase mb-6 font-mono">Private Academic Tutoring</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-primary-foreground mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Confidence<br />
            built one<br />
            <em>session</em> at a time.
          </h1>
          <p className="text-primary-foreground/70 text-base leading-relaxed mb-10 max-w-sm">
Hey, I'm Lavesh! I provide expert, 1-on-1 tutoring tailored directly to your learning style. Whether you need to master algebra or navigate university admissions, I'm here to help you go further than you thought possible.          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-accent text-foreground text-sm font-semibold px-6 py-3.5 hover:opacity-90 transition-opacity"
            >
              Start with a Free Session <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground text-sm px-6 py-3.5 hover:border-primary-foreground/60 transition-colors"
            >
              How It Works
            </a>
          </div>

          <div className="mt-14 flex items-center gap-8 border-t border-primary-foreground/10 pt-8">
            {[["100+", "Students taught"],  ["4.97", "Avg. rating"]].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-semibold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>{n}</p>
                <p className="text-xs text-primary-foreground/50 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo panel */}
        <div className="relative min-h-[50vh] md:min-h-0 bg-muted overflow-hidden">
          <img
            src="/photo.jpg"
            alt="Tutor working one-on-one with a student at a desk"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/20" />

          {/* floating card */}
          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-72 bg-card/95 backdrop-blur-sm p-5 shadow-lg border border-border">
            <p className="text-xs text-muted-foreground font-mono mb-2">This week's availability</p>
            {["Mon 9AM – 7 PM", "Tue 3–8 PM", "Thu 4–7 PM", "Sat 10 AM–2 PM"].map((slot) => (
              <div key={slot} className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
                <Check size={13} className="text-accent shrink-0" />
                <span className="text-sm text-foreground">{slot}</span>
              </div>
            ))}
            <a
              href="#contact"
              className="mt-4 w-full block text-center bg-primary text-primary-foreground text-sm py-2.5 hover:opacity-90 transition-opacity"
            >
              Reserve a slot
            </a>
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section id="subjects" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-3">What I teach</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Expert instruction across<br className="hidden md:block" /> every discipline.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SUBJECTS.map((s) => (
              <div key={s.name} className="bg-card p-8 hover:bg-secondary transition-colors group cursor-pointer">
                <div className="text-3xl mb-5 opacity-80">{s.icon}</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <span className="font-mono text-xs text-accent">{s.levels}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              From first inquiry<br /> to first breakthrough.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.num} className="relative">
                <div className="font-mono text-5xl font-medium text-primary-foreground/10 mb-4 select-none">{step.num}</div>
                <h3 className="font-semibold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TUTORS */}
      <section id="tutors" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-3">About me</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              A little about me and my approach to tutoring.
            </h2>
          </div>

          <div className="flex flex-col items-center gap-6">
            {TUTORS.map((t) => (
              <div key={t.name} className="group bg-card border border-border overflow-hidden w-full lg:max-w-2xl hover:border-primary/40 transition-colors">
                <div className="p-8 flex flex-col">
                  <div>
                    <p className="font-mono text-xs text-accent mb-1">{t.subject}</p>
                    <h3 className="font-semibold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{t.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{t.bio}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-4">
                    <Stars rating={t.rating} />
                    <span className="text-xs text-muted-foreground font-mono">{t.sessions.toLocaleString()} sessions</span>
                    {t.linkedin && (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-muted-foreground hover:text-[#0A66C2] transition-colors"
                        aria-label="LinkedIn profile"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="#contact" className="inline-flex items-center gap-2 text-sm text-primary hover:underline underline-offset-4">
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-3">What families say</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Results that speak<br /> for themselves.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card border border-border p-8 flex flex-col justify-between">
                <div>
                  <p className="text-4xl text-accent mb-4 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>"</p>
                  <p className="text-base leading-relaxed text-foreground mb-6">{t.quote}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-3">Questions</p>
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently asked
            </h2>
          </div>
          <div>
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / BOOKING */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Book a session</p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Start with a free<br /> 30-minute intro session.
            </h2>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-8 max-w-sm">
              No obligation. Tell me about your academic needs and goals and we can discuss an induvidualized plan to help you achieve what you need.
            </p>
            <div className="space-y-3">
              {[
                "Free 30-minute introductory session",
                "No payment until you confirm the match",
                "Flexible scheduling — evenings and weekends",
                "Online",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check size={14} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-primary-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-primary-foreground/5 border border-primary-foreground/10 p-10 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  We got your message.
                </h3>
                <p className="text-sm text-primary-foreground/60">
                  A member of our team will reach out within one business day to arrange your introductory session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Your name", type: "text", placeholder: "Emma Chen" },
                  { id: "email", label: "Email address", type: "email", placeholder: "emma@example.com" },
                  { id: "subject", label: "Subject or area of focus", type: "text", placeholder: "AP Calculus BC" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-xs text-primary-foreground/50 mb-1.5 font-mono tracking-wide uppercase">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={(formData as Record<string, string>)[field.id]}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      className="w-full bg-primary-foreground/5 border border-primary-foreground/15 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-xs text-primary-foreground/50 mb-1.5 font-mono tracking-wide uppercase">
                    Tell me a bit more about your plans
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Current grade level, specific challenges, target exam date..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-primary-foreground/5 border border-primary-foreground/15 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent text-foreground text-sm font-semibold py-3.5 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending…" : <> Request My Free Session <ArrowRight size={15} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-accent" />
            <span className="font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Meridian Tutoring</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Lavesh Nama Kamalesh. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
