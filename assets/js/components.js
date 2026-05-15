// ================================================================
//  SS Coconuts — components.js
//  Injects shared Navbar + Footer into every page.
//  Automatically resolves asset paths based on page depth.
// ================================================================

(function () {
  // ── Path resolver ─────────────────────────────────────────────
  // Pages in /pages/ are one level deeper, so assets need '../'
  const depth = window.location.pathname.includes('/pages/') ? '../' : '';
  const root  = depth || '';            // '' for root, '../' for /pages/

  // Resolve the current page filename to highlight the active nav link
  const page  = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(pageNames) {
    return pageNames.some(p => page === p || window.location.pathname.endsWith('/' + p))
      ? 'active' : '';
  }

  // ── Navbar HTML ───────────────────────────────────────────────
  const navbarHTML = `
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 bg-white" role="navigation" aria-label="Main navigation">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between" style="height:80px;">

      <!-- Logo -->
      <a href="${root}index.html" class="flex items-center" id="logoLink">
        <img src="${root}assets/images/logo/logo.png" alt="SS Coconuts Logo" style="width:100px;height:100px;object-fit:contain;" />
      </a>

      <!-- Desktop Menu -->
      <ul class="hidden lg:flex items-center gap-8">
        <li><a href="${root}index.html"          class="nav-link ${isActive(['index.html'])}"          id="navHome">Home</a></li>
        <li><a href="${root}about.html"           class="nav-link ${isActive(['about.html'])}"          id="navAbout">About</a></li>
        <li><a href="${root}products.html"  class="nav-link ${isActive(['products.html'])}"  id="navProducts">Products</a></li>
        <li><a href="${root}contact.html"   class="nav-link ${isActive(['contact.html'])}"   id="navContact">Contact Us</a></li>
      </ul>

      <!-- CTA + Hamburger -->
      <div class="flex items-center gap-3">
        <button id="navCta" onclick="openQuoteModal()"
          class="hidden md:inline-flex btn btn-primary text-sm rounded-md"
          style="padding:10px 20px;">
          <i class="fa-solid fa-paper-plane" style="font-size:11px;"></i> Get a Quote
        </button>
        <button id="menuBtn" class="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Open menu">
          <i class="fa-solid fa-bars text-gray-700 text-xl"></i>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Drawer -->
  <div id="mobileMenu" class="fixed inset-y-0 right-0 w-72 bg-white z-50 shadow-2xl" role="dialog" aria-label="Mobile menu">
    <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
      <span class="font-bold text-gray-900">Menu</span>
      <button id="closeMenu" class="p-2 hover:bg-gray-100 rounded-md" aria-label="Close menu">
        <i class="fa-solid fa-xmark text-gray-600 text-xl"></i>
      </button>
    </div>
    <ul class="flex flex-col px-6 py-6 gap-5">
      <li><a href="${root}index.html"         class="font-medium text-gray-700 hover:text-primary transition-colors">Home</a></li>
      <li><a href="${root}about.html"          class="font-medium text-gray-700 hover:text-primary transition-colors">About</a></li>
      <li><a href="${root}products.html" class="font-medium text-gray-700 hover:text-primary transition-colors">Products</a></li>
      <li><a href="${root}contact.html"  class="font-medium text-gray-700 hover:text-primary transition-colors">Contact Us</a></li>
      <li class="pt-2">
        <button onclick="openQuoteModal()" class="btn btn-primary w-full justify-center rounded-md">Get a Quote</button>
      </li>
    </ul>
  </div>

  <!-- ============================================================
       QUOTE MODAL
  ============================================================ -->
  <div id="quoteModal" role="dialog" aria-modal="true" aria-labelledby="quoteModalTitle"
       style="display:none; position:fixed; inset:0; z-index:10000; align-items:center; justify-content:center; padding:16px;">
    <!-- Backdrop -->
    <div id="quoteBackdrop"
         style="position:absolute; inset:0; background:rgba(0,0,0,.52); backdrop-filter:blur(4px);">
    </div>
    <!-- Panel -->
    <div style="position:relative; z-index:1; background:#fff; border-radius:16px;
                box-shadow:0 24px 64px rgba(0,0,0,.22); width:100%; max-width:420px;
                overflow:hidden; animation:quoteSlideIn .28s cubic-bezier(.34,1.56,.64,1);">

      <!-- Header -->
      <div style="background:var(--primary); padding:18px 22px; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:34px; height:34px; background:rgba(255,255,255,.2); border-radius:50%;
                      display:flex; align-items:center; justify-content:center;">
            <i class="fa-solid fa-paper-plane" style="color:#fff; font-size:13px;"></i>
          </div>
          <div>
            <p id="quoteModalTitle" style="font-weight:700; color:#fff; font-size:.95rem; margin:0;">Request a Quote</p>
            <p style="color:rgba(255,255,255,.75); font-size:.72rem; margin:0;">We'll get back within 24 hours</p>
          </div>
        </div>
        <button id="quoteCloseBtn" aria-label="Close quote modal"
                style="background:rgba(255,255,255,.18); border:none; border-radius:50%; width:30px; height:30px;
                       display:flex; align-items:center; justify-content:center; cursor:pointer; transition:.2s;">
          <i class="fa-solid fa-xmark" style="color:#fff; font-size:14px;"></i>
        </button>
      </div>

      <!-- Body -->
      <div style="padding:22px;">

        <!-- Success state (hidden by default) -->
        <div id="quoteSuccess" style="display:none; text-align:center; padding:16px 0;">
          <div style="width:56px; height:56px; background:#ecfdf5; border-radius:50%;
                      display:flex; align-items:center; justify-content:center; margin:0 auto 14px;">
            <i class="fa-solid fa-circle-check" style="color:#16a34a; font-size:26px;"></i>
          </div>
          <p style="font-weight:700; font-size:1rem; color:#111; margin-bottom:6px;">Quote Requested!</p>
          <p style="font-size:.8rem; color:#666;">Thank you! Our team will contact you shortly.</p>
        </div>

        <!-- Form -->
        <form id="quoteForm" novalidate>
          <div style="display:grid; gap:12px;">

            <div>
              <label style="font-size:.75rem; font-weight:600; color:#444; display:block; margin-bottom:5px;">Your Name *</label>
              <input id="qName" type="text" placeholder="e.g. Rajan Kumar" required
                     style="width:100%; border:1.5px solid #e0e0e0; border-radius:8px; padding:9px 12px;
                            font-size:.84rem; font-family:'Poppins',sans-serif; outline:none; transition:.2s;
                            color:#111;" />
            </div>

            <div>
              <label style="font-size:.75rem; font-weight:600; color:#444; display:block; margin-bottom:5px;">Phone Number *</label>
              <input id="qPhone" type="tel" placeholder="+91 XXXXX XXXXX" required
                     style="width:100%; border:1.5px solid #e0e0e0; border-radius:8px; padding:9px 12px;
                            font-size:.84rem; font-family:'Poppins',sans-serif; outline:none; transition:.2s;
                            color:#111;" />
            </div>

            <div>
              <label style="font-size:.75rem; font-weight:600; color:#444; display:block; margin-bottom:5px;">Product Interest</label>
              <select id="qProduct"
                      style="width:100%; border:1.5px solid #e0e0e0; border-radius:8px; padding:9px 12px;
                             font-size:.84rem; font-family:'Poppins',sans-serif; outline:none;
                             background:#fff; color:#444; transition:.2s;">
                <option value="">Select a product…</option>
                <option>Pollachi Coconut</option>
                <option>Semi Husked Coconut</option>
                <option>Brown Fresh Coconut</option>
                <option>Peravurani Coconut</option>
                <option>Export Semi Husked Coconut</option>
                <option>Other / Not Sure</option>
              </select>
            </div>

            <div>
              <label style="font-size:.75rem; font-weight:600; color:#444; display:block; margin-bottom:5px;">Estimated Quantity</label>
              <input id="qQty" type="text" placeholder="e.g. 500 nuts / 2 tonnes"
                     style="width:100%; border:1.5px solid #e0e0e0; border-radius:8px; padding:9px 12px;
                            font-size:.84rem; font-family:'Poppins',sans-serif; outline:none; transition:.2s;
                            color:#111;" />
            </div>

          </div>

          <!-- Error msg -->
          <p id="quoteError" style="display:none; font-size:.75rem; color:var(--primary); margin-top:10px;"></p>

          <button id="quoteSubmitBtn" type="submit"
                  style="margin-top:16px; width:100%; background:var(--primary); color:#fff;
                         border:none; border-radius:8px; padding:11px;
                         font-family:'Poppins',sans-serif; font-size:.88rem; font-weight:600;
                         cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
                         transition:.25s;">
            <i class="fa-solid fa-paper-plane" id="quoteBtnIcon" style="font-size:12px;"></i>
            <span id="quoteBtnText">Send Message</span>
            <svg id="quoteSpinner" style="display:none; width:16px; height:16px; animation:spin 1s linear infinite;"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle style="opacity:.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path style="opacity:.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 22 6.477 22 12h-4z"></path>
            </svg>
          </button>

          <p style="text-align:center; font-size:.72rem; color:#999; margin-top:10px;">
            Or call us: <a href="tel:+919360311236" style="color:var(--primary); font-weight:600;">+91 9360311236</a>
          </p>
        </form>

      </div>
    </div>
  </div>
  `;

  // ── Footer HTML ───────────────────────────────────────────────
  const footerHTML = `
  <footer style="background:rgba(184,41,47,0.1);" class="pt-12 pb-0">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">

        <!-- Logo + Social Media -->
        <div class="flex flex-col gap-5">
          <a href="${root}index.html">
            <img src="${root}assets/images/logo/logo.png" alt="SS Coconuts Logo" style="width:180px;" />
          </a>
          <p style="font-size:.78rem;" class="text-gray-500 leading-relaxed max-w-xs">
            Premium coconut supplier from Tamil Nadu, trusted by retailers and exporters across India and the Middle East since 1989.
          </p>

          <!-- Social Icons -->
          <div>
            <p style="font-size:.7rem; letter-spacing:.1em; font-weight:700; text-transform:uppercase; color:#111; margin-bottom:10px;">Follow Us</p>
            <div style="display:flex; gap:10px; align-items:center;">
              <a href="https://www.facebook.com/sscoconuts" target="_blank" rel="noopener noreferrer"
                 aria-label="SS Coconuts on Facebook"
                 style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:rgba(184,41,47,0.1);color:#b8292f;text-decoration:none;transition:background .2s,color .2s;"
                 onmouseover="this.style.background='#b8292f';this.style.color='#fff';"
                 onmouseout="this.style.background='rgba(184,41,47,0.1)';this.style.color='#b8292f';">
                <i class="fa-brands fa-facebook-f" style="font-size:13px;"></i>
              </a>
              <a href="https://www.instagram.com/sscoconuts" target="_blank" rel="noopener noreferrer"
                 aria-label="SS Coconuts on Instagram"
                 style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:rgba(184,41,47,0.1);color:#b8292f;text-decoration:none;transition:background .2s,color .2s;"
                 onmouseover="this.style.background='#b8292f';this.style.color='#fff';"
                 onmouseout="this.style.background='rgba(184,41,47,0.1)';this.style.color='#b8292f';">
                <i class="fa-brands fa-instagram" style="font-size:13px;"></i>
              </a>
              <a href="https://wa.me/919360311236" target="_blank" rel="noopener noreferrer"
                 aria-label="Contact SS Coconuts on WhatsApp"
                 style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:rgba(184,41,47,0.1);color:#b8292f;text-decoration:none;transition:background .2s,color .2s;"
                 onmouseover="this.style.background='#b8292f';this.style.color='#fff';"
                 onmouseout="this.style.background='rgba(184,41,47,0.1)';this.style.color='#b8292f';">
                <i class="fa-brands fa-whatsapp" style="font-size:13px;"></i>
              </a>
              <a href="https://www.youtube.com/@sscoconuts" target="_blank" rel="noopener noreferrer"
                 aria-label="SS Coconuts on YouTube"
                 style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:rgba(184,41,47,0.1);color:#b8292f;text-decoration:none;transition:background .2s,color .2s;"
                 onmouseover="this.style.background='#b8292f';this.style.color='#fff';"
                 onmouseout="this.style.background='rgba(184,41,47,0.1)';this.style.color='#b8292f';">
                <i class="fa-brands fa-youtube" style="font-size:13px;"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Explore + Support -->
        <div class="flex flex-col gap-8">
          <div>
            <h4 style="font-size:.7rem; letter-spacing:.1em;" class="font-bold text-gray-900 uppercase tracking-widest mb-4">Explore</h4>
            <ul class="space-y-2">
              <li><a href="${root}index.html"         class="footer-link">Home</a></li>
              <li><a href="${root}about.html"          class="footer-link">About</a></li>
              <li><a href="${root}contact.html"  class="footer-link">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 style="font-size:.7rem; letter-spacing:.1em;" class="font-bold text-gray-900 uppercase tracking-widest mb-4">Support &amp; Help</h4>
            <ul class="space-y-2">
              <li><a href="${root}contact.html" class="footer-link">Bulk Enquiry / Get Quote</a></li>
              <li><a href="#" class="footer-link">How to Order</a></li>
              <li><a href="${root}faq.html" class="footer-link">FAQs</a></li>
            </ul>
          </div>
        </div>

        <!-- Products + Legal -->
        <div class="flex flex-col gap-8">
          <div>
            <h4 style="font-size:.7rem; letter-spacing:.1em;" class="font-bold text-gray-900 uppercase tracking-widest mb-4">Products &amp; Supply</h4>
            <ul class="space-y-2">
              <li><a href="${root}products.html" class="footer-link">Our Products</a></li>
              <li><a href="#" class="footer-link">Domestic Supply</a></li>
              <li><a href="#" class="footer-link">Export Supply</a></li>
              <li><a href="#" class="footer-link">Industries Served</a></li>
            </ul>
          </div>
          <div>
            <h4 style="font-size:.7rem; letter-spacing:.1em;" class="font-bold text-gray-900 uppercase tracking-widest mb-4">Legal Policies</h4>
            <ul class="space-y-2">
              <li><a href="${root}privacy-policy.html" class="footer-link">Privacy Policy</a></li>
              <li><a href="${root}terms.html" class="footer-link">Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>

        <!-- Operations -->
        <div>
          <h4 style="font-size:.7rem; letter-spacing:.1em;" class="font-bold text-gray-900 uppercase tracking-widest mb-4">Operations &amp; Quality</h4>
          <ul class="space-y-2">
            <li><a href="#" class="footer-link">Quality Assurance</a></li>
            <li><a href="#" class="footer-link">Infrastructure / Sourcing</a></li>
            <li><a href="${root}contact.html" class="footer-link">Contact Us</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-bold text-gray-900 text-sm mb-5">Contact Us</h4>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <i class="fa-solid fa-location-dot text-gray-700 mt-1" style="font-size:13px;"></i>
              <p class="text-gray-600 leading-relaxed" style="font-size:.75rem;">
                Lucky Enterprises,<br />
                No.5, Jayam Nagar Ist Street,<br />
                Muthamil Nagar, Medical College Road,<br />
                Thanjavur - 613007, Tamilnadu.
              </p>
            </li>
            <li class="flex items-start gap-3">
              <i class="fa-solid fa-phone text-gray-700 mt-1" style="font-size:13px;"></i>
              <div class="text-gray-600" style="font-size:.75rem;">
                <p>+91 4362 240114</p>
                <p>+91 9360311236</p>
              </div>
            </li>
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-envelope text-gray-700" style="font-size:13px;"></i>
              <a href="mailto:sscoconutss@yahoo.com" class="text-gray-600 hover:text-primary transition-colors" style="font-size:.75rem;">
                sscoconutss@yahoo.com
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div style="background:rgba(0,0,0,.12);">
      <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-gray-700" style="font-size:.72rem;">© 2026 SS Coconuts. All Rights Reserved.</p>
        <p class="text-gray-700" style="font-size:.72rem;">Designed by <a href="https://modominds.com/" target="_blank" rel="noopener noreferrer" style="color:#b8292f;font-weight:600;text-decoration:none;transition:opacity .2s;" onmouseover="this.style.opacity='0.75';" onmouseout="this.style.opacity='1';">Modo Minds</a></p>
      </div>
    </div>
  </footer>

  <!-- Go To Top Button -->
  <button id="goTopBtn" aria-label="Back to top" title="Back to top">
    <i class="fa-solid fa-chevron-up"></i>
  </button>
  `;

  // ── Inject into page ──────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {

    // Inject Navbar before <body>'s first child
    const navWrapper = document.createElement('div');
    navWrapper.innerHTML = navbarHTML.trim();
    document.body.prepend(...navWrapper.childNodes);

    // Inject Footer at end of <body>
    const footerWrapper = document.createElement('div');
    footerWrapper.innerHTML = footerHTML.trim();
    document.body.append(...footerWrapper.childNodes);

    // Add top padding to the first content element so it clears the fixed navbar
    const firstContent = document.querySelector('.page-content');
    if (firstContent && !firstContent.style.marginTop) {
      firstContent.style.marginTop = '80px';
    }

    // ── Mobile menu toggle ──────────────────────────────────────
    const menuBtn    = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenu');

    menuBtn?.addEventListener('click', () => mobileMenu?.classList.add('open'));
    closeMenuBtn?.addEventListener('click', () => mobileMenu?.classList.remove('open'));

    document.addEventListener('click', (e) => {
      if (
        mobileMenu?.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !menuBtn?.contains(e.target)
      ) {
        mobileMenu.classList.remove('open');
      }
    });

    // ── Sticky navbar ────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ── Go To Top ────────────────────────────────────────────────
    const goTopBtn = document.getElementById('goTopBtn');
    if (goTopBtn) {
      window.addEventListener('scroll', () => {
        goTopBtn.classList.toggle('show', window.scrollY > 300);
      }, { passive: true });
      goTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

  });

})();

