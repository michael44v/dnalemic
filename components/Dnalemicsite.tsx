"use client";

// app/_components/DnalemicSite.tsx
// Place this file at: app/_components/DnalemicSite.tsx
// Also add the <link> tags listed in page.tsx to your app/layout.tsx

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const BASE = "https://dnalemic.com";

const HERO_SLIDES = [
  `${BASE}/assets/img/hero/a.jpg`,
  `${BASE}/assets/img/hero/b.jpg`,
  `${BASE}/assets/img/hero/c.jpg`,
  `${BASE}/assets/img/hero/d.jpg`,
];

const NAV_LINKS = [
  { label: "About",   href: "#about"   },
  { label: "Services", href: "#services" },
  { label: "Mission", href: "#mission"  },
  { label: "Gallery", href: "#gallery"  },
  { label: "Contact", href: "#contact"  },
];

const SERVICES = [
  {
    num: "01",
    img: `${BASE}/assets/img/service/01a.jpg`,
    title: "Metering, Instrumentation & Tank Services",
    desc:  "Quality calibration, certification and routine tank, meter and prover loop instrument maintenance across Nigeria's oil sector — upstream and downstream.",
  },
  {
    num: "02",
    img: `${BASE}/assets/img/service/02.jpg`,
    title: "Interior Design & Carpentry",
    desc:  "Skilled craftsmen and tools for concrete, wood and metal designs — residential and commercial interiors executed with precision and style.",
  },
  {
    num: "03",
    img: `${BASE}/assets/img/service/03a.jpg`,
    title: "Transportation & Logistics",
    desc:  "Rental and transportation of materials and personnel for our clients, ensuring timely and safe delivery from one location to another across Nigeria.",
  },
];

const STATS_BAND = [
  { val: 45, suffix: "k+", label: "Completed Projects" },
  { val: 25, suffix: "k+", label: "Satisfied Clients"  },
  { val: 10, suffix: "+",  label: "Years of Excellence" },
  { val: 2,  suffix: "k+", label: "Awards Won", dec: 1  },
];

const WHY_STATS = [
  { icon: "fa-solid fa-layer-group",  val: 45, suffix: "k+", label: "Completed Projects" },
  { icon: "fa-regular fa-handshake",  val: 25, suffix: "k+", label: "Satisfied Clients"  },
  { icon: "fa-solid fa-trophy",       val: 2,  suffix: "k+", label: "Industry Awards", dec: 1 },
];

const CONTACT_DETAILS = [
  { icon: "fa-solid fa-location-dot", label: "Office Location",  value: "No. 7 Charles Okocha Close, Rukpakwulusi New Layout, Port Harcourt, Rivers State", type: "text"  },
  { icon: "fa-solid fa-envelope",     label: "Email Address",    value: "info@dnalemic.com", type: "email" },
  { icon: "fa-solid fa-phone",        label: "Phone",            value: "+234 8038780861 / +234 8037466700", type: "tel"   },
  { icon: "fa-regular fa-clock",      label: "Business Hours",   value: "Monday – Friday, 09:00 am – 05:00 pm", type: "text"  },
];

const GALLERY_IMGS = [
  `${BASE}/assets/img/project/7a.jpg`,
  `${BASE}/assets/img/project/1a.jpg`,
  `${BASE}/assets/img/project/5a.jpg`,
  `${BASE}/assets/img/project/4a.jpg`,
  `${BASE}/assets/img/project/2a.jpg`,
];

const TESTIMONIALS = [
  {
    init: "A", name: "Alex Johnson", loc: "Port Harcourt",
    text: "Outstanding service and expertise! The team's knowledge and dedication to accuracy have been invaluable to our projects. From calibration to maintenance, they deliver reliable solutions that keep us running efficiently and safely.",
  },
  {
    init: "R", name: "Rony Ahmed", loc: "Warri",
    text: "We couldn't be happier with DIL. Their skilled professionals went above and beyond to meet our project needs. The calibration and maintenance support was top-notch, ensuring seamless operations and total compliance.",
  },
];

const ABOUT_CHECKLIST = [
  "Metering, Instrumentation & Tank Services",
  "Civil & Construction Engineering",
  "Welding & Fabrication",
  "Transportation & Logistics Services",
  "Interior Design & Carpentry",
];

/* ─────────────────────────────────────────────
   GLOBAL CSS  (injected once into <head>)
   Keeps the component fully self-contained so
   it works without any extra .css imports.
───────────────────────────────────────────── */
const GLOBAL_CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  /* Core palette */
  --forest: #0b0b0b;          /* dark / near-black for heavy backgrounds */
  --forest-mid: #111111;     /* slightly lighter near-black (topbar / nav) */
  --charcoal: #0a0a0a;       /* primary text / headings (black) */

  /* Page background */
  --ivory: #f5efe9;          /* warm off-white page background */
  --ivory-dark: #efe7df;     /* slightly darker ivory for panels */

  /* Accent (red) - replaces previous 'copper' */
  --copper: #c62828;         /* main accent (red) */
  --copper-light: #e53935;   /* hover / lighter accent */

  /* Muted text / borders */
  --text-mid: #2d2d2d;       /* paragraph text on ivory */
  --text-muted: #6d6d6d;     /* muted text */
  --border: rgba(0,0,0,0.06);/* light border suitable on ivory */

  /* Utility colors (if used elsewhere) */
  --sage: #2f2f2f;
}

html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; color: var(--charcoal); background: var(--ivory); overflow-x: hidden; }

