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
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between" style="height:68px;">

      <!-- Logo -->
      <a href="${root}index.html" class="flex items-center" id="logoLink">
        <img src="${root}assets/images/logo/logo.png" alt="SS Coconuts Logo" class="h-12 w-auto object-contain" />
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
        <a href="${root}contact.html" id="navCta"
          class="hidden md:inline-flex btn btn-primary text-sm rounded-md"
          style="padding:10px 20px;">
          <i class="fa-solid fa-paper-plane" style="font-size:11px;"></i> Get a Quote
        </a>
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
        <a href="${root}contact.html" class="btn btn-primary w-full justify-center rounded-md">Get a Quote</a>
      </li>
    </ul>
  </div>
  `;

  // ── Footer HTML ───────────────────────────────────────────────
  const footerHTML = `
  <footer style="background:rgba(184,41,47,0.1);" class="pt-12 pb-0">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">

        <!-- Logo -->
        <div class="flex flex-col gap-5">
          <a href="${root}index.html">
            <img src="${root}assets/images/logo/logo.png" alt="SS Coconuts Logo" style="width:84px;" />
          </a>
          <p style="font-size:.78rem;" class="text-gray-500 leading-relaxed max-w-xs">
            Premium coconut supplier from Tamil Nadu, trusted by retailers and exporters across India and the Middle East since 1989.
          </p>
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
              <li><a href="#" class="footer-link">FAQs</a></li>
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
              <li><a href="#" class="footer-link">Privacy Policy</a></li>
              <li><a href="#" class="footer-link">Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>

        <!-- Operations -->
        <div>
          <h4 style="font-size:.7rem; letter-spacing:.1em;" class="font-bold text-gray-900 uppercase tracking-widest mb-4">Operations &amp; Quality</h4>
          <ul class="space-y-2">
            <li><a href="#" class="footer-link">Quality Assurance</a></li>
            <li><a href="#" class="footer-link">Infrastructure / Sourcing</a></li>
            <li><a href="#" class="footer-link">Certificates / Compliance</a></li>
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
        <p class="text-gray-700" style="font-size:.72rem;">Designed by Modominds</p>
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
      firstContent.style.marginTop = '68px';
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
