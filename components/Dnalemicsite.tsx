"use client";

// app/_components/DnalemicSite.tsx
// Place this file at: app/_components/DnalemicSite.tsx
//
// Add these to your app/layout.tsx <head> (fonts + icons):
//
// <link rel="preconnect" href="https://fonts.googleapis.com" />
// <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anyhow" />
// <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const BASE = "https://dnalemic.com";
const BRAND_FULL  = "Dnalemic International";
const BRAND_SHORT = "Dnalemic International";

const HERO_SLIDES = [
  `${BASE}/assets/img/hero/a.jpg`,
  `${BASE}/assets/img/hero/b.jpg`,
  `${BASE}/assets/img/hero/c.jpg`,
  `${BASE}/assets/img/hero/d.jpg`,
];

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Services",  href: "#services" },
  { label: "Mission",  href: "#mission"  },
  { label: "Gallery",  href: "#gallery"  },
  { label: "Contact",  href: "#contact"  },
];

const SERVICES = [
  {
    tag: "MET·01",
    img: `${BASE}/assets/img/service/01a.jpg`,
    title: "Metering, Instrumentation & Tank Services",
    desc:  "Quality calibration, certification and routine tank, meter and prover loop instrument maintenance across Nigeria's oil sector — upstream and downstream.",
  },
  {
    tag: "INT·02",
    img: `${BASE}/assets/img/service/02.jpg`,
    title: "Interior Design & Carpentry",
    desc:  "Skilled craftsmen and tools for concrete, wood and metal designs — residential and commercial interiors executed with precision and style.",
  },
  {
    tag: "LOG·03",
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
  { icon: "fa-solid fa-layer-group", val: 45, suffix: "k+", label: "Completed Projects" },
  { icon: "fa-regular fa-handshake", val: 25, suffix: "k+", label: "Satisfied Clients"  },
  { icon: "fa-solid fa-trophy",      val: 2,  suffix: "k+", label: "Industry Awards", dec: 1 },
];

const CONTACT_DETAILS = [
  { icon: "fa-solid fa-location-dot", label: "Office Location", value: "No. 7 Charles Okocha Close, Rukpakwulusi New Layout, Port Harcourt, Rivers State", type: "text"  },
  { icon: "fa-solid fa-envelope",     label: "Email Address",   value: "info@dnalemic.com", type: "email" },
  { icon: "fa-solid fa-phone",        label: "Phone",           value: "+234 8038780861 / +234 8037466700", type: "tel"   },
  { icon: "fa-regular fa-clock",      label: "Business Hours",  value: "Monday – Friday, 09:00 am – 05:00 pm", type: "text"  },
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
    init: "A", name: "Alex Johnson", loc: "Port Harcourt", rating: 5.0,
    text: "Outstanding service and expertise! The team's knowledge and dedication to accuracy have been invaluable to our projects. From calibration to maintenance, they deliver reliable solutions that keep us running efficiently and safely.",
  },
  {
    init: "R", name: "Rony Ahmed", loc: "Warri", rating: 4.9,
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
   Design system: "Calibration / Blueprint" —
   grounded in the company's actual trade
   (metering & instrumentation): deep blueprint
   navy, drafting-paper neutrals, an instrument
   amber accent, monospace data readouts, and a
   recurring crosshair/tick "registration mark"
   motif borrowed from technical drawings.
───────────────────────────────────────────── */
const GLOBAL_CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  /* Blueprint darks */
  --blueprint: #0B2036;
  --blueprint-mid: #102A45;
  --blueprint-deep: #071626;

  /* Paper / light surfaces */
  --paper: #F2F4F2;
  --paper-dim: #E9EDE9;
  --paper-line: #DCE3E0;

  /* Ink / text */
  --ink: #10202E;
  --text-mid: #2D3F4D;
  --text-muted: #647585;

  /* Instrument accent */
  --amber: #E5A23A;
  --amber-deep: #C77F1F;
  --amber-soft: rgba(229,162,58,0.12);

  --border: rgba(16,32,46,0.1);
  --border-dark: rgba(255,255,255,0.09);
}

html { scroll-behavior: smooth; }
body { font-family: 'Inter', sans-serif; color: var(--ink); background: var(--paper); overflow-x: hidden; font-weight: 400; }
h1,h2,h3,h4 { font-family:'Space Grotesk', sans-serif; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--amber); outline-offset: 3px; border-radius: 2px;
}