/* PRELOADER */
.dnl-preloader { position:fixed; inset:0; background:var(--forest); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:9999; transition:opacity 0.8s ease,visibility 0.8s ease; }
.dnl-preloader.hidden { opacity:0; visibility:hidden; pointer-events:none; }
.pre-logo { width:130px; margin-bottom:48px; animation:preLogoIn 0.6s 0.3s ease both; }
@keyframes preLogoIn { from{opacity:0} to{opacity:1} }
.pre-ring { width:48px; height:48px; border-radius:50%; border:2px solid rgba(255,255,255,0.1); border-top-color:var(--copper); animation:spin 0.9s linear infinite; }
@keyframes spin { to{transform:rotate(360deg)} }
.pre-tagline { position:absolute; bottom:48px; color:rgba(255,255,255,0.25); font-size:0.72rem; letter-spacing:0.2em; text-transform:uppercase; }

/* TOPBAR */
.dnl-topbar { background:var(--forest-mid); padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
.topbar-inner { max-width:1280px; margin:0 auto; padding:0 32px; display:flex; justify-content:space-between; align-items:center; }
.topbar-left { display:flex; gap:28px; align-items:center; }
.topbar-item { display:flex; align-items:center; gap:7px; color:rgba(255,255,255,0.5); font-size:0.76rem; }
.topbar-item i { color:var(--copper); font-size:0.7rem; }
.topbar-social { display:flex; gap:16px; }
.topbar-social a { color:rgba(255,255,255,0.4); font-size:0.75rem; text-decoration:none; transition:color 0.2s; }
.topbar-social a:hover { color:var(--copper-light); }

/* NAVBAR */
.dnl-nav { background:var(--ivory); border-bottom:1px solid var(--border); position:sticky; top:0; z-index:990; transition:box-shadow 0.3s,background 0.3s; }
.dnl-nav.scrolled { box-shadow:0 2px 32px rgba(11,40,24,0.1); background:rgba(250,247,242,0.97); backdrop-filter:blur(12px); }
.nav-inner { max-width:1280px; margin:0 auto; padding:0 32px; height:76px; display:flex; align-items:center; justify-content:space-between; }
.nav-logo img { height:42px; }
.nav-links-list { display:flex; gap:40px; list-style:none; }
.nav-links-list a { text-decoration:none; color:var(--text-mid); font-size:0.85rem; font-weight:500; position:relative; padding-bottom:3px; transition:color 0.2s; }
.nav-links-list a::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1.5px; background:var(--copper); transition:width 0.25s; }
.nav-links-list a:hover { color:var(--copper); }
.nav-links-list a:hover::after { width:100%; }
.nav-cta { background:var(--copper); color:#fff; text-decoration:none; padding:11px 26px; font-size:0.8rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; border-radius:3px; transition:background 0.2s,transform 0.15s; }
.nav-cta:hover { background:var(--copper-light); transform:translateY(-1px); }
.hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
.hamburger span { width:22px; height:1.5px; background:var(--charcoal); display:block; transition:all 0.3s; }
.mobile-nav { display:none; flex-direction:column; background:var(--ivory); border-bottom:1px solid var(--border); padding:8px 32px 20px; }
.mobile-nav.open { display:flex; }
.mobile-nav a { text-decoration:none; color:var(--text-mid); padding:13px 0; font-size:0.9rem; font-weight:500; border-bottom:1px solid var(--border); }

/* HERO */
.dnl-hero { position:relative; height:100vh; min-height:640px; display:flex; align-items:center; overflow:hidden; }
.hero-bg { position:absolute; inset:0; z-index:0; }
.hero-bg-slide { position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transition:opacity 1.2s ease; }
.hero-bg-slide.active { opacity:1; }
.hero-bg-overlay { position:absolute; inset:0; z-index:1; background:linear-gradient(105deg,rgba(11,40,24,0.88) 0%,rgba(11,40,24,0.65) 55%,rgba(11,40,24,0.3) 100%); }
.hero-watermark { position:absolute; z-index:1; right:-40px; bottom:-60px; font-family:'Cormorant Garamond',serif; font-size:clamp(10rem,18vw,22rem); font-weight:700; color:rgba(255,255,255,0.035); line-height:1; letter-spacing:-0.02em; pointer-events:none; user-select:none; transform:rotate(-8deg); white-space:nowrap; }
.hero-content { position:relative; z-index:2; max-width:1280px; margin:0 auto; padding:0 32px; width:100%; }
.hero-tag { display:inline-flex; align-items:center; gap:12px; margin-bottom:28px; }
.hero-tag-line { width:40px; height:1px; background:var(--copper); }
.hero-tag span { color:var(--copper-light); font-size:0.75rem; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; }
.hero-h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(3rem,6.5vw,6rem); color:#fff; line-height:1.08; font-weight:600; max-width:700px; margin-bottom:28px; }
.hero-h1 em { font-style:italic; color:rgba(255,255,255,0.55); }
.hero-sub { color:rgba(255,255,255,0.55); font-size:1rem; line-height:1.75; max-width:480px; margin-bottom:44px; font-weight:300; }
.hero-actions { display:flex; gap:16px; flex-wrap:wrap; align-items:center; }
.hero-scroll-hint { position:absolute; bottom:36px; left:50%; transform:translateX(-50%); z-index:3; display:flex; flex-direction:column; align-items:center; gap:8px; }
.hero-scroll-hint span { color:rgba(255,255,255,0.3); font-size:0.7rem; letter-spacing:0.15em; text-transform:uppercase; }
.scroll-line { width:1px; height:48px; background:linear-gradient(to bottom,rgba(255,255,255,0.3),transparent); animation:scrollPulse 2s ease-in-out infinite; }
@keyframes scrollPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
.hero-slide-nav { position:absolute; right:32px; bottom:36px; z-index:3; display:flex; flex-direction:column; gap:8px; }
.dot-btn { width:6px; height:6px; border-radius:50%; border:none; background:rgba(255,255,255,0.3); cursor:pointer; padding:0; transition:background 0.2s,transform 0.2s; }
.dot-btn.active { background:var(--copper); transform:scale(1.5); }

/* BUTTONS */
.btn-copper { background:var(--copper); color:#fff; text-decoration:none; padding:15px 36px; font-weight:600; font-size:0.82rem; letter-spacing:0.08em; text-transform:uppercase; border-radius:3px; display:inline-flex; align-items:center; gap:10px; transition:background 0.2s,transform 0.2s; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; }
.btn-copper:hover { background:var(--copper-light); transform:translateY(-2px); }
.btn-ghost-light { color:rgba(255,255,255,0.8); text-decoration:none; padding:15px 36px; font-weight:500; font-size:0.82rem; letter-spacing:0.08em; text-transform:uppercase; border-radius:3px; border:1px solid rgba(255,255,255,0.25); transition:border-color 0.2s,background 0.2s; display:inline-flex; align-items:center; gap:10px; }
.btn-ghost-light:hover { border-color:var(--copper-light); background:rgba(184,92,56,0.12); }
.btn-outline-dark { border:1.5px solid var(--charcoal); color:var(--charcoal); text-decoration:none; padding:12px 28px; font-size:0.78rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; border-radius:3px; transition:background 0.2s,color 0.2s,border-color 0.2s; display:inline-flex; align-items:center; gap:8px; }
.btn-outline-dark:hover { background:var(--charcoal); color:var(--ivory); }

/* SHARED */
.container { max-width:1280px; margin:0 auto; padding:0 32px; }
.label-pill { display:inline-flex; align-items:center; gap:10px; margin-bottom:20px; }
.label-pill .dot { width:8px; height:8px; border-radius:50%; background:var(--copper); flex-shrink:0; }
.label-pill span { font-size:0.72rem; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--copper); }
.display-heading { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,3.5vw,3.2rem); line-height:1.18; color:var(--charcoal); font-weight:600; margin-bottom:24px; }
.display-heading em { color:var(--copper); font-style:italic; }
.display-heading.light { color:var(--ivory); }
.display-heading.light em { color:var(--copper-light); }

