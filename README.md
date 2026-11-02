# CareerForge AI

One platform that takes a student from **learning → practice → proof → ranking → hired**, and makes selection easy for companies.
It combines Coursera (courses), LeetCode (coding), Testbook (mock tests and batches), LinkedIn (network and profiles), a resume maker, interview preparation and a hiring portal.

Built with Next.js 15 (App Router), React 19, Tailwind CSS v4 and the **Meta Model API** (Muse Spark).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 and create an account (student or company). Pages other than Home need a login. There is no built-in demo data: people, companies, jobs, posts and passports all come from real sign-ups. Without a backend the app still runs, keeping one local account in the browser.

### Meta AI setup
Copy `.env.example` to `.env.local` and set `META_API_KEY`, `META_API_BASE_URL` (`https://api.meta.ai/v1`) and `META_MODEL` (`muse-spark-1.2`). Without a key, AI features return demo answers.

## Sections and features

The sidebar and the in-app **Feature Map** (`/features`) both come from one file: `src/lib/nav.js`.

| Section | Page | Route | What it does |
|---|---|---|---|
| Home | Home | `/` | Landing page from the original design |
| | Dashboard | `/dashboard` | Score, streak, next problems, contests, matching jobs |
| | Search | `/search` | One search over courses, jobs, companies, people, problems and books |
| **Learn** | Courses | `/learn/courses` | Coursera-style courses → lessons → quiz → certificate |
| | AI Classroom | `/learn/classroom` | Avatar teacher builds a 5-slide lesson at your level, narrates it, checkpoint quizzes, re-explains when you're wrong, answers slide doubts |
| | Library | `/learn/library` | Books by subject; chapter notes written by Muse Spark in your language and cached |
| **Practice** | Coding | `/problems` | LeetCode-style problems; JavaScript runs in a Web Worker; AI hint/review |
| | Mock Tests | `/tests` | Timed placement, GATE and core CS tests |
| | Batches | `/batches` | Join a batch, take its scheduled tests, batch leaderboard |
| **Career** | Interviews | `/interviews` | Voice interviews with your custom avatar. **Defend Your Code** (GitHub) → public Verified Skills Passport that counts in the score. Technical, HR, Company and Rapid fire → private practice reports |
| | Avatar Studio | `/interviews/studio` | Design the interviewer/teacher: look, personality, language, voice |
| | Resume Builder | `/resume` | 7 templates + a separate ATS-friendly section with score checker and plain-text export |
| | Jobs | `/jobs` | Jobs with skill match, eligibility, apply, message recruiter, AI prep plan from platform content, practise the company round |
| | Messages | `/messages` | One inbox for chats with connections (students) and company HRs; unread badges |
| **Community** | Feed | `/feed` | Posts, likes, comments; filter to people you follow |
| | My Network | `/network` | LinkedIn-style: invitations (accept/ignore), connections, sent requests, following (people and companies), suggestions |
| | Leaderboard | `/leaderboard` | Students ranked by CareerForge Score |
| | Profile | `/u/[username]` (`/u/me`) | Profile, score card, verified skills, repos, stats |
| **For Companies** | Companies | `/companies` | Company profiles with open roles and HR contact |
| | Find Talent | `/hire` | Filter students by score and verified projects (no AI screening), contact them, HR inbox, post jobs, postings |
| | Register Company | `/companies/register` | Create a company profile |

### CareerForge Score (0–1000)
Defined in `src/lib/score.js`. A transparent formula over measured performance only — coding (300), mock tests (200), batch tests (100), contests (100), courses (100), verified interviews (150), consistency (50). No AI judges candidates; this keeps the platform clear of "AI job screener" territory.

