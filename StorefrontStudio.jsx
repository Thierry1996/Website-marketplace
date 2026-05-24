import React, { useState, useEffect } from 'react';

const CSS = `
  :root {
    --gold: #C9A84C;
    --gold-light: #E8C96A;
    --gold-dark: #9A7A2E;
    --black: #0A0A0A;
    --off-black: #111111;
    --charcoal: #1C1C1E;
    --plum: #4A1C40;
    --plum-light: #6B2A5E;
    --lavender: #C4B5D5;
    --lavender-soft: #EAE4F2;
    --white: #FAFAFA;
    --gray-light: #E8E8E8;
    --gray-mid: #9A9A9A;
    --gray-dark: #3A3A3A;
  }

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Poppins', sans-serif;
    background: var(--black);
    color: var(--white);
    overflow-x: hidden;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }

  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.03); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(8px); }
  }

  @keyframes grainMove {
    0%   { transform: translate(0,0); }
    20%  { transform: translate(1%,2%); }
    40%  { transform: translate(2%,-2%); }
    60%  { transform: translate(1%,-1%); }
    80%  { transform: translate(2%, 1%); }
    100% { transform: translate(0,0); }
  }

  .gold-text {
    background: linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .shimmer-text {
    background: linear-gradient(90deg, var(--gold-dark) 0%, var(--gold-light) 40%, var(--gold) 50%, var(--gold-light) 60%, var(--gold-dark) 100%);
    background-size: 200% auto;
    animation: shimmer 2.5s linear infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-link {
    position: relative;
    color: var(--white);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 0.02em;
    padding-bottom: 4px;
    transition: color 0.3s ease;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    transition: width 0.3s ease;
  }
  .nav-link:hover::after { width: 100%; }
  .nav-link:hover { color: var(--gold-light); }

  .btn-gold {
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--black);
    border: none;
    border-radius: 50px;
    padding: 12px 28px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    letter-spacing: 0.03em;
  }
  .btn-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(201,168,76,0.4);
  }

  .btn-ghost {
    background: transparent;
    color: var(--white);
    border: 2px solid rgba(255,255,255,0.35);
    border-radius: 50px;
    padding: 12px 28px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.03em;
  }
  .btn-ghost:hover {
    border-color: var(--gold);
    color: var(--gold);
    transform: translateY(-2px);
  }

  .category-card {
    background: var(--charcoal);
    border: 1px solid rgba(201,168,76,0.1);
    border-radius: 16px;
    padding: 28px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
  }
  .category-card:hover {
    transform: translateY(-6px);
    border-color: var(--gold);
    box-shadow: 0 12px 40px rgba(201,168,76,0.18);
  }

  .template-card {
    background: rgba(28,28,30,0.85);
    border: 1px solid rgba(201,168,76,0.12);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.35s ease;
    backdrop-filter: blur(10px);
  }
  .template-card:hover {
    transform: translateY(-8px) scale(1.01);
    border-color: var(--gold);
    box-shadow: 0 20px 50px rgba(201,168,76,0.22);
  }

  .pricing-card {
    background: var(--charcoal);
    border: 1px solid rgba(201,168,76,0.15);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .pricing-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
  .pricing-card.featured { border-color: var(--gold); box-shadow: 0 0 40px rgba(201,168,76,0.18); }

  .testimonial-card {
    background: rgba(28,28,30,0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(196,181,213,0.18);
    border-radius: 20px;
    padding: 32px;
    transition: all 0.3s ease;
  }
  .testimonial-card:hover {
    transform: translateY(-4px);
    border-color: rgba(196,181,213,0.45);
    box-shadow: 0 12px 40px rgba(74,28,64,0.3);
  }

  .filter-tab {
    background: transparent;
    border: 1px solid var(--gray-dark);
    color: var(--gray-mid);
    border-radius: 50px;
    padding: 8px 22px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .filter-tab.active, .filter-tab:hover {
    background: linear-gradient(135deg, var(--gold-dark), var(--gold));
    border-color: var(--gold);
    color: var(--black);
  }

  .section-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 800;
    color: var(--white);
    margin-bottom: 16px;
    line-height: 1.15;
  }

  .platform-badge {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 1.05rem;
    color: rgba(255,255,255,0.28);
    white-space: nowrap;
    padding: 8px 26px;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 50px;
    transition: color 0.3s;
  }
  .platform-badge:hover { color: rgba(255,255,255,0.6); }

  @media (max-width: 900px) {
    .desktop-only { display: none !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-cards-col { display: none !important; }
    .stats-divider { display: none !important; }
    .stats-bar { flex-wrap: wrap !important; gap: 20px !important; }
    .step-connector { display: none !important; }
    .steps-grid { grid-template-columns: 1fr 1fr !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
  }

  @media (max-width: 600px) {
    .section-pad { padding: 70px 24px !important; }
    .hero-pad { padding: 0 24px !important; padding-top: 110px !important; }
    .steps-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
    .nav-pad { padding: 14px 20px !important; }
    .newsletter-flex { flex-direction: column !important; }
  }
`;