/* STATS BAND */
.stats-band { background:var(--forest); padding:64px 0; }
.stats-band-inner { max-width:1280px; margin:0 auto; padding:0 32px; display:grid; grid-template-columns:repeat(4,1fr); border-left:1px solid rgba(255,255,255,0.06); }
.stat-cell { padding:0 48px; border-right:1px solid rgba(255,255,255,0.06); text-align:center; }
.stat-big { font-family:'Cormorant Garamond',serif; font-size:4rem; font-weight:700; color:var(--ivory); line-height:1; display:block; margin-bottom:8px; }
.stat-big sup { font-size:1.8rem; vertical-align:super; color:var(--copper); }
.stat-cell p { color:rgba(255,255,255,0.38); font-size:0.75rem; letter-spacing:0.12em; text-transform:uppercase; }

/* ABOUT */
.about-section { background:var(--ivory); padding:112px 0; }
.about-inner { display:grid; grid-template-columns:5fr 7fr; gap:80px; align-items:center; }
.about-text p { color:var(--text-mid); font-size:0.95rem; line-height:1.85; margin-bottom:16px; font-weight:300; }
.about-checklist { list-style:none; margin-top:28px; display:flex; flex-direction:column; gap:13px; }
.about-checklist li { display:flex; align-items:center; gap:14px; font-size:0.9rem; color:var(--charcoal); font-weight:500; }
.about-checklist li::before { content:''; width:20px; height:20px; flex-shrink:0; border-radius:50%; background:rgba(184,92,56,0.1) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 6l3 3 5-5' stroke='%23B85C38' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center/14px; }
.about-images { position:relative; }
.about-stack { display:grid; grid-template-columns:1fr 1fr; grid-template-rows:auto auto; gap:12px; }
.about-stack img { width:100%; display:block; object-fit:cover; }
.about-stack img:nth-child(1) { grid-row:span 2; height:480px; border-radius:2px 2px 0 0; }
.about-stack img:nth-child(2) { height:230px; border-radius:0 2px 0 0; }
.about-stack img:nth-child(3) { height:234px; border-radius:0 0 2px 0; }
.about-badge { position:absolute; bottom:-20px; left:-20px; background:var(--copper); color:#fff; padding:20px 24px; border-radius:2px; box-shadow:0 16px 48px rgba(184,92,56,0.35); }
.about-badge strong { font-family:'Cormorant Garamond',serif; font-size:2.4rem; font-weight:700; line-height:1; display:block; }
.about-badge span { font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; opacity:0.85; margin-top:2px; display:block; }

/* SERVICES */
.services-section { background:var(--ivory-dark); padding:112px 0; }
.section-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:56px; flex-wrap:wrap; gap:20px; }
.services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.svc-card { background:var(--ivory); border:1px solid var(--border); border-radius:4px; overflow:hidden; transition:box-shadow 0.3s,transform 0.3s; display:flex; flex-direction:column; }
.svc-card:hover { box-shadow:0 20px 60px rgba(11,40,24,0.1); transform:translateY(-6px); }
.svc-card-img { height:220px; overflow:hidden; position:relative; }
.svc-card-img img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.6s; }
.svc-card:hover .svc-card-img img { transform:scale(1.06); }
.svc-card-img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(11,40,24,0.5) 0%,transparent 60%); }
.svc-card-body { padding:32px; flex:1; display:flex; flex-direction:column; }
.svc-number { font-family:'Cormorant Garamond',serif; font-size:0.85rem; color:var(--copper); font-weight:600; letter-spacing:0.12em; margin-bottom:12px; }
.svc-card-body h3 { font-family:'Cormorant Garamond',serif; font-size:1.45rem; color:var(--charcoal); line-height:1.3; margin-bottom:14px; font-weight:600; }
.svc-card-body p { color:var(--text-muted); font-size:0.88rem; line-height:1.75; flex:1; font-weight:300; }
.svc-link { display:inline-flex; align-items:center; gap:8px; margin-top:24px; color:var(--copper); font-size:0.8rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none; transition:gap 0.2s; }
.svc-card:hover .svc-link { gap:14px; }

