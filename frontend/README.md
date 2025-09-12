# Project structure for now.

src/
├── api/ # Axios + base API setup
│ └── axiosInstance.js
├── services/ # Actual logic talking to API
│ ├── authService.js
│ └── userService.js
├── hooks/ # Custom hooks for data fetching
│ ├── useAuth.js
│ └── useUser.js
├── context/ # Auth state (Zustand or Context API)
│ └── useAuthStore.js
├── components/ # Reusable components (Navbar, Loader)
├── pages/ # Login, Register, Dashboard etc.
├── utils/ # JWT helpers, toast handler, etc.
│ └── toast.js
├── App.jsx
└── main.jsx