const categories = [
  { emoji: '👗', name: 'Fashion & Apparel',           count: 48 },
  { emoji: '💄', name: 'Beauty & Cosmetics',           count: 36 },
  { emoji: '🧖', name: 'Spa & Wellness',               count: 29 },
  { emoji: '🍕', name: 'Restaurant & Food',            count: 52 },
  { emoji: '✂️', name: 'Hair Stylist & Salon',         count: 31 },
  { emoji: '🏋️', name: 'Fitness & Gym',               count: 27 },
  { emoji: '🏥', name: 'Health & Booking',             count: 24 },
  { emoji: '🧹', name: 'House Cleaning Services',      count: 18 },
  { emoji: '👕', name: 'Laundry Services',             count: 15 },
  { emoji: '📊', name: 'Accounting & Bookkeeping',     count: 22 },
  { emoji: '🛒', name: 'General Ecommerce',            count: 64 },
  { emoji: '💻', name: 'Digital Products & Freelance', count: 41 },
];

const templates = [
  { name: 'Luxe Boutique',   category: 'Fashion',   price: '$49',  rating: 4.9, reviews: 234, badge: 'BESTSELLER', gradient: 'linear-gradient(135deg,#4A1C40 0%,#C9A84C 100%)' },
  { name: 'Glow Studio',     category: 'Beauty',    price: '$49',  rating: 4.8, reviews: 89,  badge: 'NEW',        gradient: 'linear-gradient(135deg,#1C1C2E 0%,#6B2A5E 100%)' },
  { name: 'FreshBite',       category: 'Food',      price: '$39',  rating: 4.7, reviews: 156, badge: null,         gradient: 'linear-gradient(135deg,#1A2A1A 0%,#3D7A2E 100%)' },
  { name: 'ZenFlow',         category: 'Wellness',  price: 'FREE', rating: 4.6, reviews: 412, badge: null,         gradient: 'linear-gradient(135deg,#1C2E2E 0%,#2E6B6B 100%)' },
  { name: 'PowerHouse',      category: 'Fitness',   price: '$59',  rating: 4.9, reviews: 178, badge: 'BESTSELLER', gradient: 'linear-gradient(135deg,#1A1A2E 0%,#3A3A8A 100%)' },
  { name: 'DigitalWorks',    category: 'Digital',   price: '$49',  rating: 4.8, reviews: 67,  badge: 'NEW',        gradient: 'linear-gradient(135deg,#2A1A1A 0%,#8A3A3A 100%)' },
];

const steps = [
  { num: '01', icon: '🔍', title: 'Browse & Choose',            desc: 'Explore our curated library of 500+ premium storefronts across 12 industries.' },
  { num: '02', icon: '💳', title: 'Purchase & Download',        desc: 'Secure checkout in seconds. Instantly download your template files and assets.' },
  { num: '03', icon: '🎨', title: 'Customize in Your Builder',  desc: 'Open in Shopify, Wix, or your preferred platform. Swap colors, copy, and images.' },
  { num: '04', icon: '🚀', title: 'Go Live & Sell',             desc: 'Publish your store and start accepting orders. Most customers launch same day.' },
];