/* MISSION */
.mv-section { background:var(--forest); padding:112px 0; overflow:hidden; position:relative; }
.mv-pattern { position:absolute; inset:0; opacity:0.03; background-image:repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px); }
.mv-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; position:relative; z-index:1; }
.mv-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:32px; transition:background 0.3s,border-color 0.3s; margin-bottom:20px; }
.mv-card:last-child { margin-bottom:0; }
.mv-card:hover { background:rgba(184,92,56,0.08); border-color:rgba(184,92,56,0.2); }
.mv-card-icon { width:40px; height:40px; background:rgba(184,92,56,0.15); border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:16px; color:var(--copper); font-size:1rem; }
.mv-card h4 { font-family:'Cormorant Garamond',serif; font-size:1.3rem; color:var(--ivory); font-weight:600; margin-bottom:12px; }
.mv-card p { color:rgba(255,255,255,0.45); font-size:0.9rem; line-height:1.75; font-weight:300; }
.mv-right { position:relative; }
.mv-right img { width:100%; height:520px; object-fit:cover; border-radius:4px; display:block; }
.mv-right-badge { position:absolute; top:32px; left:-24px; background:var(--copper); padding:20px 28px; border-radius:4px; box-shadow:0 12px 40px rgba(0,0,0,0.3); }
.mv-right-badge i { color:#fff; font-size:1.4rem; margin-bottom:8px; display:block; }
.mv-right-badge p { color:rgba(255,255,255,0.85); font-size:0.78rem; font-weight:500; letter-spacing:0.06em; text-transform:uppercase; max-width:120px; line-height:1.4; }

/* CTA */
.cta-band { background:var(--ivory-dark); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
.cta-inner { display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; padding:72px 0; }
.cta-inner h2 { font-family:'Cormorant Garamond',serif; color:var(--charcoal); font-size:clamp(1.8rem,3vw,2.8rem); font-weight:600; max-width:540px; line-height:1.2; }
.cta-inner h2 em { font-style:italic; color:var(--copper); }

/* WHY US */
.why-section { background:var(--ivory); padding:112px 0; }
.why-inner { display:grid; grid-template-columns:7fr 5fr; gap:80px; align-items:center; }
.why-image-wrap { position:relative; }
.why-main-img { width:100%; height:520px; object-fit:cover; border-radius:4px; display:block; }
.why-thumb { position:absolute; bottom:-28px; right:-28px; width:220px; height:160px; object-fit:cover; border-radius:4px; border:5px solid var(--ivory); box-shadow:0 16px 48px rgba(0,0,0,0.15); }
.why-text p { color:var(--text-mid); font-size:0.95rem; line-height:1.85; margin:20px 0 40px; font-weight:300; }
.why-stat-row { display:flex; align-items:center; gap:20px; padding:20px 24px; background:var(--ivory-dark); border-radius:4px; border:1px solid var(--border); transition:border-color 0.2s; margin-bottom:16px; }
.why-stat-row:last-child { margin-bottom:0; }
.why-stat-row:hover { border-color:var(--copper); }
.why-stat-icon { width:44px; height:44px; background:rgba(184,92,56,0.1); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--copper); font-size:1rem; flex-shrink:0; }
.why-stat-text strong { font-family:'Cormorant Garamond',serif; font-size:1.7rem; color:var(--charcoal); font-weight:700; line-height:1; }
.why-stat-text strong sup { font-size:1rem; color:var(--copper); }
.why-stat-text span { display:block; font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.1em; margin-top:3px; }

/* TESTIMONIALS */
.testi-section { background:var(--ivory-dark); padding:112px 0; }
.testi-head { text-align:center; margin-bottom:56px; }
.testi-head .label-pill { justify-content:center; }
.testi-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
.testi-card { background:var(--ivory); border:1px solid var(--border); border-radius:4px; padding:40px; transition:box-shadow 0.3s; }
.testi-card:hover { box-shadow:0 12px 40px rgba(11,40,24,0.08); }
.testi-stars { color:var(--copper); font-size:0.8rem; letter-spacing:3px; margin-bottom:20px; }
.testi-card p { font-family:'Cormorant Garamond',serif; font-size:1.2rem; color:var(--text-mid); line-height:1.65; font-style:italic; margin-bottom:28px; }
.testi-person { display:flex; align-items:center; gap:14px; border-top:1px solid var(--border); padding-top:20px; }
.testi-avatar { width:42px; height:42px; border-radius:50%; background:linear-gradient(135deg,var(--forest),var(--sage)); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:1.1rem; color:#fff; font-weight:700; flex-shrink:0; }
.testi-person h4 { font-size:0.88rem; font-weight:600; color:var(--charcoal); }
.testi-person span { font-size:0.78rem; color:var(--text-muted); }

/* GALLERY */
.gallery-section { background:var(--ivory); padding:112px 0; }
.gallery-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:40px; flex-wrap:wrap; gap:20px; }
.gallery-mosaic { display:grid; grid-template-columns:repeat(12,1fr); grid-template-rows:220px 220px; gap:8px; }
.gm-item { overflow:hidden; position:relative; border-radius:3px; }
.gm-item:nth-child(1) { grid-column:span 5; grid-row:span 2; }
.gm-item:nth-child(2) { grid-column:span 4; }
.gm-item:nth-child(3) { grid-column:span 3; }
.gm-item:nth-child(4) { grid-column:span 3; }
.gm-item:nth-child(5) { grid-column:span 4; }
.gm-item img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.6s ease; }
.gm-item:hover img { transform:scale(1.06); }
.gm-overlay { position:absolute; inset:0; background:rgba(11,40,24,0.35); opacity:0; transition:opacity 0.3s; display:flex; align-items:center; justify-content:center; }
.gm-item:hover .gm-overlay { opacity:1; }
.gm-overlay i { color:#fff; font-size:1.2rem; }

/* CONTACT */
.contact-section { background:var(--forest); padding:112px 0; }
.contact-inner { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
.contact-left > p { color:rgba(255,255,255,0.45); font-size:0.93rem; line-height:1.8; margin:20px 0 40px; font-weight:300; }
.cdetail-list { display:flex; flex-direction:column; gap:16px; }
.cdetail { display:flex; align-items:flex-start; gap:16px; padding:20px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); border-radius:4px; transition:border-color 0.2s; }
.cdetail:hover { border-color:rgba(184,92,56,0.3); }
.cdetail-icon { width:40px; height:40px; background:rgba(184,92,56,0.15); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--copper); flex-shrink:0; }
.cdetail-body label { display:block; font-size:0.7rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.12em; margin-bottom:4px; }
.cdetail-body a,.cdetail-body p { color:rgba(255,255,255,0.7); font-size:0.9rem; text-decoration:none; }
.cdetail-body a:hover { color:var(--copper-light); }
.contact-form-card { background:var(--ivory); border-radius:6px; padding:44px; box-shadow:0 24px 80px rgba(0,0,0,0.3); }
.contact-form-card h3 { font-family:'Cormorant Garamond',serif; font-size:1.6rem; color:var(--charcoal); margin-bottom:28px; font-weight:600; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.fg { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
.fg label { font-size:0.72rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; color:var(--text-mid); }
.fg input,.fg textarea { border:1.5px solid var(--border); border-radius:4px; padding:12px 14px; font-family:'DM Sans',sans-serif; font-size:0.9rem; color:var(--charcoal); background:var(--ivory); outline:none; resize:vertical; transition:border-color 0.2s,box-shadow 0.2s; }
.fg input:focus,.fg textarea:focus { border-color:var(--copper); box-shadow:0 0 0 3px rgba(184,92,56,0.1); }
.fg textarea { min-height:120px; }

/* FOOTER */
.dnl-footer { background:var(--charcoal); padding:72px 0 0; }
.footer-grid { display:grid; grid-template-columns:1.6fr 1fr 1fr; gap:64px; padding-bottom:56px; border-bottom:1px solid rgba(255,255,255,0.06); }
.footer-brand img { height:40px; margin-bottom:20px; display:block; }
.footer-brand p { color:rgba(255,255,255,0.35); font-size:0.86rem; line-height:1.75; max-width:280px; font-weight:300; }
.footer-socials { display:flex; gap:10px; margin-top:24px; }
.footer-socials a { width:36px; height:36px; border:1px solid rgba(255,255,255,0.1); border-radius:4px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.35); font-size:0.8rem; text-decoration:none; transition:all 0.2s; }
.footer-socials a:hover { border-color:var(--copper); color:var(--copper); }
.footer-col-title { font-size:0.76rem; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.5); margin-bottom:20px; }
.footer-links { list-style:none; display:flex; flex-direction:column; gap:10px; }
.footer-links a { text-decoration:none; color:rgba(255,255,255,0.3); font-size:0.87rem; transition:color 0.2s; display:flex; align-items:center; gap:8px; font-weight:300; }
.footer-links a i { font-size:0.4rem; color:var(--copper); }
.footer-links a:hover { color:var(--copper-light); }
.footer-info-item { display:flex; align-items:flex-start; gap:12px; margin-bottom:14px; }
.footer-info-item i { color:var(--copper); font-size:0.75rem; margin-top:5px; flex-shrink:0; }
.footer-info-item span { color:rgba(255,255,255,0.3); font-size:0.85rem; line-height:1.6; font-weight:300; }
.footer-bottom { padding:20px 0; display:flex; justify-content:space-between; align-items:center; color:rgba(255,255,255,0.2); font-size:0.78rem; flex-wrap:wrap; gap:10px; }
.footer-bottom em { color:var(--copper); font-style:normal; }

