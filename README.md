# Portfolio Template (React + Firebase)

A clean, fast personal portfolio you can edit **from your phone or browser** —
no code changes needed after the one-time setup. Hosted free on GitHub Pages.

**What you get**
- Home page: hero with photo + cover banner, about/skills, experience timeline, latest work, social links
- Work page: projects and games, with "Read more" and optional Live + GitHub buttons
- Contact page with a working contact form
- Hidden admin panel to edit *everything* (text, photos, projects, skills, experience, themes, links)
- Visitor analytics dashboard (devices, browsers, pages, locations, time spent)
- Light and dark themes, switchable by visitors; add your own palettes in the admin panel

Everything you edit in the admin panel appears on the live site instantly — no rebuild, no GitHub push.

---

## One-time setup (~15 minutes)

### 1. Create a Firebase project (free, no card needed)
1. Go to https://console.firebase.google.com → **Add project** (skip Analytics).
2. **Build → Firestore Database → Create database** → production mode → any region.
3. In Firestore, open the **Rules** tab, replace everything with the contents of `firestore.rules` from this repo → **Publish**.
4. **Build → Authentication → Get started** → enable **Email/Password**.
5. In Authentication → **Users** → **Add user**: this email + password is your admin login.

### 2. Get your Firebase config
Project settings (gear icon) → **Your apps** → click the **</>** web icon → register the app.
You'll see `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.

### 3. Add them as GitHub secrets
In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**.
Names must match **exactly**:

| Secret name | Value from Firebase |
|---|---|
| `VITE_FIREBASE_API_KEY` | apiKey |
| `VITE_FIREBASE_AUTH_DOMAIN` | authDomain |
| `VITE_FIREBASE_PROJECT_ID` | projectId |
| `VITE_FIREBASE_STORAGE_BUCKET` | storageBucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
| `VITE_FIREBASE_APP_ID` | appId |
| `VITE_IMGBB_KEY` *(optional)* | free key from https://api.imgbb.com — enables "upload a photo" buttons |

### 4. Turn on GitHub Pages
Repo **Settings → Pages → Source: GitHub Actions**.

### 5. Push the code
Upload/push **the contents of this folder** to the repo root (so `package.json` and `src/` are at the top level, not inside a subfolder). Open the **Actions** tab and wait for a green check — your link is under **Settings → Pages**.

> If a build fails, open the failed run and read the red error — the most common causes are misspelled secret names or files sitting in a subfolder.

---

## Using the admin panel
- **Desktop:** press **Shift + L** on any page. **Phone:** double-tap anywhere on the page.
- Sign in with the email/password from step 1.5.
- **Site Settings** edits your name, tagline, photos, about text, skills, experience timeline, social links, contact details, and themes.
- **Projects & games**: add title, description, links and an image (paste a URL, or upload if you set up imgbb).
- **Analytics** button (top right of the admin panel) opens the visitor dashboard.

Tips
- Leave a field empty and that section simply hides (e.g. no skills added → no skills grid).
- The contact form needs a free Formspree form: create one at https://formspree.io, paste its URL into Site Settings → *Formspree URL*.
- Themes: with no custom themes, visitors get the built-in **Paper** (light) and **Slate** (dark) with a toggle in the top bar. Adding any theme in the admin panel replaces the built-ins; the first one in your list is the default.

## About visitor analytics (read this)
Analytics stores one record per browser: device, browser, OS, pages viewed, time on site, and an **approximate location (city/country)**. Location is looked up from the visitor's IP via a free third-party service (ipwho.is); the IP itself is never stored. Nothing identifies a visitor personally. If you serve visitors in the EU/UK or similar regions, consider mentioning this in a short privacy note, or remove the location lookup in `src/lib/visitorTracking.js` (`lookupApproxLocation`). The dashboard has a button to delete records older than 90 days.

## Run locally (optional)
```bash
npm install
cp .env.example .env     # fill in the Firebase values
npm run dev
```

## Project layout
```
src/components/   Navbar, Hero, About, Experience, Connect, WorkCard, Backdrop, ...
src/pages/        Home, Work, Contact, AdminLogin, AdminPanel, AdminAnalytics
src/lib/          firebase.js, data.js (settings schema), theme.js, visitor tracking
src/index.css     Color + font tokens (the Paper theme is the default)
firestore.rules   Paste into the Firebase console (Firestore → Rules)
.github/workflows/deploy.yml   Auto build + deploy on every push to main
```