/* PRELOADER */
.dnl-preloader { position:fixed; inset:0; background:var(--blueprint-deep); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:9999; transition:opacity 0.7s ease,visibility 0.7s ease; }
.dnl-preloader.hidden { opacity:0; visibility:hidden; pointer-events:none; }
.pre-text { display:flex; gap:0.1em; margin-bottom:30px; }
.pre-text span { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:clamp(3rem,8vw,4.6rem); line-height:1; color:#fff; letter-spacing:-0.01em; opacity:0; transform:translateY(18px); animation:preLetterIn 0.65s ease forwards; }
.pre-text span.accent { color:var(--amber); }
.pre-text span:nth-child(1) { animation-delay:0.15s; }
.pre-text span:nth-child(2) { animation-delay:0.32s; }
.pre-text span:nth-child(3) { animation-delay:0.49s; }
@keyframes preLetterIn { to{ opacity:1; transform:translateY(0); } }
.pre-rule { width:0; height:1px; background:var(--amber); margin-bottom:34px; animation:preRuleIn 0.7s 0.85s ease forwards; }
@keyframes preRuleIn { to{ width:96px; } }
.pre-ring { width:40px; height:40px; border-radius:50%; border:2px solid rgba(255,255,255,0.1); border-top-color:var(--amber); animation:spin 0.9s linear infinite; }
@keyframes spin { to{transform:rotate(360deg)} }
.pre-tagline { position:absolute; bottom:44px; color:rgba(255,255,255,0.3); font-family:'IBM Plex Mono',monospace; font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; }

/* TOPBAR */
.dnl-topbar { background:var(--blueprint-deep); padding:9px 0; border-bottom:1px solid var(--border-dark); }
.topbar-inner { max-width:1280px; margin:0 auto; padding:0 32px; display:flex; justify-content:space-between; align-items:center; }
.topbar-brand { font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.55); margin-right:18px; }
.topbar-left { display:flex; gap:28px; align-items:center; }
.topbar-item { display:flex; align-items:center; gap:7px; color:rgba(255,255,255,0.5); font-size:0.76rem; font-family:'IBM Plex Mono',monospace; }
.topbar-item i { color:var(--amber); font-size:0.7rem; }
.topbar-social { display:flex; gap:16px; }
.topbar-social a { color:rgba(255,255,255,0.4); font-size:0.75rem; text-decoration:none; transition:color 0.2s; }
.topbar-social a:hover { color:var(--amber); }

/* NAVBAR */
.dnl-nav { background:var(--paper); border-bottom:1px solid var(--border); position:sticky; top:0; z-index:990; transition:box-shadow 0.3s,background 0.3s; }
.dnl-nav.scrolled { box-shadow:0 2px 28px rgba(11,32,54,0.1); background:rgba(242,244,242,0.96); backdrop-filter:blur(12px); }
.nav-inner { max-width:1280px; margin:0 auto; padding:0 32px; height:74px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
.brand-logo { display:flex; align-items:center; gap:12px; text-decoration:none; }
.nav-logo img { height:40px; display:block; }
.mobile-brand { display:none; font-family:'Space Grotesk',sans-serif; font-weight:700; color:var(--ink); font-size:1.02rem; letter-spacing:-0.01em; white-space:nowrap; }
.nav-links-list { display:flex; gap:38px; list-style:none; }
.nav-links-list a { text-decoration:none; color:var(--text-mid); font-size:0.85rem; font-weight:500; position:relative; padding-bottom:3px; transition:color 0.2s; }
.nav-links-list a::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background:var(--amber); transition:width 0.25s; }
.nav-links-list a:hover { color:var(--ink); }
.nav-links-list a:hover::after { width:100%; }
.nav-cta { background:var(--amber); color:var(--blueprint-deep); text-decoration:none; padding:11px 24px; font-size:0.78rem; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; border-radius:2px; transition:background 0.2s,transform 0.15s; flex-shrink:0; }
.nav-cta:hover { background:var(--amber-deep); color:#fff; transform:translateY(-1px); }
.hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; flex-shrink:0; }
.hamburger span { width:22px; height:2px; background:var(--ink); display:block; transition:all 0.3s; }
.mobile-nav { display:none; flex-direction:column; background:var(--paper); border-bottom:1px solid var(--border); padding:8px 32px 20px; }
.mobile-nav.open { display:flex; }
.mobile-nav a { text-decoration:none; color:var(--text-mid); padding:13px 0; font-size:0.92rem; font-weight:500; border-bottom:1px solid var(--border); }

