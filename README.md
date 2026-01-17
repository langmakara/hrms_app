```
root/
├── public/                # Static assets (fonts, icons, robots.txt)
├── src/
│   ├── app/               # Next.js Routing Layer (App Router)
│   │   ├── (auth)/        # Route Group (Login/Register)
|   |   ├── (admin)/
│   │   ├── (dashboard)/   # Route Group (Main App)
│   │   ├── api/           # Route Handlers (Backend endpoints)
│   │   ├── layout.tsx     # Global Layout
│   │   └── page.tsx       # Root Home Page
│   ├── components/        # Shared UI Components
│   │   ├── ui/            # Base atomic components (Buttons, Inputs - e.g., Shadcn)
│   │   ├── forms/         # Complex form logic
│   │   └── layout/        # Shared structural components (Sidebar, Navbar)
│   ├── features/          # Domain-driven modules (Self-contained logic)
│   │   ├── user-profile/  # Specific feature folder
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/  # API calls for this feature
│   │   │   └── types.ts
│   ├── hooks/             # Global reusable React hooks
│   ├── lib/               # Third-party library initializations (Prisma, Stripe, Axios)
│   ├── services/          # Global API/External service logic
│   ├── store/             # Global state management (Zustand, Redux)
│   ├── types/             # Global TypeScript interfaces/types
│   └── utils/             # Pure helper functions (formatting, validation)
├── .env                   # Environment variables
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript path aliases
```
