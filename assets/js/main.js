// ============================================================
//  SS Coconuts — main.js
//  Navigation · Carousel · Counter · Scroll Animations
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Sticky Navbar ─────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ── 2. Mobile Menu Toggle ───────────────────────────── */
  const menuBtn  = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu  = document.getElementById('closeMenu');

  menuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.remove('translate-x-full');
    mobileMenu?.classList.add('translate-x-0');
  });
  closeMenu?.addEventListener('click', () => {
    mobileMenu?.classList.remove('translate-x-0');
    mobileMenu?.classList.add('translate-x-full');
  });

  /* ── 3. Product Carousel ─────────────────────────────── */
  const track   = document.getElementById('productTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let   currentIndex = 0;

  const getVisibleCount = () => {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  };

  const updateCarousel = () => {
    if (!track) return;
    const cards  = track.querySelectorAll('.product-card');
    const count  = getVisibleCount();
    const maxIdx = Math.max(0, cards.length - count);
    currentIndex = Math.min(Math.max(currentIndex, 0), maxIdx);
    const pct    = (100 / count) * currentIndex;
    track.style.transform = `translateX(-${pct}%)`;
  };

  prevBtn?.addEventListener('click', () => { currentIndex--; updateCarousel(); });
  nextBtn?.addEventListener('click', () => { currentIndex++; updateCarousel(); });
  window.addEventListener('resize', updateCarousel);

  /* ── 4. Gallery Lightbox ─────────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightboxImg');
  const closeLightbox = document.getElementById('closeLightbox');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (lightboxImg && src) { lightboxImg.src = src; }
      lightbox?.classList.remove('hidden');
      lightbox?.classList.add('flex');
    });
  });
  const hideLightbox = () => {
    lightbox?.classList.add('hidden');
    lightbox?.classList.remove('flex');
  };
  closeLightbox?.addEventListener('click', hideLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) hideLightbox(); });

  /* ── 5. Animated Counters ────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const step     = target / (duration / 16);
    let   current  = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 16);
  };

  /* ── 6. Intersection Observer — Reveal + Counters ────── */
  const revealEls = document.querySelectorAll('.reveal');
  const countersDone = new Set();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Reveal animation
      entry.target.classList.add('visible');

      // Counter trigger
      counters.forEach(c => {
        if (entry.target.contains(c) && !countersDone.has(c)) {
          countersDone.add(c);
          animateCounter(c);
        }
      });
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
  counters.forEach(c => io.observe(c.closest('.stat-card') || c));

  /* ── 7. Active Nav Link on Scroll ───────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activeIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('text-primary'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        active?.classList.add('text-primary');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => activeIo.observe(s));
});