/* HERO */
.dnl-hero { position:relative; height:100vh; min-height:640px; display:flex; align-items:center; overflow:hidden; background:var(--blueprint); }
.hero-bg { position:absolute; inset:0; z-index:0; }
.hero-bg-slide { position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transition:opacity 1.2s ease; }
.hero-bg-slide.active { opacity:1; }
.hero-bg-overlay { position:absolute; inset:0; z-index:1; background:linear-gradient(100deg,rgba(7,22,38,0.93) 0%,rgba(7,22,38,0.74) 50%,rgba(7,22,38,0.32) 100%); }
.hero-grid { position:absolute; inset:0; z-index:1; opacity:0.05; pointer-events:none; background-image:repeating-linear-gradient(0deg,transparent,transparent 54px,rgba(255,255,255,1) 54px,rgba(255,255,255,1) 55px),repeating-linear-gradient(90deg,transparent,transparent 54px,rgba(255,255,255,1) 54px,rgba(255,255,255,1) 55px); }
.hero-edge-label { position:absolute; z-index:2; right:28px; top:50%; transform:translateY(-50%) rotate(90deg); transform-origin:right center; font-family:'IBM Plex Mono',monospace; font-size:0.7rem; letter-spacing:0.32em; text-transform:uppercase; color:rgba(255,255,255,0.28); white-space:nowrap; }
.hero-corner { position:absolute; z-index:2; width:34px; height:34px; opacity:0.55; }
.hero-corner.tl { top:32px; left:32px; }
.hero-content { position:relative; z-index:3; max-width:1280px; margin:0 auto; padding:0 32px; width:100%; }
.hero-tag { display:inline-flex; align-items:center; gap:12px; margin-bottom:26px; }
.hero-tag-line { width:34px; height:1px; background:var(--amber); }
.hero-tag span { color:var(--amber); font-family:'IBM Plex Mono',monospace; font-size:0.73rem; font-weight:500; letter-spacing:0.22em; text-transform:uppercase; }
.hero-h1 { font-size:clamp(2.7rem,6vw,5.4rem); color:#fff; line-height:1.06; font-weight:700; max-width:720px; margin-bottom:26px; letter-spacing:-0.02em; }
.hero-h1 em { font-style:normal; color:var(--amber); }
.hero-sub { color:rgba(255,255,255,0.58); font-size:1rem; line-height:1.75; max-width:480px; margin-bottom:42px; font-weight:300; }
.hero-actions { display:flex; gap:14px; flex-wrap:wrap; align-items:center; }
.hero-scroll-hint { position:absolute; bottom:34px; left:32px; z-index:3; display:flex; align-items:center; gap:10px; }
.hero-scroll-hint span { color:rgba(255,255,255,0.35); font-family:'IBM Plex Mono',monospace; font-size:0.66rem; letter-spacing:0.18em; text-transform:uppercase; }
.scroll-line { width:38px; height:1px; background:rgba(255,255,255,0.35); position:relative; overflow:hidden; }
.scroll-line::after { content:''; position:absolute; inset:0; background:var(--amber); animation:scrollPulse 1.8s ease-in-out infinite; }
@keyframes scrollPulse { 0%{transform:translateX(-100%)} 50%{transform:translateX(0)} 100%{transform:translateX(100%)} }
.hero-slide-nav { position:absolute; right:32px; bottom:34px; z-index:3; display:flex; flex-direction:column; gap:10px; align-items:flex-end; }
.tick-btn { width:18px; height:2px; border:none; background:rgba(255,255,255,0.3); cursor:pointer; padding:0; transition:background 0.2s,width 0.2s; }
.tick-btn.active { background:var(--amber); width:30px; }

/* BUTTONS */
.btn-amber { background:var(--amber); color:var(--blueprint-deep); text-decoration:none; padding:15px 32px; font-weight:700; font-size:0.8rem; letter-spacing:0.04em; text-transform:uppercase; border-radius:2px; display:inline-flex; align-items:center; gap:10px; transition:background 0.2s,transform 0.2s,color 0.2s; border:none; cursor:pointer; font-family:'Inter',sans-serif; }
.btn-amber:hover { background:var(--amber-deep); color:#fff; transform:translateY(-2px); }
.btn-ghost-light { color:rgba(255,255,255,0.85); text-decoration:none; padding:15px 32px; font-weight:500; font-size:0.8rem; letter-spacing:0.04em; text-transform:uppercase; border-radius:2px; border:1px solid rgba(255,255,255,0.28); transition:border-color 0.2s,background 0.2s; display:inline-flex; align-items:center; gap:10px; }
.btn-ghost-light:hover { border-color:var(--amber); background:rgba(229,162,58,0.1); }
.btn-outline-dark { border:1.5px solid var(--ink); color:var(--ink); text-decoration:none; padding:12px 26px; font-size:0.76rem; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; border-radius:2px; transition:background 0.2s,color 0.2s,border-color 0.2s; display:inline-flex; align-items:center; gap:8px; }
.btn-outline-dark:hover { background:var(--ink); color:var(--paper); }

/* SHARED */
.container { max-width:1280px; margin:0 auto; padding:0 32px; }
.label-pill { display:inline-flex; align-items:center; gap:9px; margin-bottom:18px; }
.label-pill .dot { width:7px; height:7px; background:var(--amber); flex-shrink:0; }
.label-pill span { font-family:'IBM Plex Mono',monospace; font-size:0.72rem; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--amber-deep); }
.label-pill.on-dark span { color:var(--amber); }
.display-heading { font-size:clamp(1.9rem,3.3vw,3rem); line-height:1.16; color:var(--ink); font-weight:700; margin-bottom:22px; letter-spacing:-0.015em; }
.display-heading em { color:var(--amber-deep); font-style:normal; }
.display-heading.light { color:var(--paper); }
.display-heading.light em { color:var(--amber); }

/* STATS BAND */
.stats-band { background:var(--blueprint-deep); padding:60px 0; }
.stats-band-inner { max-width:1280px; margin:0 auto; padding:0 32px; display:grid; grid-template-columns:repeat(4,1fr); border-left:1px solid var(--border-dark); }
.stat-cell { padding:0 44px; border-right:1px solid var(--border-dark); text-align:left; }
.stat-tick { width:18px; height:1px; background:var(--amber); margin-bottom:14px; }
.stat-big { font-family:'IBM Plex Mono',monospace; font-size:3rem; font-weight:600; color:var(--paper); line-height:1; display:block; margin-bottom:10px; }
.stat-big sup { font-size:1.4rem; vertical-align:super; color:var(--amber); }
.stat-cell p { color:rgba(255,255,255,0.4); font-family:'IBM Plex Mono',monospace; font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; }

/* ABOUT */
.about-section { background:var(--paper); padding:108px 0; }
.about-inner { display:grid; grid-template-columns:5fr 7fr; gap:76px; align-items:center; }
.about-text p { color:var(--text-mid); font-size:0.95rem; line-height:1.85; margin-bottom:16px; font-weight:300; }
.about-checklist { list-style:none; margin-top:26px; display:flex; flex-direction:column; gap:12px; }
.about-checklist li { display:flex; align-items:center; gap:14px; font-size:0.9rem; color:var(--ink); font-weight:500; }
.about-checklist li::before { content:''; width:18px; height:18px; flex-shrink:0; border-radius:3px; background:var(--amber-soft) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 6l3 3 5-5' stroke='%23C77F1F' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center/12px; }
.about-images { position:relative; }
.about-stack { display:grid; grid-template-columns:1fr 1fr; grid-template-rows:auto auto; gap:10px; }
.about-stack img { width:100%; display:block; object-fit:cover; }
.about-stack img:nth-child(1) { grid-row:span 2; height:460px; }
.about-stack img:nth-child(2) { height:220px; }
.about-stack img:nth-child(3) { height:224px; }
.about-badge { position:absolute; bottom:-18px; left:-18px; background:var(--blueprint-deep); color:var(--paper); padding:18px 22px; border-radius:2px; box-shadow:0 16px 44px rgba(11,32,54,0.28); transform:rotate(-2deg); border:1px solid rgba(229,162,58,0.3); }
.about-badge strong { font-family:'IBM Plex Mono',monospace; font-size:2.1rem; font-weight:600; line-height:1; display:block; color:var(--amber); }
.about-badge span { font-family:'IBM Plex Mono',monospace; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; opacity:0.85; margin-top:4px; display:block; }

/* SERVICES */
.services-section { background:var(--paper-dim); padding:108px 0; }
.section-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:52px; flex-wrap:wrap; gap:20px; }
.services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.svc-card { background:var(--paper); border:1px solid var(--border); border-radius:3px; overflow:hidden; transition:box-shadow 0.3s,transform 0.3s,border-color 0.3s; display:flex; flex-direction:column; }
.svc-card:hover { box-shadow:0 20px 56px rgba(11,32,54,0.12); transform:translateY(-5px); border-color:var(--amber); }
.svc-card-img { height:210px; overflow:hidden; position:relative; }
.svc-card-img img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.6s; }
.svc-card:hover .svc-card-img img { transform:scale(1.06); }
.svc-card-img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(7,22,38,0.55) 0%,transparent 60%); }
.svc-tag { position:absolute; top:14px; left:14px; background:var(--blueprint-deep); color:var(--amber); font-family:'IBM Plex Mono',monospace; font-size:0.68rem; font-weight:600; letter-spacing:0.08em; padding:5px 9px; border-radius:2px; border:1px solid rgba(229,162,58,0.35); }
.svc-card-body { padding:28px 30px 32px; flex:1; display:flex; flex-direction:column; }
.svc-card-body h3 { font-size:1.32rem; color:var(--ink); line-height:1.3; margin-bottom:13px; font-weight:700; letter-spacing:-0.01em; }
.svc-card-body p { color:var(--text-muted); font-size:0.87rem; line-height:1.75; flex:1; font-weight:300; }
.svc-link { display:inline-flex; align-items:center; gap:8px; margin-top:22px; color:var(--amber-deep); font-size:0.78rem; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; text-decoration:none; transition:gap 0.2s; }
.svc-card:hover .svc-link { gap:14px; }