const pricingTiers = [
  {
    name: 'STARTER', price: '$29', period: 'one-time',
    desc: 'Perfect for launching your first storefront',
    features: ['1 Template License', 'Lifetime Updates', 'Email Support', 'Commercial Use', null, null],
    cta: 'Get Started', featured: false,
  },
  {
    name: 'PRO', price: '$79', period: 'one-time',
    desc: 'Best for growing businesses',
    features: ['5 Template Licenses', 'Lifetime Updates', 'Priority Support', 'Commercial Use', 'Source Files Included', null],
    cta: 'Get Pro Access', featured: true, badge: 'MOST POPULAR',
  },
  {
    name: 'STUDIO', price: '$149', period: 'per year',
    desc: 'Unlimited access for agencies & studios',
    features: ['Unlimited Templates', 'Lifetime Updates', '24/7 Priority Support', 'Commercial Use', 'Source Files Included', 'White-Label Rights'],
    cta: 'Join Studio', featured: false,
  },
];

const testimonials = [
  {
    name: 'Monique T.', role: 'Beauty Studio Owner', initials: 'MT',
    quote: 'I launched my beauty salon website in one afternoon. The template was polished and professional right out of the box. Worth every penny!',
    color: 'linear-gradient(135deg,#6B2A5E,#C9A84C)',
  },
  {
    name: 'James R.', role: 'Fitness Entrepreneur', initials: 'JR',
    quote: 'The PowerHouse template helped me go from zero to taking online bookings in under 24 hours. My clients constantly compliment the design.',
    color: 'linear-gradient(135deg,#1A2E8A,#C9A84C)',
  },
  {
    name: 'Priya S.', role: 'Freelance Designer', initials: 'PS',
    quote: "I've used Storefront Studio for three different client projects. The quality is consistently excellent and the customization is straightforward.",
    color: 'linear-gradient(135deg,#2A5E5E,#C9A84C)',
  },
];

const platforms = ['Shopify', 'Amazon', 'Etsy', 'eBay', 'Wix', 'Elementor', 'Squarespace'];

