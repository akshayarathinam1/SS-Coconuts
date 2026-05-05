# SS Coconuts — B2B & Export Website

Welcome to the **SS Coconuts** (Lucky Enterprises) website repository. This project consists of a high-performance, fully responsive frontend built with plain HTML, Tailwind CSS, and vanilla JavaScript.

## 🚀 Features

*   **Modern UI/UX**: Premium, clean design with Tailwind CSS and custom animations.
*   **Fully Responsive**: Optimised for mobile, tablet, and desktop devices.
*   **Reusable Components**: Navbar and Footer are injected dynamically via JavaScript (`components.js`) for easy site-wide updates.
*   **Dynamic Modals**: Quick "Get a Quote" modal accessible from the navigation.
*   **Legal & SEO Ready**: Complete with Terms & Conditions, Privacy Policy, and structured metadata.

---

## 🛠️ Technology Stack

**Frontend:**
*   HTML5
*   Vanilla CSS (Custom tokens in `styles.css`)
*   Tailwind CSS (via CDN for rapid utility classes)
*   Vanilla JavaScript (ES6+)
*   FontAwesome (Icons)


---

## 💻 How to Run the Project Locally

Because the frontend uses standard HTML/CSS/JS, it does not require a build step. However, to properly resolve local paths, you should serve it via a local web server.

1.  Use an extension like **Live Server** in VS Code, or use a simple command-line server:
    ```bash
    npx serve .
    ```
2.  Open the provided localhost link in your browser (e.g., `http://localhost:3000` or `http://127.0.0.1:5500`).

---

## 📁 Project Structure

\`\`\`text
SS-Coconuts/
├── assets/
│   ├── css/          # Core stylesheets (styles.css)
│   ├── images/       # Optimised images and icons
│   └── js/           # JavaScript logic (script.js, components.js)
├── index.html        # Homepage
├── about.html        # About & Heritage page
├── products.html     # Coconut products portfolio
├── contact.html      # Contact form and interactive map
├── terms.html        # Terms and Conditions
├── privacy-policy.html # Privacy Policy
├── faq.html          # Frequently Asked Questions
└── .gitignore        # Ignored files
\`\`\`

---

## 🔧 Maintenance Notes

*   **Editing the Navbar/Footer**: Do not edit these in individual HTML files. Make your changes in `assets/js/components.js` so they propagate across the entire website automatically.
*   **Colors & Themes**: Brand colours (like the signature red) are defined as CSS variables (e.g., `--primary`) at the top of `assets/css/styles.css`. Updating the variable there will update the brand color site-wide.