/* MISSION */
.mv-section { background:var(--blueprint); padding:108px 0; overflow:hidden; position:relative; }
.mv-pattern { position:absolute; inset:0; opacity:0.045; background-image:repeating-linear-gradient(0deg,transparent,transparent 56px,rgba(255,255,255,1) 56px,rgba(255,255,255,1) 57px),repeating-linear-gradient(90deg,transparent,transparent 56px,rgba(255,255,255,1) 56px,rgba(255,255,255,1) 57px); }
.mv-grid { display:grid; grid-template-columns:1fr 1fr; gap:76px; align-items:center; position:relative; z-index:1; }
.mv-card { background:rgba(255,255,255,0.04); border:1px solid var(--border-dark); border-radius:3px; padding:30px; transition:background 0.3s,border-color 0.3s; margin-bottom:18px; }
.mv-card:last-child { margin-bottom:0; }
.mv-card:hover { background:rgba(229,162,58,0.06); border-color:rgba(229,162,58,0.28); }
.mv-card-icon { width:38px; height:38px; background:rgba(229,162,58,0.14); border-radius:4px; display:flex; align-items:center; justify-content:center; margin-bottom:15px; color:var(--amber); font-size:0.95rem; }
.mv-card h4 { font-size:1.22rem; color:var(--paper); font-weight:700; margin-bottom:11px; }
.mv-card p { color:rgba(255,255,255,0.45); font-size:0.89rem; line-height:1.75; font-weight:300; }
.mv-right { position:relative; }
.mv-right img { width:100%; height:500px; object-fit:cover; border-radius:3px; display:block; }
.mv-right-badge { position:absolute; top:28px; left:-22px; background:var(--amber); padding:18px 24px; border-radius:2px; box-shadow:0 12px 36px rgba(0,0,0,0.32); }
.mv-right-badge i { color:var(--blueprint-deep); font-size:1.3rem; margin-bottom:8px; display:block; }
.mv-right-badge p { color:var(--blueprint-deep); font-family:'IBM Plex Mono',monospace; font-size:0.7rem; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; max-width:118px; line-height:1.4; }

