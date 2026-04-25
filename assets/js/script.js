// ================================================================
//  SS Coconuts — script.js
//  All page interactivity for index.html and inner pages
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Sticky Navbar ───────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 2. Mobile Menu ─────────────────────────────────────── */
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu  = document.getElementById('closeMenu');

  menuBtn?.addEventListener('click', () => mobileMenu?.classList.add('open'));
  closeMenu?.addEventListener('click', () => mobileMenu?.classList.remove('open'));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu?.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
    }
  });

  /* ── 3. Product Carousel ────────────────────────────────── */
  const track   = document.getElementById('productTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let   idx     = 0;

  const visibleCount = () => {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  };

  const updateCarousel = () => {
    if (!track) return;
    const cards  = track.querySelectorAll('.product-card');
    const count  = visibleCount();
    const maxIdx = Math.max(0, cards.length - count);
    idx = Math.min(Math.max(idx, 0), maxIdx);
    track.style.transform = `translateX(-${(100 / count) * idx}%)`;
  };

  prevBtn?.addEventListener('click', () => { idx--; updateCarousel(); });
  nextBtn?.addEventListener('click', () => { idx++; updateCarousel(); });
  window.addEventListener('resize', updateCarousel);

  /* ── 4. Gallery Lightbox ────────────────────────────────── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const closeLightbox = document.getElementById('closeLightbox');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (lightboxImg && src) lightboxImg.src = src;
      if (lightbox) {
        lightbox.style.display = 'flex';
      }
    });
  });

  const hideLightbox = () => {
    if (lightbox) lightbox.style.display = 'none';
  };
  closeLightbox?.addEventListener('click', hideLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) hideLightbox(); });

  /* Set initial display */
  if (lightbox) lightbox.style.display = 'none';

  /* ── 5. Animated Counters ───────────────────────────────── */
  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.count, 10);
    const suffix   = el.dataset.suffix || '';
    const start    = 0;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (target - start) * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ── 6. Intersection Observer — Reveal + Counters ────────── */
  const triggered = new WeakSet();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || triggered.has(entry.target)) return;
      triggered.add(entry.target);

      entry.target.classList.add('visible');

      // Trigger counters inside this element
      entry.target.querySelectorAll('[data-count]').forEach(counter => {
        if (!triggered.has(counter)) {
          triggered.add(counter);
          animateCounter(counter);
        }
      });

      // If the element itself is a counter
      if (entry.target.hasAttribute('data-count') && !triggered.has(entry.target)) {
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Observe reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));

  // Observe counter wrappers (stat sections)
  document.querySelectorAll('.stat-section').forEach(el => io.observe(el));

  /* ── 7. Active Nav Link on Scroll ───────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      active?.classList.add('active');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionIo.observe(s));

  /* ── 8. Smooth scroll for in-page anchors ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        // Close mobile menu if open
        mobileMenu?.classList.remove('open');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 9. Go To Top Button ────────────────────────────────── */
  const goTopBtn = document.getElementById('goTopBtn');
  if (goTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        goTopBtn.classList.add('show');
      } else {
        goTopBtn.classList.remove('show');
      }
    }, { passive: true });

    goTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
