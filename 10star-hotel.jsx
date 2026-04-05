import { useState, useEffect, useRef } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Didact+Gothic&family=Cinzel:wght@400;500&display=swap');
`;

const STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --ivory: #FAF8F4;
    --black: #0C0C0B;
    --gold: #B8966A;
    --gold-light: #D4B896;
    --charcoal: #1A1814;
    --warm-gray: #8C8880;
    --off-white: #F2EFE8;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--ivory); color: var(--black); font-family: 'Didact Gothic', sans-serif; overflow-x: hidden; }
  .cinzel { font-family: 'Cinzel', serif; }
  .cormorant { font-family: 'Cormorant Garamond', serif; }
  
  /* NAV */
  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; transition: all 0.6s ease; }
  nav.scrolled { background: rgba(12,12,11,0.94); backdrop-filter: blur(12px); padding: 18px 48px; }
  .nav-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: 0.35em; color: #fff; text-transform: uppercase; }
  .nav-links { display: flex; gap: 40px; }
  .nav-link { font-family: 'Didact Gothic', sans-serif; font-size: 11px; letter-spacing: 0.2em; color: rgba(255,255,255,0.75); text-transform: uppercase; text-decoration: none; transition: color 0.3s; cursor: pointer; }
  .nav-link:hover { color: var(--gold-light); }
  .nav-cta { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.25em; color: var(--gold-light); border: 1px solid rgba(184,150,106,0.5); padding: 10px 22px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
  .nav-cta:hover { background: rgba(184,150,106,0.15); border-color: var(--gold-light); }

  /* HERO */
  .hero { position: relative; width: 100%; height: 100vh; overflow: hidden; background: var(--charcoal); }
  .hero-bg { position: absolute; inset: 0; background-image: url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=85'); background-size: cover; background-position: center; transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(12,12,11,0.3) 0%, rgba(12,12,11,0.15) 40%, rgba(12,12,11,0.65) 100%); }
  .hero-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 0 10%; padding-bottom: 80px; }
  .hero-eyebrow { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.45em; color: var(--gold-light); text-transform: uppercase; margin-bottom: 20px; opacity: 0; transform: translateY(20px); transition: all 1s ease 0.3s; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 7vw, 92px); font-weight: 300; color: #fff; line-height: 1.05; margin-bottom: 24px; opacity: 0; transform: translateY(30px); transition: all 1s ease 0.55s; }
  .hero-subtitle { font-family: 'Didact Gothic', sans-serif; font-size: 13px; letter-spacing: 0.18em; color: rgba(255,255,255,0.6); text-transform: uppercase; margin-bottom: 48px; opacity: 0; transform: translateY(20px); transition: all 1s ease 0.75s; }
  .hero-scroll { display: flex; align-items: center; gap: 16px; cursor: pointer; opacity: 0; transition: opacity 1s ease 1s; }
  .hero-scroll-line { width: 48px; height: 1px; background: var(--gold); }
  .hero-scroll-text { font-size: 10px; letter-spacing: 0.3em; color: rgba(255,255,255,0.5); text-transform: uppercase; }
  .hero-loaded .hero-eyebrow, .hero-loaded .hero-title, .hero-loaded .hero-subtitle, .hero-loaded .hero-scroll { opacity: 1; transform: none; }
  .hero-pause-tag { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); background: rgba(12,12,11,0.85); border: 1px solid rgba(184,150,106,0.4); padding: 36px 52px; text-align: center; opacity: 0; transition: all 0.8s ease; pointer-events: none; backdrop-filter: blur(4px); }
  .hero-pause-tag.visible { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  .hero-pause-main { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 4vw, 48px); color: #fff; font-weight: 300; font-style: italic; margin-bottom: 12px; }
  .hero-pause-sub { font-size: 11px; letter-spacing: 0.25em; color: var(--gold-light); text-transform: uppercase; }

  /* SECTIONS */
  section { padding: 100px 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }

  /* STORY */
  .story { background: var(--ivory); }
  .story-top { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-bottom: 80px; }
  .story-label { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.45em; color: var(--gold); text-transform: uppercase; margin-bottom: 20px; }
  .story-headline { font-family: 'Cormorant Garamond', serif; font-size: clamp(38px, 4.5vw, 58px); font-weight: 300; line-height: 1.15; color: var(--charcoal); }
  .story-headline em { font-style: italic; color: var(--gold); }
  .story-body { font-size: 15px; line-height: 1.85; color: var(--warm-gray); margin-top: 24px; letter-spacing: 0.02em; }
  .story-image { position: relative; height: 480px; overflow: hidden; }
  .story-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
  .story-image:hover img { transform: scale(1.04); }
  .story-cities { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(0,0,0,0.08); border-top: 1px solid rgba(0,0,0,0.08); }
  .story-city { background: var(--ivory); padding: 40px 28px; text-align: center; transition: background 0.4s; cursor: default; }
  .story-city:hover { background: var(--charcoal); }
  .story-city:hover .city-name, .story-city:hover .city-desc { color: #fff; }
  .story-city:hover .city-name { color: var(--gold-light); }
  .city-name { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--charcoal); margin-bottom: 8px; transition: color 0.4s; }
  .city-desc { font-size: 12px; letter-spacing: 0.1em; color: var(--warm-gray); text-transform: uppercase; transition: color 0.4s; }

  /* GALLERY */
  .gallery { background: var(--charcoal); padding: 100px 0; }
  .gallery-header { text-align: center; margin-bottom: 60px; }
  .gallery-label { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.45em; color: var(--gold); text-transform: uppercase; margin-bottom: 16px; }
  .gallery-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 52px); font-weight: 300; color: #fff; }
  .gallery-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 280px 280px; gap: 4px; padding: 0 48px; }
  .gallery-item { overflow: hidden; position: relative; cursor: pointer; }
  .gallery-item:first-child { grid-row: span 2; }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
  .gallery-item:hover img { transform: scale(1.06); }
  .gallery-item-overlay { position: absolute; inset: 0; background: rgba(12,12,11,0); transition: background 0.4s; display: flex; align-items: flex-end; padding: 24px; }
  .gallery-item:hover .gallery-item-overlay { background: rgba(12,12,11,0.4); }
  .gallery-item-label { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.3em; color: #fff; text-transform: uppercase; opacity: 0; transform: translateY(10px); transition: all 0.4s; }
  .gallery-item:hover .gallery-item-label { opacity: 1; transform: none; }

  /* ROOMS */
  .rooms { background: var(--off-white); padding: 100px 0; }
  .rooms-header { margin-bottom: 60px; }
  .rooms-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .room-card { position: relative; overflow: hidden; background: #fff; cursor: pointer; }
  .room-image { height: 320px; overflow: hidden; }
  .room-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
  .room-card:hover .room-image img { transform: scale(1.05); }
  .room-info { padding: 28px 28px 32px; border-top: 1px solid rgba(0,0,0,0.06); }
  .room-category { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 10px; }
  .room-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: var(--charcoal); margin-bottom: 8px; }
  .room-desc { font-size: 13px; color: var(--warm-gray); line-height: 1.7; margin-bottom: 20px; }
  .room-footer { display: flex; justify-content: space-between; align-items: center; }
  .room-price { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: var(--charcoal); }
  .room-price span { font-size: 13px; font-family: 'Didact Gothic', sans-serif; color: var(--warm-gray); }
  .room-btn { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.25em; color: var(--gold); border: 1px solid rgba(184,150,106,0.4); padding: 10px 18px; text-transform: uppercase; transition: all 0.3s; }
  .room-btn:hover { background: var(--gold); color: #fff; border-color: var(--gold); }

  /* EXPERIENCE */
  .experience { background: var(--ivory); }
  .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  .exp-left { padding-right: 64px; display: flex; flex-direction: column; justify-content: center; }
  .exp-services { margin-top: 48px; display: flex; flex-direction: column; gap: 0; }
  .exp-service { padding: 24px 0; border-top: 1px solid rgba(0,0,0,0.08); display: flex; gap: 24px; align-items: flex-start; transition: all 0.3s; cursor: default; }
  .exp-service:last-child { border-bottom: 1px solid rgba(0,0,0,0.08); }
  .exp-service-num { font-family: 'Cinzel', serif; font-size: 11px; color: var(--gold); letter-spacing: 0.1em; min-width: 28px; margin-top: 2px; }
  .exp-service-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: var(--charcoal); margin-bottom: 4px; }
  .exp-service-desc { font-size: 13px; color: var(--warm-gray); line-height: 1.65; }
  .exp-right { display: grid; grid-template-rows: 1fr 1fr; gap: 2px; }
  .exp-img { overflow: hidden; }
  .exp-img img { width: 100%; height: 100%; object-fit: cover; min-height: 280px; transition: transform 0.7s ease; }
  .exp-img:hover img { transform: scale(1.04); }

  /* TESTIMONIALS */
  .testimonials { background: var(--charcoal); padding: 100px 0; }
  .test-header { text-align: center; margin-bottom: 60px; }
  .test-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 52px); font-weight: 300; color: #fff; margin-top: 16px; }
  .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; padding: 0 48px; }
  .test-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); padding: 40px 36px; transition: all 0.4s; }
  .test-card:hover { background: rgba(184,150,106,0.06); border-color: rgba(184,150,106,0.2); }
  .test-quote-mark { font-family: 'Cormorant Garamond', serif; font-size: 64px; color: var(--gold); line-height: 0.6; margin-bottom: 28px; font-weight: 300; }
  .test-text { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-style: italic; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 32px; font-weight: 300; }
  .test-divider { width: 32px; height: 1px; background: var(--gold); margin-bottom: 20px; }
  .test-name { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.25em; color: var(--gold-light); text-transform: uppercase; margin-bottom: 4px; }
  .test-meta { font-size: 11px; color: rgba(255,255,255,0.35); letter-spacing: 0.1em; }

  /* BOOKING */
  .booking { background: var(--ivory); }
  .booking-inner { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: start; }
  .booking-left { padding-top: 8px; }
  .booking-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 4.5vw, 60px); font-weight: 300; color: var(--charcoal); line-height: 1.1; margin-bottom: 24px; }
  .booking-title em { font-style: italic; color: var(--gold); }
  .booking-desc { font-size: 14px; color: var(--warm-gray); line-height: 1.8; margin-bottom: 40px; }
  .booking-promise { display: flex; flex-direction: column; gap: 16px; }
  .booking-promise-item { display: flex; align-items: center; gap: 16px; }
  .promise-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .promise-text { font-size: 12px; letter-spacing: 0.12em; color: var(--warm-gray); text-transform: uppercase; }
  .booking-form { background: #fff; padding: 48px 44px; border: 1px solid rgba(0,0,0,0.06); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
  .form-group:last-of-type { margin-bottom: 0; }
  .form-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.35em; color: var(--warm-gray); text-transform: uppercase; }
  .form-input { border: none; border-bottom: 1px solid rgba(0,0,0,0.12); padding: 10px 0; font-family: 'Cormorant Garamond', serif; font-size: 16px; color: var(--charcoal); background: transparent; outline: none; transition: border-color 0.3s; }
  .form-input:focus { border-bottom-color: var(--gold); }
  .form-input::placeholder { color: rgba(0,0,0,0.2); }
  textarea.form-input { resize: none; min-height: 80px; }
  .form-submit { margin-top: 36px; width: 100%; background: var(--charcoal); color: #fff; border: none; padding: 18px; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; cursor: pointer; transition: background 0.3s; }
  .form-submit:hover { background: var(--gold); }

  /* FOOTER */
  footer { background: var(--charcoal); padding: 64px 0 32px; border-top: 1px solid rgba(255,255,255,0.04); }
  .footer-inner { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 56px; }
  .footer-brand-name { font-family: 'Cinzel', serif; font-size: 16px; letter-spacing: 0.4em; color: #fff; text-transform: uppercase; margin-bottom: 16px; }
  .footer-brand-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 15px; color: rgba(255,255,255,0.35); line-height: 1.6; }
  .footer-col-title { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 20px; }
  .footer-col-links { display: flex; flex-direction: column; gap: 10px; }
  .footer-col-link { font-size: 12px; letter-spacing: 0.08em; color: rgba(255,255,255,0.4); cursor: pointer; transition: color 0.3s; }
  .footer-col-link:hover { color: rgba(255,255,255,0.8); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 28px; display: flex; justify-content: space-between; align-items: center; }
  .footer-copy { font-size: 11px; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; }
  .footer-gold-line { display: flex; align-items: center; gap: 12px; }
  .fgl { width: 32px; height: 1px; background: rgba(184,150,106,0.3); }
  .footer-tagline2 { font-family: 'Cormorant Garamond', serif; font-size: 13px; color: rgba(184,150,106,0.5); font-style: italic; }

  /* SECTION HEADERS shared */
  .section-label { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.45em; color: var(--gold); text-transform: uppercase; margin-bottom: 16px; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 52px); font-weight: 300; color: var(--charcoal); }
  .section-title.light { color: #fff; }

  /* PAGE TABS */
  .page-tabs { display: flex; gap: 0; border-bottom: 1px solid rgba(0,0,0,0.08); margin-bottom: 48px; }
  .page-tab { padding: 0 0 16px; margin-right: 40px; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--warm-gray); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.3s; }
  .page-tab.active { color: var(--charcoal); border-bottom-color: var(--gold); }

  /* SCROLL ANIMATION */
  .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .fade-up.visible { opacity: 1; transform: none; }
  .fade-up-d1 { transition-delay: 0.1s; }
  .fade-up-d2 { transition-delay: 0.2s; }
  .fade-up-d3 { transition-delay: 0.3s; }

  @media (max-width: 900px) {
    nav { padding: 20px 24px; }
    .nav-links { display: none; }
    .container { padding: 0 24px; }
    .story-top, .booking-inner, .exp-grid { grid-template-columns: 1fr; gap: 40px; }
    .story-cities, .rooms-grid, .test-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
    .gallery-item:first-child { grid-row: span 1; }
    .footer-inner { grid-template-columns: 1fr 1fr; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80", label: "Signature Suite" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80", label: "Grand Lobby" },
  { src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=700&q=80", label: "Infinity Pool" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80", label: "Gastronomie" },
  { src: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=700&q=80", label: "Spa Retreat" },
];

const rooms = [
  { cat: "Deluxe", name: "Ivory Room", desc: "Clean lines, a private terrace, and curated local art set the tone for understated luxury.", price: "4,200", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80" },
  { cat: "Prestige", name: "Garden Suite", desc: "Floor-to-ceiling views of lush Moroccan gardens, with a sunken bath and personal butler.", price: "8,500", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=700&q=80" },
  { cat: "Ultimate", name: "Royal Penthouse", desc: "An entire floor, a rooftop terrace, private pool, and 24-hour personal concierge.", price: "22,000", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=700&q=80" },
];

const testimonials = [
  { name: "Alexander Laurent", meta: "Paris · 3 Stays", text: "This hotel did not just redefine luxury for me — it erased every comparison I had before. Every breath of air felt intentional.", stars: 5 },
  { name: "Sofia Bennett", meta: "London · 5 Stays", text: "From the valet's first glance to the last cup of Moroccan tea on checkout morning, nothing was ever less than perfect.", stars: 5 },
  { name: "James Carter", meta: "New York · 2 Stays", text: "I have stayed in the finest hotels on four continents. This is the only place where I forgot what day it was.", stars: 5 },
];

const cities = [
  { name: "Casablanca", desc: "Urban Prestige" },
  { name: "Marrakech", desc: "Desert Poetry" },
  { name: "Tangier", desc: "Atlantic Soul" },
  { name: "Ifrane", desc: "Mountain Serenity" },
];

export default function HotelWebsite() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [showPauseTag, setShowPauseTag] = useState(false);
  const [heroBgScale, setHeroBgScale] = useState(1);
  const heroRef = useRef(null);
  const fadeRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 300);
    const pauseTimer = setTimeout(() => setShowPauseTag(true), 2200);
    const hideTimer = setTimeout(() => setShowPauseTag(false), 5000);

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const heroH = heroRef.current?.offsetHeight || window.innerHeight;
      if (y < heroH) {
        const progress = y / heroH;
        setHeroBgScale(1 + progress * 0.18);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });

    fadeRefs.current.forEach(el => { if (el) observer.observe(el); });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer); clearTimeout(pauseTimer); clearTimeout(hideTimer);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [page]);

  const addFadeRef = (el) => { if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el); };

  const scrollTo = (id) => {
    setPage("home");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <>
      <style>{FONTS + STYLES}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo" onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer" }}>
          10 Star Hotel
        </div>
        <div className="nav-links">
          {["home", "rooms", "experience"].map(p => (
            <span key={p} className="nav-link" onClick={() => setPage(p)} style={{ color: page === p ? "var(--gold-light)" : undefined }}>
              {p}
            </span>
          ))}
          <span className="nav-link" onClick={() => scrollTo("booking")}>Reservations</span>
        </div>
        <div className="nav-cta" onClick={() => scrollTo("booking")}>Book Now</div>
      </nav>

      {page === "home" && (
        <>
          {/* HERO */}
          <section ref={heroRef} className="hero">
            <div className="hero-bg" style={{ transform: `scale(${heroBgScale})` }} />
            <div className="hero-overlay" />
            <div className={`hero-content ${heroLoaded ? "hero-loaded" : ""}`}>
              <div className="hero-eyebrow">Casablanca · Marrakech · Tangier · Ifrane</div>
              <div className="hero-title">Where every<br /><em>arrival</em> is<br />a memory.</div>
              <div className="hero-subtitle">Morocco's most distinguished collection of estates</div>
              <div className="hero-scroll" onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}>
                <div className="hero-scroll-line" />
                <div className="hero-scroll-text">Discover</div>
              </div>
            </div>
            <div className={`hero-pause-tag ${showPauseTag ? "visible" : ""}`}>
              <div className="hero-pause-main">This is how your journey begins</div>
              <div className="hero-pause-sub">Before your guests step in… they feel everything</div>
            </div>
          </section>

          {/* STORY */}
          <section className="story" id="story">
            <div className="container">
              <div className="story-top">
                <div>
                  <div className="story-label fade-up" ref={addFadeRef}>Our Story</div>
                  <div className="story-headline fade-up fade-up-d1" ref={addFadeRef}>
                    From <em>Casablanca</em> to Ifrane,<br />we don't just host guests —<br />we <em>create moments.</em>
                  </div>
                  <p className="story-body fade-up fade-up-d2" ref={addFadeRef}>
                    Born from the belief that a hotel is not a building but a feeling, the 10 Star Collection was conceived by architects, artists, and Moroccan poets. Each property is a distinct world, connected only by an obsession with the extraordinary.
                    <br /><br />
                    Our guests do not check in. They arrive.
                  </p>
                </div>
                <div className="story-image fade-up fade-up-d1" ref={addFadeRef}>
                  <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80" alt="Lobby" />
                </div>
              </div>
            </div>
            <div className="story-cities">
              {cities.map(c => (
                <div key={c.name} className="story-city">
                  <div className="city-name">{c.name}</div>
                  <div className="city-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* GALLERY */}
          <section className="gallery" id="gallery">
            <div className="gallery-header fade-up" ref={addFadeRef}>
              <div className="gallery-label">Visual Story</div>
              <div className="gallery-title cormorant">Spaces That Breathe</div>
            </div>
            <div className="gallery-grid">
              {galleryItems.map((item, i) => (
                <div key={i} className="gallery-item fade-up" ref={addFadeRef} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <img src={item.src} alt={item.label} loading="lazy" />
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-label">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="testimonials" id="testimonials">
            <div className="test-header fade-up" ref={addFadeRef}>
              <div className="gallery-label">Guest Voices</div>
              <div className="test-title cormorant">Words Left Behind</div>
            </div>
            <div className="test-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="test-card fade-up" ref={addFadeRef} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="test-quote-mark">"</div>
                  <p className="test-text">{t.text}</p>
                  <div className="test-divider" />
                  <div className="test-name">{t.name}</div>
                  <div className="test-meta">{t.meta}</div>
                </div>
              ))}
            </div>
          </section>

          {/* BOOKING */}
          <section className="booking" id="booking">
            <div className="container">
              <div className="booking-inner">
                <div className="booking-left fade-up" ref={addFadeRef}>
                  <div className="section-label">Reservations</div>
                  <div className="booking-title">Book Your<br /><em>Experience</em></div>
                  <p className="booking-desc">
                    Each reservation is personally attended to by our concierge team. We tailor every stay — from your welcome ritual to your departure arrangement.
                  </p>
                  <div className="booking-promise">
                    {["Complimentary airport transfer", "Personal welcome ceremony", "Dedicated concierge 24/7", "Flexible cancellation policy"].map(p => (
                      <div key={p} className="booking-promise-item">
                        <div className="promise-dot" />
                        <div className="promise-text">{p}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="booking-form fade-up fade-up-d1" ref={addFadeRef}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" type="text" placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input" type="tel" placeholder="+212 …" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Guests</label>
                      <input className="form-input" type="number" placeholder="2" min="1" max="20" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Arrival Date</label>
                      <input className="form-input" type="date" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Departure Date</label>
                      <input className="form-input" type="date" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Special Requests</label>
                    <textarea className="form-input" placeholder="Tell us how to make your stay extraordinary…" rows="3" />
                  </div>
                  <button className="form-submit">Request Reservation</button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {page === "rooms" && (
        <section className="rooms" style={{ paddingTop: 140 }}>
          <div className="container">
            <div className="rooms-header">
              <div className="section-label">Accommodations</div>
              <div className="section-title">Our Rooms & Suites</div>
              <div className="page-tabs" style={{ marginTop: 32 }}>
                {["All Rooms", "Deluxe", "Suites", "Penthouses"].map(t => (
                  <div key={t} className={`page-tab ${t === "All Rooms" ? "active" : ""}`}>{t}</div>
                ))}
              </div>
            </div>
            <div className="rooms-grid">
              {rooms.map((r, i) => (
                <div key={i} className="room-card fade-up" ref={addFadeRef}>
                  <div className="room-image"><img src={r.img} alt={r.name} loading="lazy" /></div>
                  <div className="room-info">
                    <div className="room-category">{r.cat}</div>
                    <div className="room-name">{r.name}</div>
                    <div className="room-desc">{r.desc}</div>
                    <div className="room-footer">
                      <div className="room-price">MAD {r.price} <span>/ night</span></div>
                      <div className="room-btn" onClick={() => scrollTo("booking")}>Reserve</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === "experience" && (
        <section className="experience" style={{ paddingTop: 140 }}>
          <div className="container">
            <div className="exp-grid">
              <div className="exp-left">
                <div className="section-label fade-up" ref={addFadeRef}>The 10 Star Life</div>
                <div className="section-title fade-up fade-up-d1" ref={addFadeRef}>Beyond the<br /><em>Ordinary</em></div>
                <div className="exp-services">
                  {[
                    { num: "01", name: "Rituel Spa", desc: "A sanctuary of silence. Hammam, argan rituals, and bespoke treatments drawn from Moroccan healing traditions." },
                    { num: "02", name: "Aqua Terrace", desc: "Rooftop infinity pools overlooking the medina skyline, open until midnight under the stars." },
                    { num: "03", name: "Gastronomie", desc: "Seven-course tasting menus crafted by Michelin-trained chefs using ingredients from our own organic gardens." },
                    { num: "04", name: "Atelier & Arts", desc: "Private cooking classes, calligraphy workshops, and curated cultural tours of the city's hidden quarters." },
                  ].map(s => (
                    <div key={s.num} className="exp-service fade-up" ref={addFadeRef}>
                      <div className="exp-service-num">{s.num}</div>
                      <div>
                        <div className="exp-service-name">{s.name}</div>
                        <div className="exp-service-desc">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="exp-right">
                <div className="exp-img"><img src="https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=700&q=80" alt="Spa" /></div>
                <div className="exp-img"><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80" alt="Restaurant" /></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div>
              <div className="footer-brand-name">10 Star Hotel</div>
              <div className="footer-brand-tagline">"We don't just host guests —<br />we create moments."</div>
            </div>
            {[
              { title: "Navigate", links: ["Home", "Rooms", "Experience", "Gallery"] },
              { title: "Destinations", links: ["Casablanca", "Marrakech", "Tangier", "Ifrane"] },
              { title: "Contact", links: ["+212 5XX-XXXXXX", "hello@10star.ma", "Reserve Online", "Concierge"] },
            ].map(col => (
              <div key={col.title}>
                <div className="footer-col-title">{col.title}</div>
                <div className="footer-col-links">
                  {col.links.map(l => <div key={l} className="footer-col-link">{l}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2026 10 Star Hotel Collection. All rights reserved.</div>
            <div className="footer-gold-line">
              <div className="fgl" />
              <div className="footer-tagline2">Crafted with intention</div>
              <div className="fgl" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