// ── Quote Modal helpers (global scope so onclick= works) ────────────────────
function openQuoteModal() {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;
  // Reset to form view
  document.getElementById('quoteSuccess').style.display = 'none';
  document.getElementById('quoteForm').style.display    = 'block';
  document.getElementById('quoteError').style.display   = 'none';
  document.getElementById('quoteForm').reset();
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  // Close mobile drawer if open
  document.getElementById('mobileMenu')?.classList.remove('open');
}
function closeQuoteModal() {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Wire up close button + backdrop after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('quoteCloseBtn')?.addEventListener('click', closeQuoteModal);
  document.getElementById('quoteBackdrop')?.addEventListener('click', closeQuoteModal);

  // Focus-border highlight for inputs
  document.querySelectorAll('#quoteForm input, #quoteForm select').forEach(el => {
    el.addEventListener('focus',  () => el.style.borderColor = 'var(--primary)');
    el.addEventListener('blur',   () => el.style.borderColor = '#e0e0e0');
  });

  // ── Quote Modal — Formsubmit.co ──
  const QUOTE_FORMSPREE = 'https://formspree.io/f/xzdorlnn';


  document.getElementById('quoteForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name    = document.getElementById('qName').value.trim();
    const phone   = document.getElementById('qPhone').value.trim();
    const product = document.getElementById('qProduct').value;
    const qty     = document.getElementById('qQty').value.trim();

    const errorEl   = document.getElementById('quoteError');
    const submitBtn = document.getElementById('quoteSubmitBtn');
    const btnText   = document.getElementById('quoteBtnText');
    const btnIcon   = document.getElementById('quoteBtnIcon');
    const spinner   = document.getElementById('quoteSpinner');

    // Validate
    if (!name || !phone) {
      errorEl.textContent = '⚠️ Please enter your name and phone number.';
      errorEl.style.display = 'block';
      return;
    }
    errorEl.style.display = 'none';

    // Loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.style.display = 'none';
    spinner.style.display = 'inline-block';

    try {
      const res = await fetch(QUOTE_FORMSPREE, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({
          name,
          phone,
          product:  product || '—',
          quantity: qty     || '—',
          _subject: `New Quote Request from ${name}`
        })
      });

      if (res.ok) {
        // Show success state
        document.getElementById('quoteForm').style.display    = 'none';
        document.getElementById('quoteSuccess').style.display = 'flex';
        document.getElementById('quoteSuccess').style.flexDirection = 'column';
        document.getElementById('quoteSuccess').style.alignItems = 'center';
      } else {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }
    } catch (err) {
      errorEl.textContent = '❌ Failed to send. Please call +91 9360311236 directly.';
      errorEl.style.display = 'block';
      console.error('Quote form error:', err);
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      btnIcon.style.display = 'inline';
      spinner.style.display = 'none';
    }
  });

  // Spinner keyframes (injected once)
  if (!document.getElementById('quoteSpinnerStyle')) {
    const style = document.createElement('style');
    style.id = 'quoteSpinnerStyle';
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }
});
