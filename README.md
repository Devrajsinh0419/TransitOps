# TransitOps ERP Suite - Next-Generation Logistics Platform

TransitOps is a premium enterprise-grade Software-as-a-Service (SaaS) ERP designed for transport management, real-time fleet operations, route planning, logistics billing, maintenance orchestration, and analytics.

---

## 🌟 Key Product Offerings

- **Live Fleet Control Center**: High-level key performance indicators (KPIs) monitoring dispatch timelines, vehicle distributions, and fuel economics.
- **Roster & Asset Cataloging**: Detailed vehicle and driver profile management, licensing compliance tracking, status logs, and documents.
- **Dynamic Dispatcher workflow**: Multi-stage trip management lifecycle (`Draft` ➔ `Validation` ➔ `Dispatch` ➔ `In Progress` ➔ `Completed` / `Cancelled`) with realtime driver safety score evaluations.
- **Maintenance & Fuel Orchestration**: Record and track vehicle maintenance requests, technician workloads, workshops, multi-currency expenses, and refuel logs.
- **Executive Analytics Center**: High-fidelity reports covering fuel efficiency, cost distributions, fleet utility, and custom metrics, optimized for executive decision-making.
- **System Administration**: Visual theme customizer (light/dark/system mode, accent picker, sidebar layout density), granular user role access settings, permission matrices, and a notifications manager.

---

## 🛠️ Technology Stack

TransitOps is built with a state-of-the-art frontend architecture:

* **Framework**: Next.js 15+ (App Router)
* **Language**: TypeScript (Strict typing check compliant)
* **Styling**: Tailwind CSS & CSS modules
* **Component Library**: Tailored design tokens and components (inspired by Stripe, Linear, and Vercel)
* **State Management**: Zustand stores (UI state, Auth state)
* **Data Fetching**: TanStack Query (React Query v5) & Axios client
* **Icons**: Lucide Icons
* **Toasts**: Sonner
* **Forms**: React Hook Form with Zod validation schemas

---

## 📂 Project Structure

```
TransitOps/
├── backend/                  # REST APIs service (Django/Python backend)
└── frontend/                 # Next.js App Router codebase
    ├── public/               # Static assets & placeholders
    ├── src/
    │   ├── app/              # App Router routing tree
    │   │   ├── (auth)/       # Protected authentication pages (Login, Recovery)
    │   │   ├── (dashboard)/  # Main portal routes (Vehicles, Drivers, Trips, Settings)
    │   │   └── api/          # Route handlers
    │   ├── components/       # Custom reusable components
    │   │   ├── auth/         # Login forms & password fields
    │   │   ├── common/       # Buttons, layouts, sidebar, breadcrumbs
    │   │   ├── dashboard/    # Charts & summary stats
    │   │   ├── settings/     # Roster profiles & permission checklists
    │   │   └── ui/           # Basic primitives (Dialog, Badge, Dropdown)
    │   ├── constants/        # System enumerations & status definitions
    │   ├── hooks/            # Custom hooks, in-memory mock states
    │   ├── lib/              # Client tools, validators, constants
    │   ├── providers/        # Context providers (Theme, Toast, TanStack Query)
    │   ├── services/         # Axios API service handlers
    │   ├── store/            # Lightweight Zustand store instances
    │   ├── styles/           # Base stylesheet variables
    │   ├── types/            # TypeScript schemas
    │   └── validation/       # Zod schemas for input validation
```

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Steps to Run Frontend Locally

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the `frontend` root:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_DEMO_MODE=true
   ```

4. **Launch Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` on your browser to view the application.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   This generates an optimized output build directory, compiled with zero TypeScript or route matching warnings.

---

### Database Demo Users

The following users are seeded in the PostgreSQL database for live backend authentication:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@transitops.com` | `Admin@123` |
| Fleet Manager | `fleet@transitops.com` | `Fleet@123` |
| Safety Officer | `safety@transitops.com` | `Safety@123` |
| Financial Analyst | `finance@transitops.com` | `Finance@123` |

---

---

## 🔒 Security & Optimization Best Practices

- **Token Interceptors**: Automated Bearer token insertion and 401 Unauthorized handling in `axios.ts`.
- **Keyboard Navigation**: Native accessibility triggers, tab loops, visual focus indicators, and screen reader-friendly layout trees.
- **Dynamic Routing**: Layout wrappers, page boundaries, and Suspense loaders configured on dynamic detail pages.
