# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

src/
├── assets/                     # Images, logos, icons
│   └── logo.png

├── components/                 # Reusable UI components
│   ├── common/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── LoadingText.js
│   │   ├── Preloader.js
│   │   └── ProtectedRoute.js
│   │
│   ├── dashboard/
│   │   ├── ProgressCircle.js
│   │   ├── ActionCard.js
│   │   └── UserInfoCard.js
│   │
│   └── ThemeContext.js

├── context/
│   └── UserContext.js          # Auth + course access logic

├── pages/
│   ├── public/                 # Anyone can access
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Contact.js
│   │   └── Login.js
│   │
│   ├── auth/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── ForgotPassword.js
│   │
│   ├── courses/                # Course landing pages
│   │   ├── FoundationLevel.js
│   │   ├── IntermediateLevel.js
│   │   ├── FinalLevel.js
│   │   └── ImportantQuestions.js   # Optional dedicated page
│   │
│   ├── payment/
│   │   ├── PaymentPage.js
│   │   ├── PaymentSuccess.js
│   │   └── PaymentFailed.js
│   │
│   └── student/                # Only logged-in + purchased users
│       ├── dashboard/
│       │   ├── DashboardHome.js        # Your screenshot
│       │   ├── Schedule.js
│       │   ├── Mentorship.js
│       │   └── Support.js
│       │
│       ├── foundation/
│       │   ├── TestPapers.js
│       │   ├── UploadAnswer.js
│       │   ├── Results.js
│       │   └── Notes.js
│       │
│       ├── intermediate/
│       │   ├── TestPapers.js
│       │   ├── UploadAnswer.js
│       │   ├── Results.js
│       │   └── Notes.js
│       │
│       ├── final/
│       │   ├── TestPapers.js
│       │   ├── UploadAnswer.js
│       │   ├── Results.js
│       │   └── Notes.js
│       │
│       └── downloads/
│           └── ImportantQuestionsBank.js   # Auto-download

├── App.js
├── index.js
├── firebase.js                 # Firebase config (later)
└── routes/
    └── index.js                 # All routes in one place