/* BACK TO TOP */
.back-top { position:fixed; bottom:28px; right:28px; z-index:900; width:44px; height:44px; border-radius:4px; border:none; background:var(--copper); color:#fff; cursor:pointer; font-size:0.85rem; opacity:0; visibility:hidden; transition:all 0.3s; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 24px rgba(184,92,56,0.4); }
.back-top.show { opacity:1; visibility:visible; }
.back-top:hover { background:var(--copper-light); transform:translateY(-3px); }

/* RESPONSIVE */
@media (max-width:1024px) {
  .stats-band-inner { grid-template-columns:repeat(2,1fr); }
  .stat-cell { border-bottom:1px solid rgba(255,255,255,0.06); padding:32px; }
  .about-inner,.mv-grid,.why-inner,.contact-inner { grid-template-columns:1fr; gap:48px; }
  .why-image-wrap { order:-1; }
  .why-thumb { right:8px; bottom:8px; }
  .services-grid { grid-template-columns:1fr 1fr; }
  .footer-grid { grid-template-columns:1fr 1fr; }
  .testi-grid { grid-template-columns:1fr; }
}
@media (max-width:768px) {
  .nav-links-list,.nav-cta { display:none; }
  .hamburger { display:flex; }
  .topbar-left { display:none; }
  .hero-h1 { font-size:2.8rem; }
  .services-grid { grid-template-columns:1fr; }
  .about-stack { grid-template-columns:1fr; }
  .about-stack img:nth-child(1) { height:300px; grid-row:auto; }
  .about-stack img:nth-child(2),.about-stack img:nth-child(3) { height:200px; }
  .gallery-mosaic { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
  .gm-item { grid-column:span 1 !important; grid-row:span 1 !important; height:180px; }
  .contact-inner { grid-template-columns:1fr; }
  .contact-form-card { padding:28px; }
  .footer-grid { grid-template-columns:1fr; gap:36px; }
  .footer-bottom { flex-direction:column; text-align:center; }
  .form-row { grid-template-columns:1fr; }
  .section-head { flex-direction:column; align-items:flex-start; }
  .hero-scroll-hint { display:none; }
  .cta-inner { justify-content:center; text-align:center; }
}
`;

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function LabelPill({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="label-pill">
      <div className="dot" style={light ? { background: "var(--copper)" } : {}} />
      <span style={light ? { color: "var(--copper-light)" } : {}}>{text}</span>
    </div>
  );
}

function CounterNum({ target, dec = 0, suffix }: { target: number; dec?: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref     = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const steps = 2000 / 16;
        const inc   = target / steps;
        let v = 0;
        const t = setInterval(() => {
          v += inc;
          if (v >= target) { v = target; clearInterval(t); }
          setVal(dec > 0 ? parseFloat(v.toFixed(dec)) : Math.floor(v));
        }, 16);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, dec]);

  return (
    <span ref={ref}>
      {dec > 0 ? val.toFixed(dec) : val}
      <sup>{suffix}</sup>
    </span>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function DnalemicSite() {
  const [preloaderHidden, setPreloaderHidden] = useState(false);
  const [scrolled,        setScrolled]        = useState(false);
  const [showBackTop,     setShowBackTop]     = useState(false);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [currentSlide,    setCurrentSlide]    = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Inject global CSS + AOS script once on mount */
  useEffect(() => {
    if (!document.getElementById("dnl-global-css")) {
      const style = document.createElement("style");
      style.id    = "dnl-global-css";
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }

    const aosScript    = document.createElement("script");
    aosScript.src      = "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js";
    aosScript.onload   = () => (window as any).AOS?.init({ duration: 750, easing: "ease-out-quart", once: true, offset: 50 });
    document.body.appendChild(aosScript);

    return () => { document.body.removeChild(aosScript); };
  }, []);

  /* Preloader */
  useEffect(() => {
    const t = setTimeout(() => setPreloaderHidden(true), 2400);
    return () => clearTimeout(t);
  }, []);

  /* Scroll */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Hero slider */
  const goTo = useCallback((n: number) => {
    setCurrentSlide((n + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => goTo(currentSlide + 1), 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [currentSlide, goTo]);

  return (
    <>
      {/* PRELOADER */}
      <div className={`dnl-preloader${preloaderHidden ? " hidden" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/assets/img/logo/dnl.png`} alt="Dnalemic" className="pre-logo" />
        <div className="pre-ring" />
        <p className="pre-tagline">Engineering Precision Since 2014</p>
      </div>

      {/* TOPBAR */}
      <div className="dnl-topbar">
  <div className="topbar-inner">
    <div className="topbar-brand">Dnalemic Groups</div>

    <div className="topbar-left">
      <div className="topbar-item">
        <i className="fa-regular fa-clock" /> Mon – Fri &nbsp;09:00 am – 06:00 pm
      </div>
      <div className="topbar-item">
        <i className="fa-solid fa-envelope" /> info@dnalemic.com
      </div>
      <div className="topbar-item">
        <i className="fa-solid fa-phone" /> +234 8038780861
      </div>
    </div>

    <div className="topbar-social">
      <a href="#" aria-label="facebook"><i className="fab fa-facebook-f" /></a>
      <a href="#" aria-label="twitter"><i className="fab fa-twitter" /></a>
      <a href="#" aria-label="linkedin"><i className="fab fa-linkedin-in" /></a>
    </div>
  </div>
</div>
      {/* NAVBAR */}
      <nav className={`dnl-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo">
            <a href="https://dnalemic.com/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/assets/img/logo/dnl.png`} alt="Dnalemic" />
            </a>
          </div>
          <ul className="nav-links-list">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
          <a href="#contact" className="nav-cta">Get a Quote</a>
          <button className="hamburger" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
        <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="dnl-hero">
        <div className="hero-bg">
          {HERO_SLIDES.map((src, i) => (
            <div key={i} className={`hero-bg-slide${i === currentSlide ? " active" : ""}`}
              style={{ backgroundImage: `url('${src}')` }} />
          ))}
          <div className="hero-bg-overlay" />
        </div>
        <div className="hero-watermark">EST.2014</div>
        <div className="hero-content">
          <div className="hero-tag" data-aos="fade-right" data-aos-delay="100">
            <div className="hero-tag-line" /><span>Indigenous Engineering Excellence</span>
          </div>
          <h1 className="hero-h1" data-aos="fade-up" data-aos-delay="200">
            Built for<br />Nigeria&apos;s <em>Energy</em><br />Future
          </h1>
          <p className="hero-sub" data-aos="fade-up" data-aos-delay="300">
            Metering, instrumentation, civil engineering and logistics — delivered with precision by a team of
            internationally-trained Nigerian engineers since 2014.
          </p>
          <div className="hero-actions" data-aos="fade-up" data-aos-delay="400">
            <a href="#services" className="btn-copper">Our Services <i className="fa-regular fa-arrow-right" /></a>
            <a href="#contact" className="btn-ghost-light">Get in Touch</a>
          </div>
        </div>
        <div className="hero-scroll-hint"><span>Scroll</span><div className="scroll-line" /></div>
        <div className="hero-slide-nav">
          {HERO_SLIDES.map((_, i) => (
            <button key={i}
              className={`dot-btn${i === currentSlide ? " active" : ""}`}
              onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); goTo(i); }} />
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <div className="stats-band">
        <div className="stats-band-inner">
          {STATS_BAND.map((s, i) => (
            <div className="stat-cell" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="stat-big"><CounterNum target={s.val} dec={s.dec ?? 0} suffix={s.suffix} /></span>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-inner">
            <div className="about-text" data-aos="fade-right">
              <LabelPill text="Who We Are" />
              <h2 className="display-heading">An Indigenous Engineering Company <em>You Can Trust</em></h2>
              <p>DNALEMIC INTERNATIONAL LIMITED is incorporated with the Corporate Affairs Commission, Abuja Nigeria (June 30, 2014) as a limited liability company aimed at providing advance planning techniques and engineering technology across Nigeria&apos;s downstream and upstream oil &amp; gas sectors.</p>
              <p>Our team carries internationally-recognised expertise across planning, supervision and execution of major projects — giving us a decisive edge in meeting project deadlines to our clients&apos; exact specifications.</p>
              <ul className="about-checklist">
                {ABOUT_CHECKLIST.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="about-images" data-aos="fade-left" data-aos-delay="100">
              <div className="about-stack">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}/assets/img/about/01a.jpg`} alt="About Dnalemic" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}/assets/img/about/02a.jpg`} alt="Field work" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}/assets/img/skills/01a.jpg`} alt="Skills" />
              </div>
              <div className="about-badge"><strong>10+</strong><span>Years of Excellence</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <LabelPill text="What We Offer" />
              <h2 className="display-heading" data-aos="fade-up">Our Core <em>Services</em></h2>
            </div>
            <a href="#contact" className="btn-outline-dark" data-aos="fade-left">
              Request a Quote <i className="fa-regular fa-arrow-right" />
            </a>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className="svc-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="svc-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.title} />
                  <div className="svc-card-img-overlay" />
                </div>
                <div className="svc-card-body">
                  <div className="svc-number">— {s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <a href="#contact" className="svc-link">Enquire <i className="fa-regular fa-arrow-right" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mv-section" id="mission">
        <div className="mv-pattern" />
        <div className="container">
          <div className="mv-grid">
            <div data-aos="fade-right">
              <LabelPill text="Our Direction" light />
              <h2 className="display-heading light" style={{ marginBottom: 40 }}>
                Guided by a Clear <em>Mission &amp; Vision</em>
              </h2>
              <div className="mv-card">
                <div className="mv-card-icon"><i className="fa-solid fa-bullseye" /></div>
                <h4>Our Mission</h4>
                <p>To be recognised globally as a leader in Civil, Mechanical and infrastructure development — improving quality of life and sustaining economic growth across Nigeria and beyond.</p>
              </div>
              <div className="mv-card">
                <div className="mv-card-icon"><i className="fa-solid fa-eye" /></div>
                <h4>Our Vision</h4>
                <p>To provide quality, innovative, specialised and efficient services to our clients at the most competitive rates — with a firm commitment to safety and the general wellbeing of the environment.</p>
              </div>
            </div>
            <div className="mv-right" data-aos="fade-left" data-aos-delay="100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/assets/img/skills/03a.jpg`} alt="Vision" />
              <div className="mv-right-badge">
                <i className="fa-solid fa-award" />
                <p>Quality Engineering Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-inner">
            <h2 data-aos="fade-right">Need reliable <em>engineering solutions</em> for your next project?</h2>
            <a href="#contact" className="btn-copper" data-aos="fade-left">Contact Us Today <i className="fa-regular fa-arrow-right" /></a>
          </div>
        </div>
      </div>

      {/* WHY US */}
      <section className="why-section" id="why">
        <div className="container">
          <div className="why-inner">
            <div className="why-image-wrap" data-aos="fade-right">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="why-main-img" src={`${BASE}/assets/img/skills/02a.jpg`} alt="Why Dnalemic" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="why-thumb" src={`${BASE}/assets/img/ach.jpg`} alt="Achievement" />
            </div>
            <div className="why-text" data-aos="fade-left" data-aos-delay="100">
              <LabelPill text="Why Choose Us" />
              <h2 className="display-heading">Services That Meet the <em>Highest Standards</em></h2>
              <p>We have a team of highly skilled personnel with international-calibre expertise drawn from various disciplines — spanning planning, supervision and execution of major projects. Our reputation for quality engineering excellence, combined with financial strength and a seasoned workforce, positions us ahead of the competition.</p>
              <div>
                {WHY_STATS.map((s, i) => (
                  <div className="why-stat-row" key={i}>
                    <div className="why-stat-icon"><i className={s.icon} /></div>
                    <div className="why-stat-text">
                      <strong><CounterNum target={s.val} dec={s.dec ?? 0} suffix={s.suffix} /></strong>
                      <span>{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section" id="testimonials">
        <div className="container">
          <div className="testi-head">
            <LabelPill text="Testimonials" />
            <h2 className="display-heading" data-aos="fade-up">What Our Clients <em>Say About Us</em></h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testi-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="testi-stars">★★★★★</div>
                <p>&ldquo;{t.text}&rdquo;</p>
                <div className="testi-person">
                  <div className="testi-avatar">{t.init}</div>
                  <div><h4>{t.name}</h4><span>{t.loc}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="gallery-head">
            <div>
              <LabelPill text="Our Projects" />
              <h2 className="display-heading" data-aos="fade-up">Explore Our <em>Gallery</em></h2>
            </div>
            <a href={`${BASE}/gallery`} className="btn-outline-dark" data-aos="fade-left">
              View All Projects <i className="fa-regular fa-arrow-right" />
            </a>
          </div>
          <div className="gallery-mosaic">
            {GALLERY_IMGS.map((src, i) => (
              <div className="gm-item" key={i} data-aos="fade-up" data-aos-delay={i * 60}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Project ${i + 1}`} />
                <div className="gm-overlay"><i className="fa-solid fa-expand" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-inner">
            <div className="contact-left" data-aos="fade-right">
              <LabelPill text="Get in Touch" light />
              <h2 className="display-heading light">Let&apos;s Build Something <em>Great Together</em></h2>
              <p>Our personnel are conversant with the latest certified calibration equipment and maintenance techniques. We are driven towards providing first-class services to every valued client — safely and efficiently.</p>
              <div className="cdetail-list">
                {CONTACT_DETAILS.map((d, i) => (
                  <div className="cdetail" key={i}>
                    <div className="cdetail-icon"><i className={d.icon} /></div>
                    <div className="cdetail-body">
                      <label>{d.label}</label>
                      {d.type === "email" ? <a href={`mailto:${d.value}`}>{d.value}</a>
                       : d.type === "tel"   ? <a href="tel:+2348038780861">{d.value}</a>
                       :                      <p>{d.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-form-card" data-aos="fade-left" data-aos-delay="100">
              <h3>Send Us a Message</h3>
              <form action="https://dnalemic.com/contact_process.php" method="POST">
                <input type="hidden" name="mailer" value="info@dnalemic.com" />
                <div className="form-row">
                  <div className="fg"><label>Full Name</label><input type="text" name="name" placeholder="John Doe" required /></div>
                  <div className="fg"><label>Email Address</label><input type="email" name="email" placeholder="john@email.com" required /></div>
                </div>
                <div className="form-row">
                  <div className="fg"><label>Phone Number</label><input type="text" name="phone" placeholder="+234 ..." /></div>
                  <div className="fg"><label>Subject</label><input type="text" name="subject" placeholder="How can we help?" /></div>
                </div>
                <div className="fg"><label>Message</label><textarea name="message" placeholder="Tell us about your project..." /></div>
                <button type="submit" name="submit" className="btn-copper" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                  Send Message <i className="fas fa-long-arrow-right" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="dnl-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/assets/img/logo/dnl.png`} alt="Dnalemic" />
              <p>An indigenous metering, instrumentation and tank service multifaceted engineering company serving Nigeria&apos;s energy sector since 2014.</p>
              <div className="footer-socials">
                <a href="#"><i className="fab fa-facebook-f" /></a>
                <a href="#"><i className="fab fa-twitter" /></a>
                <a href="#"><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>
            <div>
              <p className="footer-col-title">Quick Links</p>
              <ul className="footer-links">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}><a href={l.href}><i className="fa-solid fa-circle" /> {l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="footer-col-title">Contact Info</p>
              <div className="footer-info-item"><i className="fa-solid fa-location-dot" /><span>7 Charles Okocha Close, Rukpakwulusi New Layout, Port Harcourt</span></div>
              <div className="footer-info-item"><i className="fa-solid fa-envelope" /><span>info@dnalemic.com</span></div>
              <div className="footer-info-item"><i className="fa-solid fa-phone" /><span>+234 8038780861<br />+234 8037466700</span></div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2024 <em>Dnalemic International Limited</em>. All Rights Reserved.</span>
            <span>Incorporated in Nigeria · CAC June 2014</span>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button
        className={`back-top${showBackTop ? " show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <i className="fa-regular fa-arrow-up" />
      </button>
    </>
  );
}