/* CTA */
.cta-band { background:var(--paper-dim); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
.cta-inner { display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; padding:68px 0; }
.cta-inner h2 { color:var(--ink); font-size:clamp(1.6rem,2.8vw,2.5rem); font-weight:700; max-width:540px; line-height:1.22; letter-spacing:-0.01em; }
.cta-inner h2 em { font-style:normal; color:var(--amber-deep); }

/* WHY US */
.why-section { background:var(--paper); padding:108px 0; }
.why-inner { display:grid; grid-template-columns:7fr 5fr; gap:76px; align-items:center; }
.why-image-wrap { position:relative; }
.why-main-img { width:100%; height:500px; object-fit:cover; border-radius:3px; display:block; }
.why-thumb { position:absolute; bottom:-26px; right:-26px; width:210px; height:152px; object-fit:cover; border-radius:3px; border:5px solid var(--paper); box-shadow:0 16px 44px rgba(11,32,54,0.18); }
.why-text p { color:var(--text-mid); font-size:0.95rem; line-height:1.85; margin:18px 0 38px; font-weight:300; }
.why-stat-row { display:flex; align-items:center; gap:18px; padding:18px 22px; background:var(--paper-dim); border-radius:3px; border:1px solid var(--border); transition:border-color 0.2s; margin-bottom:14px; }
.why-stat-row:last-child { margin-bottom:0; }
.why-stat-row:hover { border-color:var(--amber); }
.why-stat-icon { width:40px; height:40px; background:var(--amber-soft); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--amber-deep); font-size:0.95rem; flex-shrink:0; }
.why-stat-text strong { font-family:'IBM Plex Mono',monospace; font-size:1.5rem; color:var(--ink); font-weight:600; line-height:1; }
.why-stat-text strong sup { font-size:0.92rem; color:var(--amber-deep); }
.why-stat-text span { display:block; font-family:'IBM Plex Mono',monospace; font-size:0.68rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-top:4px; }