### Backend (accounts and shared data)
- **Where data lives:** `MONGODB_URI` set → MongoDB. Not set in `npm run dev` → a local file `.data/dev-db.json` (git-ignored). Not set on a live host → backend off and the app runs in browser-only demo mode.
- **Accounts:** real sign-up / log-in. Passwords are hashed with scrypt; the session is an HttpOnly signed cookie (`AUTH_SECRET`). Code: `src/server/auth.js`, route `/api/auth`.
- **Private data** (progress, resume, tests, settings): one document per account, `/api/state`, saved a moment after each change.
- **Shared data** (student profiles, companies, jobs, posts, likes, comments, messages, applications, verified passports): `/api/shared`. The browser polls every 15 seconds (`src/lib/sync.js`). Every write is checked on the server: you can only post as yourself, message as yourself or your company, and post jobs for your own company.
- **Deploy (Vercel):** add `MONGODB_URI`, `MONGODB_DB`, `AUTH_SECRET` and the Meta keys as environment variables. In MongoDB Atlas, allow network access from anywhere (0.0.0.0/0) so Vercel can connect.

Not yet on the server: connection requests between real users (still demo), course/batch catalogs (static content).

### Recommendations (YouTube-style, no AI judging)
`src/lib/recommend.js` works like a video home feed, but every step is plain, explainable maths:
1. **Knowledge profile** per student (0–1 per skill) from what they did: verified projects (strongest), problems solved, test marks, courses, then listed skills (weakest). Related skills give partial credit (React ↔ Next.js, SQL ↔ DBMS…).
2. **Students → jobs, companies, peers:** skill fit + eligibility + level + behaviour (views, follows, what similar students applied to) + freshness.
3. **Companies → students:** fit to the company's open roles + score + verified proof + who applied + students similar to ones the recruiter opened.
4. **Learning from behaviour:** opening a job, company or profile is recorded; the eye icon ("Not interested") hides an item and similar ones drop.
5. **Re-ranking:** no two items from one company in a row, plus one "Explore" slot outside your skills.
6. **Reasons:** every card shows why it is there.

Shown in Feed → **For you**, Dashboard (**Recommended for you** + **What CareerForge knows about you**) and Find Talent → **Suggested for you**.

### Student and company views
Sidebar items carry a `for` role in `src/lib/nav.js`. Students see Learn, Practice and Career; companies see Find Talent and Register Company. Registering a company makes you its recruiter.

### Themes and motion
Four accent themes (profile menu) remap Tailwind's emerald/teal palette in `src/app/globals.css`, so pages need no changes. Motion helpers there: `page-enter`, `animate-rise`, `lift`, `reveal` (with `components/Reveal.js`), `shimmer`. Motion is turned off for users who prefer reduced motion.

### Languages
~70 languages in `src/lib/languages.js`. Every UI string goes through `t("English text")` (`src/lib/i18n.js`).
14 languages ship pre-translated in `src/locales/<code>.json`; the rest are translated on first use via `/api/translate` (Muse Spark) and cached.
After adding UI text, refresh the files with the app running: `node scripts/translate-ui.mjs http://localhost:3000`.
Resumes intentionally stay in English (ATS and recruiters expect it).

## Code map

```
src/
  app/(app)/           pages (one folder per route, grouped by section above)
  app/api/             ai · interview · classroom · translate (Meta Muse Spark) · auth · state · shared (backend)
  server/              db.js (MongoDB or dev file) · auth.js (passwords, sessions)
  components/          AppShell (sidebar/header), AvatarFace, ChatThread, ScoreCard, Markdown, PassportReport, resume/templates
  data/                courses.js · library.js · batches.js  (catalog content)
  lib/
    nav.js             sections + features (sidebar and Feature Map)
    store.js           app state (browser) + backend session, saving and sync
    sync.js            browser side of the backend: API calls, merging shared data
    score.js           CareerForge Score + leaderboard
    social.js          connections, follows, message threads (party = student or company)
    passports.js       verified vs practice passports, public passports from the backend
    themes.js          accent themes
    ai.js              Meta Model API client + small AI tasks
    interview.js       interview planning, grading, reports
    classroom.js       AI Classroom lessons
    github.js          reads a public repo for Defend Your Code
    i18n.js, languages.js, translate.js   translation system
  locales/             pre-translated UI strings
scripts/translate-ui.mjs   regenerates locale files
```

## Notes
- With the backend on, accounts and shared data live in MongoDB (or `.data/` in dev).
- If the project lives in OneDrive and `.next` gets corrupted, stop the dev server, delete `.next`, and start again. A separate check build can run with `NEXT_DIST_DIR=.next-check npx next build`.
