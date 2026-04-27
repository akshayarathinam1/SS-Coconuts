# SS Coconuts — B2B & Export Website

Welcome to the **SS Coconuts** (Lucky Enterprises) website repository. This project consists of a high-performance, fully responsive frontend built with plain HTML, Tailwind CSS, and vanilla JavaScript, paired with a lightweight Node.js backend to handle email communications via Nodemailer.

## 🚀 Features

*   **Modern UI/UX**: Premium, clean design with Tailwind CSS and custom animations.
*   **Fully Responsive**: Optimised for mobile, tablet, and desktop devices.
*   **Reusable Components**: Navbar and Footer are injected dynamically via JavaScript (`components.js`) for easy site-wide updates.
*   **Dynamic Modals**: Quick "Get a Quote" modal accessible from the navigation.
*   **Integrated Backend**: Custom Express/Nodemailer backend for securely processing the contact form and quote requests.
*   **Legal & SEO Ready**: Complete with Terms & Conditions, Privacy Policy, and structured metadata.

---

## 🛠️ Technology Stack

**Frontend:**
*   HTML5
*   Vanilla CSS (Custom tokens in `styles.css`)
*   Tailwind CSS (via CDN for rapid utility classes)
*   Vanilla JavaScript (ES6+)
*   FontAwesome (Icons)

**Backend:**
*   Node.js
*   Express.js (Routing & API endpoints)
*   Nodemailer (Email transmission)
*   CORS & Dotenv

---

## 💻 How to Run the Project Locally

To run the full stack locally (both the frontend website and the backend email server), follow these steps:

### 1. Backend Setup (Contact Form API)

The backend handles the `/api/contact` endpoint which dispatches emails to the admin when a user submits a form.

1.  Open your terminal and navigate to the project root directory.
2.  Install the required Node.js dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and configure your email credentials:
    ```env
    PORT=3000
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_app_password
    ```
4.  Start the backend server:
    *   For standard production execution:
        ```bash
        npm start
        ```
        *(This runs `node server.js`)*
    *   For development with auto-reloading:
        ```bash
        npm run dev
        ```
        *(This runs `nodemon server.js`)*

The server will start running on `http://localhost:3000`.

### 2. Frontend Setup

Because the frontend uses standard HTML/CSS/JS, it does not require a build step. However, to avoid CORS issues and properly resolve local paths, you should serve it via a local web server.

1.  Use an extension like **Live Server** in VS Code, or use a simple command-line server:
    ```bash
    npx serve .
    ```
2.  Open the provided localhost link in your browser (e.g., `http://localhost:5000` or `http://127.0.0.1:5500`).

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
├── server.js         # Express.js backend for email handling
├── package.json      # Node.js dependencies
└── .gitignore        # Ignored files (node_modules, .env, etc.)
\`\`\`

---

## 🔧 Maintenance Notes

*   **Editing the Navbar/Footer**: Do not edit these in individual HTML files. Make your changes in `assets/js/components.js` so they propagate across the entire website automatically.
*   **Colors & Themes**: Brand colours (like the signature red) are defined as CSS variables (e.g., `--primary`) at the top of `assets/css/styles.css`. Updating the variable there will update the brand color site-wide.