/* TESTIMONIALS */
.testi-section { background:var(--paper-dim); padding:108px 0; }
.testi-head { text-align:center; margin-bottom:52px; }
.testi-head .label-pill { justify-content:center; }
.testi-grid { display:grid; grid-template-columns:1fr 1fr; gap:22px; }
.testi-card { background:var(--paper); border:1px solid var(--border); border-radius:3px; padding:38px; transition:box-shadow 0.3s; }
.testi-card:hover { box-shadow:0 12px 38px rgba(11,32,54,0.1); }
.testi-rating { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
.testi-rating .bar { width:90px; height:4px; background:var(--border); border-radius:2px; overflow:hidden; }
.testi-rating .bar i { display:block; height:100%; background:var(--amber); border-radius:2px; }
.testi-rating .num { font-family:'IBM Plex Mono',monospace; font-size:0.76rem; font-weight:600; color:var(--amber-deep); }
.testi-card p { font-size:1.08rem; color:var(--text-mid); line-height:1.7; margin-bottom:26px; }
.testi-person { display:flex; align-items:center; gap:14px; border-top:1px solid var(--border); padding-top:20px; }
.testi-avatar { width:40px; height:40px; border-radius:3px; background:var(--blueprint-deep); display:flex; align-items:center; justify-content:center; font-family:'Space Grotesk',sans-serif; font-size:1.05rem; color:var(--amber); font-weight:700; flex-shrink:0; }
.testi-person h4 { font-size:0.88rem; font-weight:600; color:var(--ink); }
.testi-person span { font-size:0.78rem; color:var(--text-muted); }

/* GALLERY */
.gallery-section { background:var(--paper); padding:108px 0; }
.gallery-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:36px; flex-wrap:wrap; gap:20px; }
.gallery-mosaic { display:grid; grid-template-columns:repeat(12,1fr); grid-template-rows:220px 220px; gap:8px; }
.gm-item { overflow:hidden; position:relative; border-radius:2px; }
.gm-item:nth-child(1) { grid-column:span 5; grid-row:span 2; }
.gm-item:nth-child(2) { grid-column:span 4; }
.gm-item:nth-child(3) { grid-column:span 3; }
.gm-item:nth-child(4) { grid-column:span 3; }
.gm-item:nth-child(5) { grid-column:span 4; }
.gm-item img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.6s ease; }
.gm-item:hover img { transform:scale(1.06); }
.gm-overlay { position:absolute; inset:0; background:rgba(7,22,38,0.4); opacity:0; transition:opacity 0.3s; display:flex; align-items:flex-end; justify-content:space-between; padding:14px; }
.gm-item:hover .gm-overlay { opacity:1; }
.gm-fig { font-family:'IBM Plex Mono',monospace; font-size:0.68rem; color:rgba(255,255,255,0.8); letter-spacing:0.06em; }
.gm-overlay i { color:var(--amber); font-size:1.05rem; }

/* CONTACT */
.contact-section { background:var(--blueprint-deep); padding:108px 0; }
.contact-inner { display:grid; grid-template-columns:1fr 1fr; gap:76px; align-items:start; }
.contact-left > p { color:rgba(255,255,255,0.45); font-size:0.93rem; line-height:1.8; margin:18px 0 38px; font-weight:300; }
.cdetail-list { display:flex; flex-direction:column; gap:14px; }
.cdetail { display:flex; align-items:flex-start; gap:16px; padding:18px; background:rgba(255,255,255,0.035); border:1px solid var(--border-dark); border-radius:3px; transition:border-color 0.2s; }
.cdetail:hover { border-color:rgba(229,162,58,0.32); }
.cdetail-icon { width:38px; height:38px; background:rgba(229,162,58,0.14); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--amber); flex-shrink:0; }
.cdetail-body label { display:block; font-family:'IBM Plex Mono',monospace; font-size:0.66rem; color:rgba(255,255,255,0.32); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:5px; }
.cdetail-body a,.cdetail-body p { color:rgba(255,255,255,0.72); font-size:0.89rem; text-decoration:none; }
.cdetail-body a:hover { color:var(--amber); }
.contact-form-card { background:var(--paper); border-radius:4px; padding:42px; box-shadow:0 24px 76px rgba(0,0,0,0.32); }
.contact-form-card h3 { font-size:1.5rem; color:var(--ink); margin-bottom:26px; font-weight:700; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.fg { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
.fg label { font-family:'IBM Plex Mono',monospace; font-size:0.68rem; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:var(--text-mid); }
.fg input,.fg textarea { border:1.5px solid var(--border); border-radius:3px; padding:12px 14px; font-family:'Inter',sans-serif; font-size:0.9rem; color:var(--ink); background:var(--paper); outline:none; resize:vertical; transition:border-color 0.2s,box-shadow 0.2s; }
.fg input:focus,.fg textarea:focus { border-color:var(--amber); box-shadow:0 0 0 3px rgba(229,162,58,0.14); }
.fg textarea { min-height:118px; }

/* FOOTER */
.dnl-footer { background:var(--ink); padding:68px 0 0; }
.footer-grid { display:grid; grid-template-columns:1.6fr 1fr 1fr; gap:60px; padding-bottom:52px; border-bottom:1px solid var(--border-dark); }
.footer-brand img { height:36px; margin-bottom:18px; display:block; filter:brightness(0) invert(1); }
.footer-brand p { color:rgba(255,255,255,0.35); font-size:0.86rem; line-height:1.75; max-width:280px; font-weight:300; }
.footer-socials { display:flex; gap:10px; margin-top:22px; }
.footer-socials a { width:34px; height:34px; border:1px solid var(--border-dark); border-radius:3px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.35); font-size:0.78rem; text-decoration:none; transition:all 0.2s; }
.footer-socials a:hover { border-color:var(--amber); color:var(--amber); }
.footer-col-title { font-family:'IBM Plex Mono',monospace; font-size:0.7rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.5); margin-bottom:18px; }
.footer-links { list-style:none; display:flex; flex-direction:column; gap:10px; }
.footer-links a { text-decoration:none; color:rgba(255,255,255,0.3); font-size:0.87rem; transition:color 0.2s; display:flex; align-items:center; gap:8px; font-weight:300; }
.footer-links a i { font-size:0.4rem; color:var(--amber); }
.footer-links a:hover { color:var(--amber); }
.footer-info-item { display:flex; align-items:flex-start; gap:12px; margin-bottom:13px; }
.footer-info-item i { color:var(--amber); font-size:0.74rem; margin-top:5px; flex-shrink:0; }
.footer-info-item span { color:rgba(255,255,255,0.3); font-size:0.85rem; line-height:1.6; font-weight:300; }
.footer-bottom { padding:18px 0; display:flex; justify-content:space-between; align-items:center; color:rgba(255,255,255,0.22); font-family:'IBM Plex Mono',monospace; font-size:0.72rem; flex-wrap:wrap; gap:10px; }
.footer-bottom em { color:var(--amber); font-style:normal; }

