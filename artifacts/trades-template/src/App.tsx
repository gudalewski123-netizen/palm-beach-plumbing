import React, { useState, useEffect } from "react";
import { PhoneCall, ShieldCheck, Hammer, Menu, X, MapPin, ChevronRight, Star, ArrowRight, Zap, MessageSquare, Mail, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Switch, Route, Router as WouterRouter, Link } from "wouter";

// Pure-CSS scroll fade-in (avoids framer-motion's React-duplicate issue in pnpm).
// Skips the animation if the element is already in viewport at mount — otherwise
// instant-scrolls / reloads would leave above-the-fold content invisible until
// the IntersectionObserver tick.
function useFadeOnView<T extends HTMLElement>(): React.RefObject<T> {
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    if (alreadyVisible) return; // leave at default opacity 1, no animation needed
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)";
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref as React.RefObject<T>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeOnView<HTMLDivElement>();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={className}>
      {children}
    </div>
  );
}

// Auto-rotating photo gallery — crossfade carousel that gives the page
// a "live" feel without needing video. Pauses on hover, restarts on leave.
function GallerySection({ heading, eyebrow, photos }: { heading: string; eyebrow: string; photos: { src: string; alt: string }[] }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % photos.length), 4500);
    return () => clearInterval(t);
  }, [paused, photos.length]);
  return (
    <section id="gallery" className="py-16 md:py-24 bg-card relative border-y border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
            <ChevronRight className="w-4 h-4" /> {eyebrow}
          </h2>
          <h3 className="text-4xl md:text-5xl font-condensed font-bold uppercase tracking-wide text-foreground">{heading}</h3>
        </Reveal>
        <Reveal>
          <div
            className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(30,95,159,0.20)] bg-background"
            style={{ aspectRatio: "16 / 10" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {photos.map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${i === idx ? "opacity-100" : "opacity-0"}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-white" : "w-2 bg-white/60 hover:bg-white/90"}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BUSINESS, HERO, ABOUT, CTA_BANNER, BADGES, SERVICES, REVIEWS, THEME, PITCH_MODE, HERO_ES, ABOUT_ES, CTA_BANNER_ES, BADGES_ES, SERVICES_ES, REVIEWS_ES, UI_EN, UI_ES } from "./config";
import biz from "../../../business.config.json";
import AdminPage from "./pages/AdminPage";

type Lang = "en" | "es";

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem("pbp-lang");
    return stored === "es" ? "es" : "en";
  });
  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem("pbp-lang", l); } catch {}
    document.documentElement.lang = l;
  };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return [lang, setLang];
}