export default function App() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [email, setEmail]             = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800;900&display=swap';
    link.rel  = 'stylesheet';
    document.head.appendChild(link);

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filters = ['All', 'Ecommerce', 'Services', 'Booking', 'Portfolio'];

  /* ───────── helpers ───────── */
  const S = {
    section: (extra) => ({
      padding: '100px 48px',
      ...extra,
    }),
    goldLine: {
      width: 60, height: 3,
      background: 'linear-gradient(90deg,var(--gold),var(--gold-light))',
      margin: '16px auto 20px',
      borderRadius: 2,
    },
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ═══════════════════════════════ NAV ═══════════════════════════════ */}
      <nav className="nav-pad" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '16px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '0.06em', userSelect: 'none' }}>
          <span className="gold-text">STOREFRONT</span>
          <span style={{ color: 'var(--white)', marginLeft: 5 }}>STUDIO</span>
        </div>

        {/* Desktop links */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {['Templates', 'Categories', 'Pricing', 'About', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>

        <button className="btn-gold desktop-only" style={{ fontSize: '0.84rem', padding: '10px 22px' }}>
          Browse All Templates
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4 }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2, background: 'var(--gold)', borderRadius: 2,
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                : i === 1 ? 'scaleX(0)'
                : 'rotate(-45deg) translate(5px,-5px)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0, zIndex: 999,
          background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(24px)',
          padding: '20px 28px 28px',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          animation: 'fadeInUp 0.25s ease',
        }}>
          {['Templates', 'Categories', 'Pricing', 'About', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              display: 'block', color: 'var(--white)', textDecoration: 'none',
              padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
              fontFamily: 'Poppins', fontWeight: 500, fontSize: '1rem',
            }}>{l}</a>
          ))}
          <button className="btn-gold" style={{ marginTop: 22, width: '100%', borderRadius: 10 }}>
            Browse All Templates
          </button>
        </div>
      )}

      {/* ═══════════════════════════════ HERO ══════════════════════════════ */}
      <section style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        background: 'var(--black)',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '45%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 900, height: 700,
          background: 'radial-gradient(ellipse at center, rgba(74,28,64,0.45) 0%, rgba(201,168,76,0.08) 45%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Corner accent */}
        <div style={{
          position: 'absolute', top: -200, right: -200,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Grain */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.035, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          animation: 'grainMove 0.6s steps(1) infinite',
        }} />

        <div className="hero-pad" style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 48px', paddingTop: 110,
          width: '100%', position: 'relative', zIndex: 1,
          paddingBottom: 60,
        }}>
          <div className="hero-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 60, alignItems: 'center',
          }}>
            {/* ── Left ── */}
            <div>
              {/* Eyebrow pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 18px', marginBottom: 28,
                border: '1px solid rgba(201,168,76,0.3)', borderRadius: 50,
                animation: 'fadeInUp 0.6s ease both',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
                <span style={{
                  fontFamily: 'Poppins', fontSize: '0.7rem', fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)',
                }}>Award-Winning Template Marketplace</span>
              </div>

              {/* H1 */}
              <h1 style={{
                fontFamily: 'Poppins', fontWeight: 900,
                fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                lineHeight: 1.08, color: 'var(--white)',
                marginBottom: 24,
                animation: 'fadeInUp 0.7s 0.1s ease both',
              }}>
                Launch Your<br />
                <span className="gold-text">Dream Store.</span><br />
                Today.
              </h1>

              {/* Subhead */}
              <p style={{
                fontFamily: 'Poppins', fontWeight: 300, fontSize: '1.08rem',
                lineHeight: 1.75, color: 'var(--gray-mid)',
                maxWidth: 490, marginBottom: 38,
                animation: 'fadeInUp 0.7s 0.2s ease both',
              }}>
                Premium ready-made ecommerce storefronts for entrepreneurs, freelancers,
                and small businesses. Inspired by Shopify, Etsy, Amazon & more.
              </p>

              {/* CTAs */}
              <div style={{
                display: 'flex', gap: 16, flexWrap: 'wrap',
                animation: 'fadeInUp 0.7s 0.3s ease both',
              }}>
                <button className="btn-gold" style={{ fontSize: '1rem', padding: '15px 34px' }}>
                  Explore Templates
                </button>
                <button className="btn-ghost" style={{ fontSize: '1rem', padding: '15px 34px' }}>
                  ▶ Watch Demo
                </button>
              </div>
            </div>

            {/* ── Right: floating cards ── */}
            <div className="hero-cards-col" style={{ position: 'relative', height: 500 }}>
              {[
                { top: '2%',  left: '8%',  w: 160, h: 200, grad: 'linear-gradient(135deg,#4A1C40,#C9A84C)',  label: 'Fashion',  delay: 0 },
                { top: '28%', left: '46%', w: 178, h: 218, grad: 'linear-gradient(135deg,#1C1C2E,#6B2A5E)',  label: 'Beauty',   delay: 0.4 },
                { top: '57%', left: '4%',  w: 150, h: 175, grad: 'linear-gradient(135deg,#1A2A1A,#3D7A2E)',  label: 'Food',     delay: 0.2 },
                { top: '8%',  left: '58%', w: 140, h: 165, grad: 'linear-gradient(135deg,#1A1A2E,#3A3A8A)',  label: 'Fitness',  delay: 0.6 },
              ].map((c, i) => (
                <div key={i} style={{
                  position: 'absolute', top: c.top, left: c.left,
                  width: c.w, height: c.h,
                  background: c.grad,
                  borderRadius: 16,
                  border: '1px solid rgba(201,168,76,0.2)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
                  animation: `float 4s ${c.delay}s ease-in-out infinite, fadeInUp 0.9s ${c.delay + 0.3}s ease both`,
                  display: 'flex', alignItems: 'flex-end', padding: 12,
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}>
                  <span style={{
                    fontFamily: 'Poppins', fontSize: '0.72rem', fontWeight: 600,
                    color: 'rgba(255,255,255,0.9)',
                    background: 'rgba(0,0,0,0.38)', padding: '3px 9px', borderRadius: 6,
                  }}>{c.label}</span>
                </div>
              ))}
              {/* Decorative ring */}
              <div style={{
                position: 'absolute', top: '20%', left: '30%',
                width: 280, height: 280, borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.08)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          color: 'var(--gold)', fontSize: '1.6rem',
          animation: 'bounce 1.8s ease-in-out infinite',
          lineHeight: 1,
        }}>⌄</div>
      </section>

      {/* ═══════════════════════════ STATS BAR ════════════════════════════ */}
      <div style={{
        background: 'var(--charcoal)',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        padding: '22px 48px',
      }}>
        <div className="stats-bar" style={{
          maxWidth: 860, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          {[['500+','Templates'],['12','Industries'],['10,000+','Customers'],['4.9★','Rating']].map(([val, label], i, arr) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.45rem', color: 'var(--gold)' }}>{val}</div>
                <div style={{ fontFamily: 'Poppins', fontSize: '0.72rem', fontWeight: 400, color: 'var(--gray-mid)', letterSpacing: '0.09em', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
              </div>
              {i < arr.length - 1 && <div className="stats-divider" style={{ width: 1, height: 44, background: 'rgba(201,168,76,0.25)' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════ CATEGORIES ═══════════════════════════ */}
      <section id="categories" className="section-pad" style={{
        padding: '100px 48px',
        background: 'linear-gradient(180deg,var(--off-black) 0%,rgba(74,28,64,0.04) 100%)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="section-title">Built for Every Business</h2>
            <div style={S.goldLine} />
            <p style={{ color: 'var(--gray-mid)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '1.05rem', maxWidth: 520, margin: '0 auto' }}>
              From beauty salons to fitness studios — we have the perfect storefront for every industry.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))',
            gap: 20,
          }}>
            {categories.map((cat, i) => (
              <div key={i} className="category-card" style={{ animationDelay: `${i * 0.04}s` }}>
                <div style={{ fontSize: '2.4rem', marginBottom: 12 }}>{cat.emoji}</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.95rem', color: 'var(--white)', marginBottom: 7, lineHeight: 1.3 }}>{cat.name}</div>
                <div style={{ fontFamily: 'Poppins', fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 500 }}>{cat.count} templates</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FEATURED TEMPLATES ════════════════════════ */}
      <section id="templates" className="section-pad" style={{ padding: '100px 48px', background: 'var(--off-black)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Editor's Picks</h2>
            <div style={S.goldLine} />
            <p style={{ color: 'var(--gray-mid)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '1.05rem' }}>
              Handpicked storefronts that convert visitors into customers
            </p>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 52, flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} className={`filter-tab${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))', gap: 28 }}>
            {templates.map((tmpl, i) => (
              <div key={i} className="template-card">
                {/* Preview image area */}
                <div style={{ height: 220, background: tmpl.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Decorative grid overlay */}
                  <div style={{
                    position: 'absolute', inset: 0, opacity: 0.07,
                    backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.5) 0,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(255,255,255,0.5) 0,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 40px)',
                  }} />
                  <span style={{ fontSize: '3.5rem', opacity: 0.2 }}>◈</span>
                  {tmpl.badge && (
                    <div style={{
                      position: 'absolute', top: 14, left: 14,
                      padding: '4px 13px', borderRadius: 50,
                      background: tmpl.badge === 'BESTSELLER'
                        ? 'linear-gradient(90deg,var(--gold-dark),var(--gold-light),var(--gold))'
                        : 'rgba(255,255,255,0.14)',
                      backgroundSize: tmpl.badge === 'BESTSELLER' ? '200% auto' : 'auto',
                      animation: tmpl.badge === 'BESTSELLER' ? 'shimmer 2.5s linear infinite' : 'none',
                      fontFamily: 'Poppins', fontSize: '0.68rem', fontWeight: 800,
                      color: tmpl.badge === 'BESTSELLER' ? 'var(--black)' : 'var(--white)',
                      letterSpacing: '0.1em',
                      boxShadow: tmpl.badge === 'BESTSELLER' ? '0 3px 12px rgba(201,168,76,0.5)' : 'none',
                    }}>{tmpl.badge}</div>
                  )}
                </div>

                {/* Card body */}
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)', marginBottom: 7 }}>{tmpl.name}</div>
                      <span style={{ background: 'rgba(196,181,213,0.14)', color: 'var(--lavender)', padding: '3px 11px', borderRadius: 50, fontFamily: 'Poppins', fontSize: '0.73rem', fontWeight: 500 }}>{tmpl.category}</span>
                    </div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.25rem', color: tmpl.price === 'FREE' ? 'var(--gold-light)' : 'var(--gold)' }}>{tmpl.price}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '12px 0 18px' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.82rem', letterSpacing: 1 }}>★★★★★</span>
                    <span style={{ color: 'var(--gray-mid)', fontFamily: 'Poppins', fontSize: '0.76rem' }}>{tmpl.rating} ({tmpl.reviews})</span>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      style={{ flex: 1, padding: '9px 0', background: 'transparent', border: '1px solid rgba(201,168,76,0.28)', borderRadius: 8, color: 'var(--gold)', fontFamily: 'Poppins', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.28)'; }}
                    >Preview</button>
                    <button className="btn-gold" style={{ flex: 1, borderRadius: 8, padding: '9px 0', fontSize: '0.82rem' }}>Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <button className="btn-ghost" style={{ padding: '14px 40px', fontSize: '0.95rem' }}>View All 500+ Templates</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════ PLATFORM INSPIRATION ══════════════════════ */}
      <section style={{ padding: '100px 0', background: 'var(--charcoal)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', textAlign: 'center', marginBottom: 60 }}>
          <h2 className="section-title">Inspired By The Best Platforms</h2>
          <div style={S.goldLine} />
          <p style={{ color: 'var(--gray-mid)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '1.05rem' }}>
            Our templates are benchmarked against the world's top ecommerce platforms
          </p>
        </div>

        {/* Marquee strip */}
        <div style={{ overflow: 'hidden', marginBottom: 72, padding: '10px 0' }}>
          <div style={{ display: 'flex', gap: 48, alignItems: 'center', animation: 'marquee 22s linear infinite', width: 'max-content' }}>
            {[...platforms, ...platforms].map((p, i) => (
              <span key={i} className="platform-badge">{p}</span>
            ))}
          </div>
        </div>

        {/* 3 columns */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28 }}>
          {[
            { icon: '⚡', title: 'Pre-built & Ready',       desc: 'Launch in hours, not weeks. Every template ships pixel-perfect and ready to customize with zero design experience needed.' },
            { icon: '🎨', title: 'Fully Customizable',      desc: 'Change colors, fonts, and layout to match your exact brand identity — in any website builder you already know.' },
            { icon: '💰', title: 'Fraction of the Cost',    desc: 'Why pay $5,000+ for a custom build? Get agency-quality design for under $150 and keep the rest for marketing.' },
          ].map((col, i) => (
            <div key={i} style={{
              background: 'rgba(10,10,10,0.55)', borderRadius: 16,
              padding: '38px 32px', textAlign: 'center',
              border: '1px solid rgba(201,168,76,0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: '2.6rem', marginBottom: 16 }}>{col.icon}</div>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.15rem', color: 'var(--white)', marginBottom: 12 }}>{col.title}</h3>
              <p style={{ fontFamily: 'Poppins', fontWeight: 300, color: 'var(--gray-mid)', lineHeight: 1.72, fontSize: '0.93rem' }}>{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═════════════════════════════ */}
      <section className="section-pad" style={{ padding: '100px 48px', background: 'var(--off-black)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 className="section-title">From Purchase to Live in Minutes</h2>
            <div style={S.goldLine} />
            <p style={{ color: 'var(--gray-mid)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '1.05rem' }}>
              No coding. No designers. No waiting weeks.
            </p>
          </div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, position: 'relative' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                {i < steps.length - 1 && (
                  <div className="step-connector" style={{
                    position: 'absolute', top: 31, left: '62%',
                    width: '76%', height: 2,
                    background: 'repeating-linear-gradient(90deg,var(--gold) 0,var(--gold) 6px,transparent 6px,transparent 14px)',
                    zIndex: 0,
                  }} />
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    margin: '0 auto 18px',
                    background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.1rem', color: 'var(--black)',
                    boxShadow: '0 4px 22px rgba(201,168,76,0.38)',
                  }}>{step.num}</div>
                  <div style={{ fontSize: '2rem', marginBottom: 12 }}>{step.icon}</div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', color: 'var(--white)', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ PRICING ═════════════════════════════ */}
      <section id="pricing" className="section-pad" style={{ padding: '100px 48px', background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <div style={S.goldLine} />
            <p style={{ color: 'var(--gray-mid)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '1.05rem' }}>
              No hidden fees. No subscriptions (unless you want them).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 24, alignItems: 'start' }}>
            {pricingTiers.map((tier, i) => (
              <div
                key={i}
                className={`pricing-card${tier.featured ? ' featured' : ''}`}
                style={{ transform: tier.featured ? 'scale(1.04)' : 'none', position: 'relative' }}
              >
                {/* Header */}
                <div style={{
                  padding: '30px 28px 24px',
                  background: tier.featured ? 'linear-gradient(135deg,var(--plum) 0%,var(--plum-light) 100%)' : 'rgba(255,255,255,0.02)',
                  borderBottom: '1px solid rgba(201,168,76,0.1)',
                  position: 'relative',
                }}>
                  {tier.badge && (
                    <div style={{
                      position: 'absolute', top: -13, right: 24,
                      padding: '4px 16px', borderRadius: 50,
                      background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))',
                      fontFamily: 'Poppins', fontSize: '0.68rem', fontWeight: 800,
                      color: 'var(--black)', letterSpacing: '0.1em',
                      boxShadow: '0 4px 14px rgba(201,168,76,0.45)',
                    }}>
                      <span className="shimmer-text">{tier.badge}</span>
                    </div>
                  )}
                  <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.13em', color: tier.featured ? 'rgba(255,255,255,0.65)' : 'var(--gray-mid)', marginBottom: 10 }}>{tier.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '3rem', color: 'var(--white)', lineHeight: 1 }}>{tier.price}</span>
                    <span style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'var(--gray-mid)' }}>{tier.period}</span>
                  </div>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.88rem', color: tier.featured ? 'rgba(255,255,255,0.65)' : 'var(--gray-mid)', lineHeight: 1.5 }}>{tier.desc}</p>
                </div>

                {/* Features */}
                <div style={{ padding: '24px 28px 30px' }}>
                  {tier.features.map((f, j) => (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '9px 0',
                      borderBottom: j < tier.features.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}>
                      <span style={{ fontSize: '0.85rem', color: f ? 'var(--gold)' : 'var(--gray-dark)', flexShrink: 0 }}>{f ? '✓' : '—'}</span>
                      <span style={{ fontFamily: 'Poppins', fontSize: '0.88rem', fontWeight: 400, color: f ? 'var(--white)' : 'var(--gray-dark)' }}>{f || '—'}</span>
                    </div>
                  ))}
                  <button
                    className={tier.featured ? 'btn-gold' : 'btn-ghost'}
                    style={{
                      width: '100%', marginTop: 26,
                      borderRadius: 10, padding: '13px',
                      fontSize: '0.95rem',
                      ...(tier.featured ? {} : { color: 'var(--gold)', borderColor: 'rgba(201,168,76,0.4)' }),
                    }}
                  >{tier.cta}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═════════════════════════════ */}
      <section className="section-pad" style={{ padding: '100px 48px', background: 'var(--off-black)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="section-title">Trusted by 10,000+ Business Owners</h2>
            <div style={S.goldLine} />
            <p style={{ color: 'var(--gray-mid)', fontFamily: 'Poppins', fontWeight: 300, fontSize: '1.05rem' }}>
              Real results from real entrepreneurs
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 28 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ color: 'var(--gold)', fontSize: '0.95rem', letterSpacing: 2, marginBottom: 18 }}>★★★★★</div>
                <p style={{
                  fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.96rem',
                  color: 'rgba(255,255,255,0.82)', lineHeight: 1.78,
                  marginBottom: 26, fontStyle: 'italic',
                }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%',
                    background: t.color, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.78rem', color: 'var(--white)',
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.93rem', color: 'var(--white)' }}>{t.name}</div>
                    <div style={{ fontFamily: 'Poppins', fontSize: '0.78rem', color: 'var(--lavender)', marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEWSLETTER / CTA ══════════════════════════ */}
      <section style={{
        padding: '110px 48px 120px',
        background: 'linear-gradient(135deg,var(--gold-dark) 0%,var(--gold) 35%,var(--plum-light) 65%,var(--plum) 100%)',
        clipPath: 'polygon(0 7%,100% 0,100% 93%,0 100%)',
        margin: '0',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: 50,
            background: 'rgba(0,0,0,0.15)', marginBottom: 22,
            fontFamily: 'Poppins', fontSize: '0.72rem', fontWeight: 700,
            color: 'rgba(0,0,0,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>Limited Time Offer</div>

          <h2 style={{
            fontFamily: 'Poppins', fontWeight: 900,
            fontSize: 'clamp(1.9rem,4vw,3rem)',
            color: 'var(--black)', marginBottom: 16, lineHeight: 1.18,
          }}>
            Get 3 Free Templates<br />When You Join Today
          </h2>
          <p style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '1rem', color: 'rgba(0,0,0,0.55)', marginBottom: 36, lineHeight: 1.6 }}>
            Join 10,000+ entrepreneurs getting premium storefronts, design tips, and exclusive deals.
          </p>

          <div className="newsletter-flex" style={{ display: 'flex', gap: 12, maxWidth: 490, margin: '0 auto', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: '1 1 220px', padding: '14px 22px',
                borderRadius: 50, border: '2px solid rgba(0,0,0,0.1)',
                outline: 'none', fontFamily: 'Poppins', fontSize: '0.93rem',
                background: 'rgba(255,255,255,0.35)',
                color: 'var(--black)',
                backdropFilter: 'blur(10px)',
              }}
            />
            <button
              style={{
                flexShrink: 0, padding: '14px 28px', borderRadius: 50, border: 'none',
                background: 'var(--black)', color: 'var(--white)',
                fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.88rem',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
                animation: 'pulse 2.5s ease-in-out infinite',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#222'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--black)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Claim My Free Templates
            </button>
          </div>
          <p style={{ fontFamily: 'Poppins', fontSize: '0.76rem', color: 'rgba(0,0,0,0.4)', marginTop: 14 }}>
            No credit card required. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ════════════════════════════ FOOTER ══════════════════════════════ */}
      <footer style={{
        background: 'var(--black)',
        paddingTop: 80,
        borderTop: '1px solid rgba(201,168,76,0.12)',
        position: 'relative',
      }}>
        {/* Top gold accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,var(--gold),var(--gold-light),var(--gold),transparent)' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
            {/* Brand col */}
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.05em', marginBottom: 14 }}>
                <span className="gold-text">STOREFRONT</span>
                <span style={{ color: 'var(--white)', marginLeft: 5 }}>STUDIO</span>
              </div>
              <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.86rem', color: 'var(--gray-mid)', lineHeight: 1.7, maxWidth: 210, marginBottom: 26 }}>
                Premium ecommerce templates for entrepreneurs who refuse to settle for average.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { label: '𝕏',  title: 'Twitter' },
                  { label: '◉',  title: 'Instagram' },
                  { label: 'in', title: 'LinkedIn' },
                  { label: '⊕',  title: 'Pinterest' },
                ].map((s, i) => (
                  <div key={i} title={s.title} style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--charcoal)', border: '1px solid var(--gray-dark)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: '0.8rem', color: 'var(--gray-mid)',
                    transition: 'all 0.2s ease', userSelect: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-dark)'; e.currentTarget.style.color = 'var(--gray-mid)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >{s.label}</div>
                ))}
              </div>
            </div>

            {[
              { heading: 'Templates', links: ['All Templates','Fashion & Apparel','Beauty & Cosmetics','Restaurant & Food','Fitness & Gym'] },
              { heading: 'Company',   links: ['About Us','Blog','Careers','Press Kit','Affiliates'] },
              { heading: 'Support',   links: ['Help Center','Contact Us','Live Chat','Documentation','Status Page'] },
              { heading: 'Legal',     links: ['Privacy Policy','Terms of Service','License Agreement','Refund Policy','Cookie Policy'] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.8rem', color: 'var(--white)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>{col.heading}</div>
                {col.links.map((link, j) => (
                  <a key={j} href="#" style={{
                    display: 'block', fontFamily: 'Poppins', fontSize: '0.86rem',
                    fontWeight: 300, color: 'var(--gray-mid)', textDecoration: 'none',
                    marginBottom: 10, transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-mid)'}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(201,168,76,0.12)',
            padding: '22px 0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 12,
          }}>
            <span style={{ fontFamily: 'Poppins', fontSize: '0.8rem', color: 'var(--gray-mid)' }}>
              © 2025 Storefront Studio. All rights reserved.
            </span>
            <span style={{ fontFamily: 'Poppins', fontSize: '0.8rem', color: 'var(--gray-dark)' }}>
              Crafted with precision & passion. ✦
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