/* BACK TO TOP */
.back-top { position:fixed; bottom:26px; right:26px; z-index:900; width:42px; height:42px; border-radius:3px; border:none; background:var(--amber); color:var(--blueprint-deep); cursor:pointer; font-size:0.85rem; opacity:0; visibility:hidden; transition:all 0.3s; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 22px rgba(229,162,58,0.4); }
.back-top.show { opacity:1; visibility:visible; }
.back-top:hover { background:var(--amber-deep); color:#fff; transform:translateY(-3px); }

/* RESPONSIVE */
@media (max-width:1024px) {
  .stats-band-inner { grid-template-columns:repeat(2,1fr); }
  .stat-cell { border-bottom:1px solid var(--border-dark); padding:26px 32px; margin-bottom:8px; }
  .about-inner,.mv-grid,.why-inner,.contact-inner { grid-template-columns:1fr; gap:44px; }
  .why-image-wrap { order:-1; }
  .why-thumb { right:8px; bottom:8px; }
  .services-grid { grid-template-columns:1fr 1fr; }
  .footer-grid { grid-template-columns:1fr 1fr; }
  .testi-grid { grid-template-columns:1fr; }
  .hero-edge-label { display:none; }
}
@media (max-width:768px) {
  .nav-links-list,.nav-cta { display:none; }
  .hamburger { display:flex; }
  .topbar-left { display:none; }
  .topbar-brand { display:none !important; }
  .mobile-brand { display:block; }
  .nav-logo img { height:34px; }
  .hero-h1 { font-size:2.5rem; }
  .services-grid { grid-template-columns:1fr; }
  .about-stack { grid-template-columns:1fr; }
  .about-stack img:nth-child(1) { height:280px; grid-row:auto; }
  .about-stack img:nth-child(2),.about-stack img:nth-child(3) { height:190px; }
  .gallery-mosaic { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
  .gm-item { grid-column:span 1 !important; grid-row:span 1 !important; height:170px; }
  .contact-inner { grid-template-columns:1fr; }
  .contact-form-card { padding:26px; }
  .footer-grid { grid-template-columns:1fr; gap:34px; }
  .footer-bottom { flex-direction:column; text-align:center; }
  .form-row { grid-template-columns:1fr; }
  .section-head { flex-direction:column; align-items:flex-start; }
  .hero-scroll-hint { display:none; }
  .cta-inner { justify-content:center; text-align:center; }
  .stat-cell { padding:22px; }
}
`;

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function LabelPill({ text, onDark = false }: { text: string; onDark?: boolean }) {
  return (
    <div className={`label-pill${onDark ? " on-dark" : ""}`}>
      <div className="dot" />
      <span>{text}</span>
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

/* Registration-mark crosshair — recurring signature motif borrowed from
   technical / blueprint drawings (instrumentation & metering is the
   company's actual trade). */
function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="17" cy="17" r="10.5" stroke="white" strokeWidth="1" />
      <line x1="17" y1="0" x2="17" y2="34" stroke="white" strokeWidth="1" />
      <line x1="0" y1="17" x2="34" y2="17" stroke="white" strokeWidth="1" />
    </svg>
  );
}

function RatingMeter({ rating }: { rating: number }) {
  return (
    <div className="testi-rating">
      <div className="bar"><i style={{ width: `${(rating / 5) * 100}%` }} /></div>
      <span className="num">{rating.toFixed(1)} / 5.0</span>
    </div>
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
    aosScript.onload   = () => (window as any).AOS?.init({ duration: 700, easing: "ease-out-quart", once: true, offset: 50 });
    document.body.appendChild(aosScript);

    return () => { document.body.removeChild(aosScript); };
  }, []);

  /* Preloader */
  useEffect(() => {
    const t = setTimeout(() => setPreloaderHidden(true), 2200);
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
      {/* PRELOADER — "DIL" animates in letter by letter, like a calibration readout warming up */}
      <div className={`dnl-preloader${preloaderHidden ? " hidden" : ""}`}>
        <div className="pre-text" aria-label="DIL">
          <span>D</span><span className="accent">I</span><span>L</span>
        </div>
        <div className="pre-rule" />
        <div className="pre-ring" />
        <p className="pre-tagline">Calibrating — Engineering Precision Since 2014</p>
      </div>

      {/* TOPBAR */}
      <div className="dnl-topbar">
        <div className="topbar-inner">
          <div className="topbar-brand">{BRAND_SHORT}</div>
          <div className="topbar-left">
            <div className="topbar-item"><i className="fa-regular fa-clock" /> Mon – Fri&nbsp;09:00–18:00</div>
            <div className="topbar-item"><i className="fa-solid fa-envelope" /> info@dnalemic.com</div>
            <div className="topbar-item"><i className="fa-solid fa-phone" /> +234 8038780861</div>
          </div>
          <div className="topbar-social">
            <a href="#" aria-label="facebook"><i className="fab fa-facebook-f" /></a>
            <a href="#" aria-label="twitter"><i className="fab fa-twitter" /></a>
            <a href="#" aria-label="linkedin"><i className="fab fa-linkedin-in" /></a>
          </div>
        </div>
      </div>

      {/* NAVBAR — fixed/sticky header. */}
      <nav className={`dnl-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo">
            <a href="https://dnalemic.com/" className="brand-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/assets/img/logo/dnl.png`} alt="Dnalemic" />
              <span className="mobile-brand">{BRAND_SHORT}</span>
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
          <div className="hero-grid" />
        </div>
        <Crosshair className="hero-corner tl" />
        <div className="hero-edge-label">DNALEMIC INTERNATIONAL — EST. 2014 — PORT HARCOURT, NG</div>
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
            <a href="#services" className="btn-amber">Our Services <i className="fa-regular fa-arrow-right" /></a>
            <a href="#contact" className="btn-ghost-light">Get in Touch</a>
          </div>
        </div>
        <div className="hero-scroll-hint"><span>Scroll</span><div className="scroll-line" /></div>
        <div className="hero-slide-nav">
          {HERO_SLIDES.map((_, i) => (
            <button key={i}
              className={`tick-btn${i === currentSlide ? " active" : ""}`}
              aria-label={`Slide ${i + 1}`}
              onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); goTo(i); }} />
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <div className="stats-band">
        <div className="stats-band-inner">
          {STATS_BAND.map((s, i) => (
            <div className="stat-cell" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="stat-tick" />
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
                  <div className="svc-tag">{s.tag}</div>
                </div>
                <div className="svc-card-body">
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
              <LabelPill text="Our Direction" onDark />
              <h2 className="display-heading light" style={{ marginBottom: 36 }}>
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
            <a href="#contact" className="btn-amber" data-aos="fade-left">Contact Us Today <i className="fa-regular fa-arrow-right" /></a>
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
                <RatingMeter rating={t.rating} />
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
                <div className="gm-overlay">
                  <span className="gm-fig">FIG. {String(i + 1).padStart(2, "0")}</span>
                  <i className="fa-solid fa-expand" />
                </div>
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
              <LabelPill text="Get in Touch" onDark />
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
                <button type="submit" name="submit" className="btn-amber" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
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
            <span>© 2024 <em>{BRAND_FULL}</em>. All Rights Reserved.</span>
            <span>CAC // INCORPORATED JUN 2014</span>
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