const waLink = (phoneRaw: string, message: string) =>
  `https://wa.me/${phoneRaw.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

const fallbackEmail = biz.leadNotifyTo || "teddy.nk28@gmail.com";

const queryClient = new QueryClient();

function useApplyTheme() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", THEME.primary);
    root.style.setProperty("--primary-foreground", THEME.primaryFg);
    root.style.setProperty("--background", THEME.background);
    root.style.setProperty("--foreground", THEME.foreground);
    root.style.setProperty("--card", THEME.card);
    root.style.setProperty("--card-foreground", THEME.cardFg);
    root.style.setProperty("--accent", THEME.accent);
    root.style.setProperty("--accent-foreground", THEME.accentFg);
    root.style.setProperty("--muted-foreground", THEME.mutedFg);
    root.style.setProperty("--border", THEME.border);
    root.style.setProperty("--input", THEME.border);
    root.style.setProperty("--ring", THEME.primary);
    root.style.setProperty("--muted", THEME.card);
  }, []);
}


// ============================================================
//  QuoteForm — FormSubmit-integrated contact form.
//
//  How it works:
//    1. Customer fills out the form (name, phone, email, service, message).
//    2. On submit, POSTs DIRECTLY to formsubmit.co — bypasses our backend
//       entirely. (Render free tier blocks SMTP; FormSubmit is HTTP-based.)
//    3. FormSubmit emails the address in BUSINESS.email.
//    4. FIRST submission to a new email triggers an "Activate Form" email
//       to that address — recipient clicks once → permanent.
//
//  PITCH_MODE: when true (no backend yet), the form shows a "Call us"
//  CTA instead of submitting. Set to false in config.ts once everything's
//  live and tested.
//
//  Default recipient: BUSINESS.email from config.ts. Falls back to
//  teddy.nk28@gmail.com (already activated) for pitch builds.
// ============================================================
function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // FormSubmit recipient — pull from BUSINESS.email, fall back to leadNotifyTo
  // from business.config.json (single source of truth for the lead inbox).
  const recipient = BUSINESS.email && BUSINESS.email.trim().length > 0
    ? BUSINESS.email.trim()
    : fallbackEmail;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (PITCH_MODE) return; // pitch mode shouldn't reach here; defensive
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    // FormSubmit special fields
    fd.append("_subject", `New ${BUSINESS.trade} quote from ${fd.get("name") || "site visitor"}`);
    fd.append("_template", "table");
    fd.append("_captcha", "false"); // optional; FormSubmit serves a CAPTCHA page by default
    fd.append("Source", BUSINESS.name);

    // Save to backend DB FIRST so the lead is captured even if FormSubmit
    // is down, rate-limited, or hasn't been activated for this recipient yet.
    // This is the source of truth for the admin dashboard.
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") || ""),
          phone: String(fd.get("phone") || ""),
          email: String(fd.get("email") || ""),
          service: String(fd.get("service") || ""),
          message: String(fd.get("message") || ""),
        }),
      });
    } catch (err) {
      // Backend save failed (no backend deployed yet, network error, etc.).
      // Don't block the FormSubmit path — at worst we lose the admin-dashboard
      // entry and rely on the FormSubmit email.
      console.warn("Backend save failed, continuing with FormSubmit", err);
    }

    try {
      const res = await fetch(`https://formsubmit.co/${encodeURIComponent(recipient)}`, {
        method: "POST",
        body: fd,
      });
      // FormSubmit's regular endpoint returns HTML; we don't need to parse it,
      // just verify HTTP 200. The activation flow (if needed) happens server-side.
      if (!res.ok) throw new Error(`FormSubmit returned ${res.status}`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please call us.");
    }
  }

  // PITCH_MODE: show "call us" card instead of the form
  if (PITCH_MODE) {
    return (
      <section id="quote" className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-condensed font-black uppercase tracking-wide text-foreground mb-4">
            Get a Free Quote
          </h2>
          <p className="text-muted-foreground mb-8">
            We're finalizing our online quote form. In the meantime, give us a call — we answer fast.
          </p>
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded font-condensed text-2xl uppercase tracking-wider font-bold transition-all hover:-translate-y-1 shadow-[0_0_30px_rgba(0,0,0,0.4)]"
          >
            <PhoneCall className="w-6 h-6" />
            {BUSINESS.phone}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 bg-card border-y border-border">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-condensed font-black uppercase tracking-wide text-foreground mb-3">
            Get a Free Quote
          </h2>
          <p className="text-muted-foreground">
            Tell us about your project — we'll get back to you fast.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center bg-background border border-primary/40 rounded p-10">
            <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-condensed font-bold uppercase text-foreground mb-2">Got it.</h3>
            <p className="text-muted-foreground">
              We received your request. Expect a call from {BUSINESS.phone} within 1 business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="name" required placeholder="Your name *"
                className="bg-background border border-border rounded px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <input
                name="phone" required type="tel" placeholder="Phone *"
                className="bg-background border border-border rounded px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <input
              name="email" required type="email" placeholder="Email *"
              className="w-full bg-background border border-border rounded px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <select
              name="service" required defaultValue=""
              className="w-full bg-background border border-border rounded px-4 py-4 text-base text-foreground focus:outline-none focus:border-primary"
            >
              <option value="" disabled>Which service do you need? *</option>
              {SERVICES.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
              <option value="Other">Other / Not sure</option>
            </select>
            <textarea
              name="message" rows={4} placeholder="Tell us about your project (optional)"
              className="w-full bg-background border border-border rounded px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
            />
            <button
              type="submit" disabled={status === "submitting"}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded font-condensed text-xl uppercase tracking-wider font-bold transition-all"
            >
              {status === "submitting" ? "Sending..." : "Request a Free Quote"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                {errorMsg} — please call <a href={`tel:${BUSINESS.phoneRaw}`} className="underline">{BUSINESS.phone}</a>.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function LandingPage() {
  useApplyTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useLang();
  const t = lang === "es" ? UI_ES : UI_EN;
  const hero = lang === "es" ? HERO_ES : HERO;
  const about = lang === "es" ? ABOUT_ES : ABOUT;
  const ctaBanner = lang === "es" ? CTA_BANNER_ES : CTA_BANNER;
  const badges = lang === "es" ? BADGES_ES : BADGES;
  const services = lang === "es" ? SERVICES_ES : SERVICES;
  const reviews = lang === "es" ? REVIEWS_ES : REVIEWS;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const showYearsBadge = BUSINESS.yearsInBusiness && BUSINESS.yearsInBusiness !== "0";

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary selection:text-white">

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-2xl" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("hero")}>
            <img src="/logo.png" alt="Palm Beach Plumbing Contractor Inc" className={`${isScrolled ? "h-16 md:h-24" : "h-20 md:h-32"} w-auto transition-all drop-shadow-sm`} />
            <div className="hidden lg:block border-l border-border pl-3">
              <div className="font-condensed text-primary text-xs font-bold tracking-widest uppercase leading-tight">{BUSINESS.location}</div>
              <div className="font-condensed text-muted-foreground text-xs font-medium tracking-wider uppercase leading-tight">Lic. #CFC1429294</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("services")} className="font-condensed text-lg uppercase tracking-wide hover:text-primary transition-colors">{t.navServices}</button>
            <button onClick={() => scrollTo("about")} className="font-condensed text-lg uppercase tracking-wide hover:text-primary transition-colors">{t.navAbout}</button>
            <button onClick={() => scrollTo("reviews")} className="font-condensed text-lg uppercase tracking-wide hover:text-primary transition-colors">{t.navReviews}</button>
            <div className="flex items-center gap-1 border border-border rounded px-1 py-1 font-condensed text-sm font-bold uppercase tracking-widest" aria-label="Language selector">
              <button onClick={() => setLang("en")} className={`px-3 py-2 rounded transition-colors min-w-[40px] ${lang === "en" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`} aria-pressed={lang === "en"}>EN</button>
              <button onClick={() => setLang("es")} className={`px-3 py-2 rounded transition-colors min-w-[40px] ${lang === "es" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`} aria-pressed={lang === "es"}>ES</button>
            </div>
            <a href={waLink(BUSINESS.phoneRaw, t.whatsappPrefill)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center justify-center w-11 h-11 rounded bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <FaWhatsapp className="w-6 h-6" />
            </a>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded font-condensed text-xl uppercase tracking-wider font-bold transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <PhoneCall className="w-5 h-5" />
              {BUSINESS.phone}
            </a>
          </div>
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-foreground w-11 h-11 flex items-center justify-center -mr-2 rounded hover:bg-card transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-24 pb-8 px-6 flex flex-col gap-5 md:hidden overflow-y-auto">
          <button onClick={() => scrollTo("services")} className="font-condensed text-3xl uppercase tracking-wide text-left border-b border-border pb-4">{t.navServices}</button>
          <button onClick={() => scrollTo("about")} className="font-condensed text-3xl uppercase tracking-wide text-left border-b border-border pb-4">{t.navAbout}</button>
          <button onClick={() => scrollTo("reviews")} className="font-condensed text-3xl uppercase tracking-wide text-left border-b border-border pb-4">{t.navReviews}</button>
          <button onClick={() => scrollTo("contact")} className="font-condensed text-3xl uppercase tracking-wide text-left border-b border-border pb-4">{t.navContact}</button>
          <div className="flex items-center gap-2 mt-2" aria-label="Language selector">
            <button onClick={() => setLang("en")} className={`flex-1 py-3 rounded border font-condensed text-xl uppercase tracking-widest ${lang === "en" ? "bg-primary text-white border-primary" : "border-border text-muted-foreground"}`} aria-pressed={lang === "en"}>English</button>
            <button onClick={() => setLang("es")} className={`flex-1 py-3 rounded border font-condensed text-xl uppercase tracking-widest ${lang === "es" ? "bg-primary text-white border-primary" : "border-border text-muted-foreground"}`} aria-pressed={lang === "es"}>Español</button>
          </div>
          <a href={waLink(BUSINESS.phoneRaw, t.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded font-condensed text-2xl uppercase tracking-wider font-bold mt-2">
            <FaWhatsapp className="w-6 h-6" />
            WhatsApp
          </a>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded font-condensed text-2xl uppercase tracking-wider font-bold">
            <PhoneCall className="w-6 h-6" />
            {BUSINESS.phone}
          </a>
        </div>
      )}

      {/* Hero */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.jpg" alt="Plumbing work — water from faucet" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 md:via-white/75 to-white/30 md:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-white/10"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-condensed uppercase tracking-tight leading-[0.9] mb-6">
              {hero.headline1} <br/>
              <span className="text-primary">{hero.headline2}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">{hero.subheading}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded font-condensed text-2xl uppercase tracking-wider font-bold transition-all hover:-translate-y-1 shadow-[0_8_30px_rgba(30,95,159,0.35)] animate-soft-glow">
                <PhoneCall className="w-6 h-6" />
                {hero.cta1}
              </a>
              <button onClick={() => scrollTo("contact")} className="flex items-center justify-center gap-3 bg-white hover:bg-card border-2 border-primary text-primary px-8 py-4 rounded font-condensed text-2xl uppercase tracking-wider font-bold transition-all hover:-translate-y-1">
                {hero.cta2}
              </button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              {badges.slice(0, 3).map((badge, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-px h-8 bg-white/20 hidden sm:block"></div>}
                  <div className="flex items-center gap-2 font-condensed font-bold text-lg uppercase tracking-wide">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    {badge}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip — anchors trust right under the hero */}
      <section className="relative -mt-px bg-primary text-white">
        <div className="container mx-auto px-6 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:divide-x md:divide-white/15">
            <Reveal className="text-center md:px-4">
              <div className="font-condensed text-4xl md:text-6xl font-black tracking-tight leading-none">{BUSINESS.yearsInBusiness}+</div>
              <div className="text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-2">{t.yearsExperience}</div>
            </Reveal>
            <Reveal delay={80} className="text-center md:px-4">
              <div className="font-condensed text-4xl md:text-6xl font-black tracking-tight leading-none">24/7</div>
              <div className="text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-2">{lang === "es" ? "Emergencias" : "Emergency Service"}</div>
            </Reveal>
            <Reveal delay={160} className="text-center md:px-4">
              <div className="font-condensed text-4xl md:text-6xl font-black tracking-tight leading-none">2</div>
              <div className="text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-2">{lang === "es" ? "Idiomas (EN/ES)" : "Languages Spoken"}</div>
            </Reveal>
            <Reveal delay={240} className="text-center md:px-4">
              <div className="font-condensed text-4xl md:text-6xl font-black tracking-tight leading-none">100%</div>
              <div className="text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-2">{lang === "es" ? "Licenciados y Asegurados" : "Licensed & Insured"}</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 relative bg-background">
        <div className="container mx-auto px-6">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
              <Hammer className="w-4 h-4" /> {t.sectionExpertise}
            </h2>
            <h3 className="text-4xl md:text-5xl font-condensed font-bold uppercase tracking-wide">{t.sectionWhatWeDo}</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Reveal
                key={i}
                delay={i * 80}
                className="group bg-card border border-border p-8 rounded hover:border-primary/50 hover:shadow-[0_12px_40px_rgba(30,95,159,0.18)] transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 bg-background border border-border rounded flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-primary">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-condensed font-bold uppercase tracking-wide mb-3">{service.name}</h4>
                <p className="text-muted-foreground mb-6 flex-grow">{service.desc}</p>
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm mt-auto">
                  {t.learnMore} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — trust-building feature grid */}
      <section id="why" className="py-16 md:py-24 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 relative">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> {lang === "es" ? "Por Qué Elegirnos" : "Why Choose Us"}
            </h2>
            <h3 className="text-4xl md:text-5xl font-condensed font-bold uppercase tracking-wide text-foreground">{lang === "es" ? "La Diferencia Palm Beach" : "The Palm Beach Difference"}</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: lang === "es" ? "Respuesta Rápida" : "Fast Response", body: lang === "es" ? "Llegamos cuando decimos. Emergencias 24/7 en todo el condado de Palm Beach." : "We show up when we say we will. 24/7 emergency dispatch across Palm Beach County." },
              { icon: ShieldCheck, title: lang === "es" ? "Licencia Florida" : "FL State Licensed", body: lang === "es" ? "Lic. #CFC1429294. Contratista certificado de plomería del estado de Florida — totalmente asegurado." : "Lic. #CFC1429294. Florida-certified plumbing contractor, fully insured for your protection." },
              { icon: MessageCircle, title: lang === "es" ? "Se Habla Español" : "Bilingual Team", body: lang === "es" ? "Nuestro equipo lo atiende en inglés o español, con respeto y claridad." : "Our crew serves you in English or Spanish — clear communication, no surprises." },
              { icon: Hammer, title: lang === "es" ? "Trabajo Garantizado" : "Workmanship Guaranteed", body: lang === "es" ? "Respaldamos cada trabajo con la garantía que esperaría de un plomero familiar." : "We back every job with the warranty you'd expect from a family-run plumber." },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 80} className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-[0_12px_40px_rgba(30,95,159,0.18)] hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4 shadow-[0_6px_20px_rgba(30,95,159,0.4)]">
                  <f.icon className="w-6 h-6" />
                </div>
                <h4 className="font-condensed font-bold uppercase tracking-wide text-xl mb-2 text-foreground">{f.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — auto-rotating photo carousel */}
      <GallerySection
        eyebrow={lang === "es" ? "Nuestro Trabajo" : "Our Work"}
        heading={lang === "es" ? "Plomería de Calidad, Foto Por Foto" : "Quality Plumbing, Photo by Photo"}
        photos={[
          { src: "/van.jpg", alt: "Palm Beach Plumbing Contractor service van — Lic. #CFC1429294" },
          { src: "/gallery-1.jpg", alt: "Plumber installing fixtures in a finished bathroom" },
          { src: "/gallery-2.jpg", alt: "Plumber repairing a P-trap under a sink" },
          { src: "/gallery-3.jpg", alt: "Plumber working on under-sink fittings with tools laid out" },
          { src: "/services-bg.jpg", alt: "Brass plumbing fittings under pressure" },
        ]}
      />

      {/* About */}
      <section id="about" className="py-16 md:py-24 bg-card relative border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="hidden md:block absolute -inset-4 border border-primary/20 rounded translate-x-4 translate-y-4 pointer-events-none"></div>
              <img src="/team-photo.jpg" alt={about.teamPhotoAlt} className="w-full h-auto rounded relative z-10 hover:scale-[1.02] transition-all duration-500" />
              {showYearsBadge && (
                <div className="absolute bottom-8 -right-8 bg-primary p-6 rounded shadow-2xl z-20 hidden md:block">
                  <div className="font-condensed text-5xl font-black text-white leading-none mb-1">{BUSINESS.yearsInBusiness}+</div>
                  <div className="text-white/80 font-bold uppercase tracking-wider text-sm">{t.yearsExperience}</div>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> {t.sectionAboutEyebrow}
              </h2>
              <h3 className="text-4xl md:text-6xl font-condensed font-bold uppercase tracking-wide mb-6 leading-tight">{about.headline}</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{about.body1}</p>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">{about.body2}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {badges.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={`tel:${BUSINESS.phoneRaw}`} className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded font-condensed text-xl uppercase tracking-wider font-bold transition-all hover:-translate-y-1">
                {t.callUsNow} <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us — Google Maps + Reviews CTA */}
      <section id="find-us" className="py-16 md:py-24 bg-background border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" /> {lang === "es" ? "Encuéntrenos" : "Find Us"}
            </h2>
            <h3 className="text-4xl md:text-5xl font-condensed font-bold uppercase tracking-wide text-foreground mb-4">
              {lang === "es" ? "Visítenos o Déjenos una Reseña" : "Visit Us or Leave a Review"}
            </h3>
            <p className="text-muted-foreground text-lg">
              {lang === "es"
                ? "Nuestro taller en el corazón de Lake Worth Beach. ¿Trabajamos con usted? Nos encantaría escuchar de usted en Google."
                : "Our shop in the heart of Lake Worth Beach. Worked with us? We'd love to hear from you on Google."}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Map embed */}
            <Reveal className="lg:col-span-2 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(30,95,159,0.15)] border border-border bg-card">
              <iframe
                title="Palm Beach Plumbing Contractor Inc location"
                src="https://www.google.com/maps?q=Palm+Beach+Plumbing+Contractor+Inc+1107+N+A+St+Lake+Worth+Beach+FL+33460&output=embed"
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>

            {/* CTA stack */}
            <Reveal delay={120} className="flex flex-col gap-4">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-primary shrink-0" />
                  <div className="font-condensed font-bold uppercase tracking-wide text-foreground">
                    {lang === "es" ? "Dirección" : "Address"}
                  </div>
                </div>
                <div className="text-muted-foreground leading-snug">{biz.address}</div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Palm+Beach+Plumbing+Contractor+Inc+1107+N+A+St+Lake+Worth+Beach+FL+33460"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded font-condensed text-xl uppercase tracking-wider font-bold transition-all hover:-translate-y-1 shadow-[0_8px_30px_rgba(30,95,159,0.25)] flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                {lang === "es" ? "Cómo Llegar" : "Get Directions"}
              </a>

              <a
                href="https://search.google.com/local/writereview?placeid=Palm+Beach+Plumbing+Contractor+Inc+Lake+Worth+Beach+FL"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Try the search-for-review URL; if that fails the maps search will still find them
                  e.preventDefault();
                  window.open(
                    "https://www.google.com/maps/search/?api=1&query=Palm+Beach+Plumbing+Contractor+Inc+Lake+Worth+Beach+FL+33460",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-4 rounded font-condensed text-xl uppercase tracking-wider font-bold transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5 fill-current" />
                {lang === "es" ? "Deje una Reseña" : "Leave a Google Review"}
              </a>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{lang === "es" ? "Llámenos directamente: " : "Call us directly: "}</span>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="text-primary font-bold hover:underline">{BUSINESS.phone}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[url('/services-bg.jpg')] opacity-10 bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-condensed font-black uppercase tracking-wide text-white mb-6">{ctaBanner.headline}</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">{ctaBanner.body}</p>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="inline-flex items-center justify-center gap-3 bg-white hover:bg-white/95 text-primary px-8 md:px-10 py-4 md:py-5 rounded font-condensed text-2xl md:text-3xl uppercase tracking-wider font-black transition-all hover:scale-105 shadow-2xl">
            <PhoneCall className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            {BUSINESS.phone}
          </a>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 md:py-24 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
              <Star className="w-4 h-4" /> {t.sectionTestimonials}
            </h2>
            <h3 className="text-4xl md:text-5xl font-condensed font-bold uppercase tracking-wide">{t.sectionTestimonialsSub}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-card border border-border p-8 rounded hover:border-white/20 transition-all duration-300 hover:-translate-y-2">
                <div className="flex gap-1 text-yellow-500 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg mb-8 leading-relaxed italic text-foreground/90">"{review.text}"</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="font-condensed font-bold text-xl uppercase tracking-wide">{review.author}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{review.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
              <PhoneCall className="w-4 h-4" /> {t.sectionGetInTouch}
            </h2>
            <h3 className="text-4xl md:text-6xl font-condensed font-bold uppercase tracking-wide mb-4">{t.sectionReadyToHelp}</h3>
            <p className="text-muted-foreground text-lg">{t.callOrText} — {BUSINESS.hours.toLowerCase()}.</p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16 ${BUSINESS.email ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="group bg-primary hover:bg-primary/90 p-8 rounded flex flex-col items-center text-center gap-4 transition-all hover:-translate-y-2 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <PhoneCall className="w-8 h-8 text-white" />
              </div>
              <div className="font-condensed text-sm font-bold uppercase tracking-widest text-white/70">{t.callUs}</div>
              <div className="font-condensed text-2xl font-black text-white uppercase tracking-wide leading-tight">{BUSINESS.phone}</div>
              <div className="text-white/60 text-sm font-medium">{t.tapToCall}</div>
            </a>
            <a href={`sms:${BUSINESS.phoneRaw}`} className="group bg-background border border-border hover:border-primary/50 p-8 rounded flex flex-col items-center text-center gap-4 transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <div className="font-condensed text-sm font-bold uppercase tracking-widest text-muted-foreground">{t.textUs}</div>
              <div className="font-condensed text-2xl font-black text-foreground uppercase tracking-wide leading-tight">{BUSINESS.phone}</div>
              <div className="text-muted-foreground text-sm font-medium">{t.tapToText}</div>
            </a>
            <a href={waLink(BUSINESS.phoneRaw, t.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="group bg-background border border-border hover:border-[#25D366]/60 p-8 rounded flex flex-col items-center text-center gap-4 transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#25D366]/20 rounded-full flex items-center justify-center">
                <FaWhatsapp className="w-8 h-8 text-[#25D366]" />
              </div>
              <div className="font-condensed text-sm font-bold uppercase tracking-widest text-muted-foreground">{t.whatsapp}</div>
              <div className="font-condensed text-2xl font-black text-foreground uppercase tracking-wide leading-tight">{BUSINESS.phone}</div>
              <div className="text-muted-foreground text-sm font-medium">{t.tapForWhatsapp}</div>
            </a>
            {BUSINESS.email && (
              <a href={`mailto:${BUSINESS.email}`} className="group bg-background border border-border hover:border-primary/50 p-8 rounded flex flex-col items-center text-center gap-4 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div className="font-condensed text-sm font-bold uppercase tracking-widest text-muted-foreground">{t.emailUs}</div>
                <div className="font-condensed text-lg font-black text-foreground tracking-wide leading-tight break-all">{BUSINESS.email}</div>
                <div className="text-muted-foreground text-sm font-medium">{t.replyHours}</div>
              </a>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-3xl mx-auto pt-10 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-background border border-border rounded flex items-center justify-center shrink-0 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">{t.serviceArea}</div>
                <div className="text-foreground font-medium">{BUSINESS.serviceArea}</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-background border border-border rounded flex items-center justify-center shrink-0 text-primary">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">{t.hours}</div>
                <div className="text-foreground font-medium">{BUSINESS.hours}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteForm />

      {/* Footer */}
      <footer className="bg-foreground text-white border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Palm Beach Plumbing Contractor Inc" className="h-12 w-auto bg-white rounded px-2 py-1" />
            </div>
            <div className="text-muted-foreground text-sm font-medium">
              &copy; {new Date().getFullYear()} {BUSINESS.name}. {t.allRightsReserved}.
            </div>
            <div className="flex gap-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <span className="hover:text-white cursor-pointer transition-colors">{t.privacy}</span>
              <span className="hover:text-white cursor-pointer transition-colors">{t.terms}</span>
              <Link href="/admin" className="hover:text-white cursor-pointer transition-colors">{t.admin}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/admin" component={AdminPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
