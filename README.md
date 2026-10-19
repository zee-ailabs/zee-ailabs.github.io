# Muhammad Zaigham, AI Product Manager

A 3D portfolio with a built-in assistant. Static files only: no build step, no framework, no trackers. It runs on GitHub Pages as is.

## Put it online with GitHub Pages

1. On GitHub (account `zee-ailabs`), create a public repository named **`zee-ailabs.github.io`**. The site will live at `https://zee-ailabs.github.io`.
2. Upload everything in this folder to the repository, keeping the folder structure (drag and drop on github.com works).
3. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. Wait a minute or two. Your link appears at the top of the Pages settings.

Other projects like ModelFit can live in their own repositories and will appear at `https://zee-ailabs.github.io/modelfit`.

To use your own domain later (for an agency brand), add it under **Settings > Pages > Custom domain**.

## Contact and résumé

Email, phone, Calendly, LinkedIn and GitHub are set in `contact` in `assets/js/content.js`. Your résumé is at `assets/docs/Muhammad-Zaigham-Resume.pdf`; replace that file to update it, or set `resumeReady: false` to hide the button.

Your headshot is already in `assets/img/profile.jpg`. To swap it, replace that file (square, at least 800 x 800 px).

## Case study requests and feedback: one-time setup

Full case studies are not published on the site, so nobody can download them directly. A visitor clicks "Request full case study", enters an email, and you get an email (via FormSubmit) with their address and the case they want. You reply with the PDF yourself, so you always know who is reading. Your PDFs are kept outside the site folder.

The Feedback section at the bottom uses the same route: name and email are optional, the message is required, and replies go straight to the visitor when they leave an email.

The first time anyone submits a form on the live site, FormSubmit sends an activation email to muhammadzaigham697@gmail.com. Click the link once and every later request reaches your inbox. Test it yourself right after you go live.

## Google Analytics 4 (optional)

1. Go to analytics.google.com, create a property for the site and a Web data stream for https://zee-ailabs.github.io.
2. Copy the Measurement ID (it starts with G-).
3. Paste it into `analytics.ga4Id` in `assets/js/content.js` and commit.

GA4 then counts visits, countries, devices and these events: `case_request`, `demo_play`, `feedback_sent`, `twin_question`, `book_call_click`, `email_click`, `resume_open`, `linkedin_click`, `github_click`. It never receives emails, names or chat text, it skips visitors with Do Not Track or Global Privacy Control on, and the footer switches to a short analytics notice. GA4 shows anonymous trends, not who visited: the request and feedback forms are how you learn names.

## Update the content

Every word on the site, and everything the AI twin knows, comes from `assets/js/content.js`. Edit it, commit, and the site updates.

- **Case studies:** 8 featured tiles in `cases`, each with a demo; full PDFs are shared by email on request. `video` points to a demo in `assets/video/`.
- **Adding a demo:** export as MP4 (H.264), keep it under ~10 MB, put it in `assets/video/` with a matching `.jpg` poster, and set `video`.
- **Certificates:** each credential has `logo` (badge in `assets/img/certs/`), `date`, `valid`, `id` and `file` (the certificate in `assets/docs/certs/`). The PMP certificate has the citizenship line removed for privacy. CSM (active through Aug 2026) and the Lean Six Sigma Black Belt (current through Jul 2022) show their earned dates only; renew or update them when you can.
- **How I ship:** the lifecycle stages and techniques are in `plm`.
- **Systems and tools:** grouped in `toolkit`; they also feed the scrolling strip under the hero.
- **Hero and numbers:** `profile` and `proof`. Keep every number one you can defend in an interview.
- **Lab, playbook, academy, services:** plain text in the same file.

## The AI twin

The AI twin runs entirely in the browser and answers as short stories. It answers from `content.js`: experience, AI work, certifications, case studies, every KPI, discovery method and prioritization technique, plus contact and booking. It politely redirects salary, immigration and other personal questions to you.

To make it answer with a large language model, deploy `extras/assistant-worker.js` as a Cloudflare Worker (instructions inside the file) and put the Worker URL in `assistant.endpoint`. Your API key stays in the Worker, never in the website. If the Worker fails, the built-in assistant answers instead.

## Security

- A Content Security Policy in `index.html` only allows this site's own files, plus FormSubmit for the forms and Google Analytics (only loads if you add an ID). If you add the optional AI twin Worker, add its URL to `connect-src`.
- Three.js and the fonts are self-hosted, so the site makes no third-party requests on load. Until you add a GA4 ID it has no trackers or cookies.
- Everything shown on the page is escaped; visitor text in the AI twin and the form can never run as code.
- The request and feedback forms have a hidden honeypot field, input length limits, an 8-second timeout and per-browser caps (20 requests, 10 feedback messages).
- On slow devices the 3D scene lowers its resolution, then switches the page to a lighter rendering mode, so nothing stutters.

## Keep it unlisted if you prefer

The site is open to search engines by default so people can find you. To keep it link-only, add this inside `<head>` in `index.html`:

```html
<meta name="robots" content="noindex">
```

## What's inside

- `index.html` page structure
- `assets/css/styles.css` design, day and night themes
- `assets/js/content.js` all the words
- `assets/js/scene.js` the 3D core (Three.js r128, self-hosted in `assets/js/vendor/`)
- `assets/fonts/` Archivo, Geist and Geist Mono (SIL Open Font License)
- `assets/js/assistant.js` the portfolio assistant
- `assets/js/app.js` rendering and interactions
- `extras/assistant-worker.js` optional LLM backend for the assistant

Accessibility: full keyboard navigation, visible focus, a search palette (press `/`), and animation stops for anyone with reduced motion turned on.
