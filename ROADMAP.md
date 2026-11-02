# CareerForge AI — Hackathon Roadmap

**Deadline:** 4 Nov 2026, 9:00 PM ET = **5 Nov, 6:30 AM IST**. Target: submit by **4 Nov evening IST** (12 hours buffer).
**Rule:** Ab koi naya bada section nahi. Sirf hero feature polish + deploy + demo.

## Abhi project kahan hai (28 Oct)

| Area | Status |
|---|---|
| Code health | Lint clean, production build pass (30 pages, 4 API routes) |
| Pages | Learn, Practice, Career, Community, For Companies — sab bane hue |
| Meta API | `.env.local` mein key set hai |
| Git | Sirf "Initial commit" — **saara kaam abhi tak commit nahi hua** |
| GitHub remote | **Nahi hai** |
| Live deploy | **Nahi hai** |
| Data | Browser localStorage (demo ke liye theek) |

## Pitch (ek line)
**"Defend Your Code"** — Muse Spark student ka GitHub repo padhta hai, avatar interviewer voice mein uske code par sawaal poochta hai, aur ek **Verified Skills Passport** banata hai. Baaki platform (courses, coding, tests, jobs) is passport ko context deta hai.

## Day-wise plan

### Day 1 — 28 Oct: Kaam safe karo
- [ ] Saara kaam git commit karo
- [ ] GitHub par public repo banao aur push karo
- [ ] Vercel par deploy karo, env vars (`META_API_KEY`, `META_API_BASE_URL`, `META_MODEL`, optional `GITHUB_TOKEN`) wahan daalo
- [ ] Live URL par ek Defend Your Code interview poora chala kar dekho

### Flow fixes (28 Oct review se mile) — sab ho gaye ✅
- [x] Sirf "Defend Your Code" (repo) round = Verified Passport + score ke "verified" points. HR / Technical / Rapid = "Practice report" (abhi sab passport ban jaate hain, aur HR round par bhi "code ownership" likha aata hai)
- [x] Demo students ke passports seed karo aur profile par sabko dikhao; Find Talent card par "Verified project" badge (abhi HR ko kisi ka passport nahi dikhta)
- [x] Register ka naam/email/role save karo; role ke hisaab se sidebar (student vs company)
- [x] Bina login pages na khulein (`loggedIn` abhi kahin check nahi hota)
- [x] Student register ke baad Dashboard par jaaye, landing par nahi
- [x] Top search sirf problems dhoondhta hai — ya sab search karo ya placeholder badlo
- [x] "Watch Demo", footer/social `#` links, sidebar "Your Skills Have No Borders" card (logged-in user ko /register bhejta hai)

### Design + AI (28 Oct) — ho gaya ✅
- [x] 4 accent themes (Emerald, Ocean, Violet, Sunset) — profile menu mein
- [x] Smooth scrolling, page transitions, scroll reveal, hover lift, animated passport score ring
- [x] Job page: AI prep plan (sirf platform ke courses/problems/tests se) + "Practise this company's interview"
- [x] Student view ↔ Company view switch (profile menu) — demo mein dono side dikhane ke liye

### Recommendation system (31 Oct) — ho gaya ✅
- [x] Knowledge profile (verified project > problems > test marks > courses > listed skills)
- [x] Student ko jobs/companies/students "For you" feed mein, company ko suggested students
- [x] Views, "Not interested", similar students se seekhna; har card par "kyun dikh raha hai"

### Backend (31 Oct) — ho gaya ✅
- [x] Asli login/register (password hash + secure cookie), demo student alag
- [x] Har user ka progress server par save; posts, jobs, companies, messages, applications, verified passports sab devices par share
- [x] MongoDB (production) / `.data` file (local dev) — bina database ke live site demo mode mein chalti hai
- [x] MongoDB Atlas `.env.local` mein set, asli database par test pass (31 Oct)
- [ ] `AUTH_SECRET` ko lamba (64 characters) banao
- [ ] Vercel par wahi env variables daalo + Atlas Network Access mein `0.0.0.0/0`
- [ ] Baad mein: real users ke beech connection requests

### Day 2–3 — 29–30 Oct: Hero feature polish
- [ ] Defend Your Code flow: repo link → questions → voice answers → follow-up → Passport. Har step ka loading/error state check karo
- [x] Passport ko shareable banao (public link `/u/<username>` par dikhe)
- [ ] (Optional) Muse Image se avatar generate karna — sirf tab jab Meta API mein available ho aur 1 din se kam lage
- [ ] Mobile view check

### Day 4 — 31 Oct: Anti-project risk saaf karo
- [ ] **AI Classroom**: "AI for Education chatbot" jaisa na lage. Free doubt-chat hatao ya chhota karo; isse "lesson + checkpoint quiz" ki tarah dikhao
- [ ] **Library AI notes**: secondary rakho, pitch mein mat dikhao
- [x] **Find Talent**: "ranked by AI" jaisa wording nahi — "filter by measured stats / CareerForge Score (formula)" likho
- [ ] Dashboard ko main feature ki tarah present mat karo

### Day 5 — 1 Nov: Demo ready
- [x] Purana demo data hata diya (31 Oct): ab sirf asli accounts
- [ ] Demo video ke liye 3–4 asli test accounts banao (2 students, 1 company) aur unse thoda kaam karo
- [ ] Home page par hero feature sabse upar
- [ ] Ek chhota demo GitHub repo ready rakho jis par interview achha chalta ho

### Day 6 — 2–3 Nov: Submission material
- [ ] 2–3 min demo video (script: problem → Defend Your Code live → Passport → HR dekhta hai → Score)
- [ ] README: screenshots, Meta models kaha use hue, architecture, run steps
- [ ] Submission text likho

### Day 7 — 4 Nov: Submit
- [ ] Live URL, repo, video ek baar fir test
- [ ] Shaam tak submit

## Baad mein (hackathon ke baad)
- MongoDB + real auth
- SAM 3.1 avatar cut-out
- Extra languages refresh (`node scripts/translate-ui.mjs`)
