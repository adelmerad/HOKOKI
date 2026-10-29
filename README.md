# HOKOKI — AI-Powered Legal Assistant for Algeria

> Built at the **NCS Hackathon 2026**.
>
> **🌐 Live demo: [hokoki.vercel.app](https://hokoki.vercel.app)** — deployed on Vercel in [demo mode](#demo-mode). Best viewed on a phone or in mobile view.
>
> **🔑 Demo account:** sign-in is simulated — on the [login page](https://hokoki.vercel.app/login) enter any phone number and password (e.g. `0555123456` / `demo1234`) and tap Login. Lawyer screens are under [/lawyer-dashboard](https://hokoki.vercel.app/lawyer-dashboard).

HOKOKI is a mobile-first legal services platform designed for Algerian citizens. It provides instant legal guidance in Arabic — through an AI chat assistant, contract analysis, a laws browser, step-by-step procedure guides, and a lawyer marketplace — without requiring legal expertise to get started.

---

## The Problem

Legal knowledge in Algeria is fragmented across complex government sources and inaccessible to most people. Citizens face:

- No reliable, accessible Arabic source for everyday legal questions
- Confusing government procedures with no clear step-by-step guidance
- Contract language they cannot interpret without paying for professional advice
- Difficulty finding and contacting trustworthy local lawyers
- Legal anxiety from not knowing their rights or next steps

HOKOKI addresses all five pain points in a single mobile interface.

---

## Features

| Feature | Description |
|---|---|
| **Legal Chat Assistant** | Ask law questions in Arabic, get structured answers with article citations and sources |
| **Contract Analyzer** | Paste any contract text and receive a risk score, clause-by-clause analysis, and recommended actions |
| **Laws Browser** | Explore 10 legal categories, read full articles, track recent amendments, look up legal terms |
| **Procedures Hub** | Step-by-step guides for government and administrative procedures with required documents and office info |
| **Procedure Tracker** | Track ongoing procedures, mark steps complete, view completion history |
| **Document Generator** | Fill forms, preview generated documents, and download them |
| **Lawyer Marketplace** | Search lawyers by specialty and region, view profiles, read reviews, book free consultations |
| **Lawyer Enterprise Dashboard** | Lawyers can register, manage their profile, set availability, and handle incoming requests |
| **Notifications & Reminders** | Legal update alerts, procedure deadlines, and lawyer appointment reminders |
| **Emergency Consultation** | Fast-track path for urgent legal situations |
| **Voice & Image Input** | Voice-to-text and image/document attachment in the chat |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React + TypeScript + Vite | React 19, Vite 8, TS ~6 |
| Styling | Tailwind CSS | v4 |
| Routing | react-router-dom | v7 |
| Animations | framer-motion | v12 |
| HTTP Client | Axios | v1 |
| WebSockets | socket.io-client | v4 |
| Icons | lucide-react | v1 |
| Toasts | react-hot-toast | v2 |
| Utilities | clsx + tailwind-merge | — |
| Linter | oxlint | — |

---

## Project Structure

```
HOKOKI/
├── public/
├── src/
│   ├── App.tsx                    # Router + AnimatePresence page transitions
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Global styles
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNav.tsx      # 5-tab bottom navigation (Chat tab floats)
│   │   │   ├── MobileFrame.tsx    # Mobile viewport wrapper
│   │   │   ├── PageTransition.tsx # Framer motion page animations
│   │   │   ├── StatusBar.tsx      # Top status bar (time, signal, battery)
│   │   │   └── TopBar.tsx         # Top navigation header
│   │   └── ui/
│   │       ├── Avatar.tsx
│   │       ├── Badge.tsx
│   │       ├── BottomSheet.tsx
│   │       ├── Button.tsx         # primary / secondary / ghost / danger + sizes
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── LawCategoryIcon.tsx
│   │
│   ├── data/                      # Mock data (drives all UI without backend)
│   │   ├── mockConversations.ts
│   │   ├── mockLaws.ts            # 10 categories, 224+ articles
│   │   ├── mockLawyerRequests.ts
│   │   ├── mockLawyers.ts
│   │   ├── mockProcedures.ts
│   │   └── mockUser.ts            # Current user, reminders, notifications
│   │
│   ├── lib/
│   │   ├── constants.ts           # Color scheme, law categories, wilayas
│   │   ├── utils.ts               # cn() utility (clsx + tailwind-merge)
│   │   ├── http-client.tsx        # Axios client (baseURL from VITE_AI_URL)
│   │   └── api/
│   │       ├── chat.ts            # POST /api/laws/chat
│   │       ├── contract.ts        # POST /api/contract/analyze
│   │       └── procedure-chat.ts  # POST /api/procedure/chat
│   │
│   ├── pages/
│   │   ├── auth/                  # Splash, Onboarding, AccountType, Register (phone/OTP/profile), Login, ForgotPassword
│   │   ├── chat/                  # ChatEmpty, ChatActive, ChatHistory, ChatEmergency, ChatVoiceInput, ChatImageAttach
│   │   ├── contract/              # ContractAnalyse
│   │   ├── error/                 # NoInternet, ServerError
│   │   ├── home/                  # Home
│   │   ├── laws/                  # LawsGrid, CategoryDetail, ArticleDetail, RecentChanges, SearchResults, Bookmarks, TermDefinition
│   │   ├── lawyers/               # LawyersList, LawyerProfile, LawyerMatching, LawyerReviews, ContactLawyer, WriteReview,
│   │   │                          # FreeConsultation, LawyerRegister, LawyerPending, LawyerDashboard,
│   │   │                          # LawyerRequests, LawyerRequestDetail, LawyerAvailability, LawyerEditProfile
│   │   ├── notifications/         # Notifications
│   │   ├── procedures/            # ProceduresHub, ProcedureSearch, ProcedureDetail, ProcedureActive, ProcedureCompleted,
│   │   │                          # ProceduresTracker, DocumentGeneratorHome, DocumentGeneratorForm, DocumentGeneratorPreview
│   │   └── profile/               # Profile, Settings, Reminders
│   │
│   └── types/
│       └── index.ts               # All TypeScript interfaces
│
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Splash | Entry point |
| `/onboarding` | Onboarding | First-launch intro |
| `/account-type` | AccountType | Choose citizen or lawyer |
| `/register` | RegisterPhone | Phone registration |
| `/register/otp` | RegisterOTP | OTP verification |
| `/register/profile` | RegisterProfile | Profile setup |
| `/login` | Login | — |
| `/forgot-password` | ForgotPassword | — |
| `/home` | Home | Main dashboard |
| `/notifications` | Notifications | — |
| `/laws` | LawsGrid | Category grid |
| `/laws/recent` | RecentChanges | Recently amended laws |
| `/laws/:category` | CategoryDetail | Articles in category |
| `/laws/:category/:id` | ArticleDetail | Single article |
| `/search` | SearchResults | Law search |
| `/bookmarks` | Bookmarks | Saved articles |
| `/terms/:id` | TermDefinition | Legal term lookup |
| `/chat` | ChatEmpty | New conversation |
| `/chat/:id` | ChatActive | Active conversation |
| `/chat/history` | ChatHistory | Past conversations |
| `/chat/emergency` | ChatEmergency | Urgent consultation |
| `/chat/voice` | ChatVoiceInput | Voice input |
| `/chat/image` | ChatImageAttach | Image attachment |
| `/contract` | ContractAnalyse | Contract analysis |
| `/procedures` | ProceduresHub | Procedure grid |
| `/procedures/search` | ProcedureSearch | Search procedures |
| `/procedures/:id` | ProcedureDetail | Steps + documents |
| `/procedures/:id/active` | ProcedureActive | Ongoing procedure |
| `/procedures/:id/completed` | ProcedureCompleted | Completed view |
| `/tracker` | ProceduresTracker | All active procedures |
| `/documents` | DocumentGeneratorHome | Generator landing |
| `/documents/:type` | DocumentGeneratorForm | Fill form |
| `/documents/:type/preview` | DocumentGeneratorPreview | Preview + download |
| `/lawyers` | LawyersList | Directory |
| `/lawyers/matching` | LawyerMatching | Smart recommendation |
| `/lawyers/free` | FreeConsultation | Free consultation |
| `/lawyers/:id` | LawyerProfile | Profile view |
| `/lawyers/:id/reviews` | LawyerReviews | Reviews + ratings |
| `/lawyers/:id/contact` | ContactLawyer | Contact form |
| `/lawyers/:id/write-review` | WriteReview | Submit review |
| `/lawyer-register` | LawyerRegister | Lawyer registration |
| `/lawyer-register/pending` | LawyerPending | Awaiting approval |
| `/lawyer-dashboard` | LawyerDashboard | Lawyer home |
| `/lawyer-dashboard/requests` | LawyerRequests | Request queue |
| `/lawyer-dashboard/requests/:id` | LawyerRequestDetail | Request detail |
| `/lawyer-dashboard/availability` | LawyerAvailability | Schedule management |
| `/lawyer-dashboard/profile/edit` | LawyerEditProfile | Edit profile |
| `/profile` | Profile | User profile |
| `/settings` | Settings | Preferences |
| `/reminders` | Reminders | Deadlines + reminders |
| `/no-internet` | NoInternet | Offline error |
| `/server-error` | ServerError | Server error |

---

## API Endpoints

The frontend communicates with the AI service at `VITE_AI_URL` (default `http://localhost:8000`):

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/laws/chat` | Send a legal question, receive structured answer + citations |
| `POST` | `/api/contract/analyze` | Submit contract text, receive risk analysis |
| `POST` | `/api/procedure/chat` | Ask a question about a specific procedure |

All other content (laws, lawyers, procedures, users) is driven by mock data in `src/data/` until the backend is ready.

---

## Data Model (TypeScript Types)

Key interfaces defined in [src/types/index.ts](src/types/index.ts):

| Interface | Key Fields |
|---|---|
| `User` | id, nameAr, wilaya, email, phone, memberSince, stats |
| `LawCategory` | id, nameAr, nameFr, icon, articleCount, isRecentlyChanged |
| `LawArticle` | id, categoryId, numberAr, titleAr, fullTextAr, simpleExplanationAr, isAmended |
| `Procedure` | id, nameAr, nameFr, category, difficulty, durationAr, costAr, isOnline, steps[] |
| `ProcedureStep` | id, titleAr, instructionsAr, subSteps[], requiredDocuments[], officeName, officeCost |
| `Lawyer` | id, nameAr, specialty, wilaya, rating, feeMin, feeMax, hasFreeConsultation, isVerified |
| `ChatMessage` | id, role, question, citationChips[], structuredAnswer, isEmergency |
| `ContractAnalysisResult` | overallScore, verdict, issues[], missingClauses[], recommendedActions[] |
| `Notification` | id, titleAr, bodyAr, type, timestamp, isRead |
| `Reminder` | id, titleAr, dateAr, type, isCompleted |

---

## Getting Started

**Requirements:** Node.js 20+, npm

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

```bash
# Type-check + production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_AI_URL` | Base URL of the HOKOKI AI service (`hokoki-ai`). Leave it empty to run the app in demo mode. |

```bash
cp .env.example .env.local
```

## Demo Mode

Without `VITE_AI_URL`, the app is fully usable as a standalone demo: laws, procedures, lawyers and dashboards run on the bundled sample data, the legal chat and the procedure assistant answer with topic-matched sample replies (clearly labelled as demo answers), and contract analysis explains that it needs the AI service. This is how the public demo is deployed.

---

## Architecture

```
+-------------------------------+        +----------------------------------+
|  HOKOKI Frontend              |        |  HOKOKI AI service (VITE_AI_URL) |
|  React 19 + Vite 8            | -----> |  POST /api/laws/chat             |
|  TypeScript + Tailwind CSS    |        |  POST /api/contract/analyze      |
|  Framer Motion + Socket.IO    |        |  POST /api/procedure/chat        |
+-------------------------------+        |  LangChain RAG · Groq (Llama 3.3)|
                                         |  ChromaDB vector store           |
                                         +----------------------------------+
```

The frontend is fully functional with local mock data — no backend required to run and explore the UI. Live AI features (chat, contract analysis, procedure assistant) need the AI service; without it the app runs in [demo mode](#demo-mode).

---

## Internationalisation

All content is trilingual:

| Language | Usage |
|---|---|
| Arabic (`Ar` suffix) | Primary content language — all user-facing text, legal content |
| French (`Fr` suffix) | Law and procedure names (official Algerian legal naming) |
| English | UI code labels, developer tooling |

---

## Roadmap

- [ ] Connect the remaining mock screens to the backend API and the AI service
- [ ] Real authentication with JWT and persistent user accounts
- [ ] Lawyer appointment booking with live calendar availability
- [ ] Personal legal case tracker with deadline reminders
- [ ] Offline-first support for saved procedures and references
- [ ] Expanded legal database covering all Algerian codes (civil, commercial, penal)
- [ ] AI-backed document generation for contracts, appeals, and submissions
- [ ] Push notifications for procedure updates and lawyer replies

---

## Why HOKOKI

In Algeria, legal knowledge is distributed across dense legislation, government portals, and professional networks that most citizens cannot navigate. HOKOKI brings structured Arabic-language legal guidance to any phone — reducing the barrier between a citizen and the information they need to protect their rights, complete a procedure, or engage a lawyer with confidence.
