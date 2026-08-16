# Dara Logistics Platform

A full-featured cold-chain logistics management web application built for **Darafort**. The platform handles end-to-end logistics operations — from customer bookings and real-time shipment tracking to fleet management, temperature monitoring, payments, and admin reporting.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Roles & Access Control](#roles--access-control)
- [Key Modules](#key-modules)
- [Deployment](#deployment)

---

## Overview

Dara Logistics is a React-based SPA (Single Page Application) that serves three types of users:

- **Customers** — book cold-chain shipments, track deliveries, manage payments
- **Drivers** — receive trip assignments, update delivery status via the driver app
- **Admins / Managers / Dispatchers** — manage the full operation through a protected dashboard

---

## Features

### Customer-Facing
- Shipment booking with instant quotation and pricing calculator
- Real-time shipment tracking with status timeline
- Paystack payment integration (card, bank transfer, wallet)
- Invoice and receipt download (PDF)
- Support ticket system
- Address book management
- Personal analytics and temperature monitoring

### Admin Dashboard
- KPI overview — Net Revenue, GMV, trip counts, fleet health
- Order and bookings management
- Fleet management with telemetry, maintenance calendar, and fuel trends
- Driver management with KYC approval flow
- Cold-chain temperature monitoring with configurable alert thresholds
- Payment reconciliation and revenue reporting
- Role-based user management
- Pricing rules editor with client-level overrides
- Warehouse and dock scheduling
- Kanban task board and driver scheduling
- Automated email notifications (booking, delivery, alerts, KYC, OTP, etc.)

### Platform
- Role-based access control (Super Admin, Admin Manager, Dispatcher, Customer, Driver)
- Session management with optional "Remember Me" (8h / 7-day expiry)
- Offline detection and retry handling
- SEO with `react-helmet-async`
- Gzip + Brotli compressed production builds
- Code-split vendor chunks for fast initial load

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 + SWC |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| State Management | Zustand v5 |
| Server State / Caching | TanStack React Query v5 |
| Charts | Chart.js + react-chartjs-2 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Payments | Paystack (`react-paystack`) |
| Maps | react-simple-maps |
| HTTP Client | Custom fetch wrapper (`src/services/httpClient.js`) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── assets/            # Static images and SVGs
├── components/        # Feature-grouped UI components
│   ├── admin/         # Admin order modals
│   ├── alerts/        # Alert rules and notification templates
│   ├── clients/       # Client cards and order forms
│   ├── common/        # Shared components (Navbar, Footer, SEO, ProtectedRoute…)
│   ├── drivers/       # Driver table, filters, modals
│   ├── fleet/         # Fleet map, metrics, maintenance, telemetry
│   ├── landing/       # Public landing page sections
│   ├── layout/        # AuthLayout, DashboardLayout, PublicLayout
│   ├── orders/        # Order pipeline and cards
│   ├── payments/      # Paystack, bank transfer, wallet, invoices, receipts
│   ├── pricing/       # Pricing rules editor and simulator
│   ├── reports/       # Revenue, fleet usage, geographic heatmap charts
│   ├── settings/      # System settings, managers, integrations, audit logs
│   ├── shipments/     # Shipment creation and views
│   ├── tasks/         # Kanban board and driver schedule
│   ├── temperature/   # Temperature graphs, alerts, compliance reports
│   ├── tracking/      # Live tracking map, proof of delivery, rating
│   ├── trips/         # Trip table, filters, alerts, modals
│   ├── ui/            # Generic UI primitives (Button, Badge, Card…)
│   ├── users/         # User table, roles, activity logs
│   └── warehouses/    # Warehouse dashboard, inventory, dock scheduling
├── constants/         # App-wide constants and mock data
├── features/          # Self-contained feature modules (auth, booking, dashboard)
├── hooks/             # Custom React hooks and React Query hooks
├── i18n/              # Internationalisation (English locale)
├── lib/               # React Query client config
├── pages/             # Route-level page components
│   ├── admin/         # Admin-only pages
│   ├── auth/          # Login, signup, OTP, password reset
│   ├── booking/       # Booking flow (request → quotation → payment → confirmation)
│   ├── dashboard/     # Dashboard pages (overview, fleet, trips, reports…)
│   ├── public/        # Marketing pages (home, about, services, blog…)
│   ├── tracking/      # Shipment tracking and invoice pages
│   └── user/          # Customer account pages
├── routes/            # Centralised route definitions (AppRoutes.jsx)
├── services/          # API service layer (one file per domain)
├── stores/            # Zustand stores (auth, UI)
└── utils/             # Helpers, formatters, validators, error handling
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone <repo-url>
cd logistics-main
npm install
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default. API requests to `/api` are proxied to the backend at `http://dera-api.daraexpress.com`.

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-api-url/api/v1
VITE_CHATBASE_SECRET=your_chatbase_secret
```

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL for the backend REST API |
| `VITE_CHATBASE_SECRET` | Secret key for the Chatbase live chat integration |

> Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build (outputs to dist/)
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

The production build automatically generates Gzip (`.gz`) and Brotli (`.br`) compressed assets, and a bundle visualiser report at `dist/bundle-stats.html`.

---

## Roles & Access Control

| Role | Access |
|---|---|
| `Super Admin` | Full access to all dashboard routes and settings |
| `Admin Manager` | Dashboard access excluding role management |
| `Dispatcher` | Fleet, shipments, orders, trips, drivers, payments |
| `Customer` | Booking flow, tracking, personal account pages |
| `Driver` | Driver app only |

Routes are protected via the `ProtectedRoute` component which reads the authenticated user's role from the Zustand auth store.

Session tokens are stored in `sessionStorage` by default (cleared on browser close). Enabling "Remember Me" additionally persists the token to `localStorage` for up to 7 days.

---

## Key Modules

### Booking Flow
`/booking/request` → `/booking/quotation` → `/booking/payment` → `/booking/confirmation`

Customers select origin/destination, cargo type, and temperature requirements. The pricing engine calculates a quote which is confirmed before Paystack payment is initiated.

### Temperature Monitoring
Admins can set per-route temperature thresholds. The alert centre surfaces any breaches in real time with configurable notification rules and email templates.

### Fleet Management
Tracks each truck's location, fuel levels, maintenance schedule, and telemetry data. Supports bulk operations and a maintenance calendar view.

### Payments
Supports Paystack (card), bank transfer, and wallet payments. Includes invoice generation, receipt download, outstanding payment tracking, and a reconciliation module for admins.

### Email Templates
Pre-built HTML email templates are located in `email-templates/` covering: booking confirmation, driver assignment, delivery confirmation, KYC approval/rejection, OTP, password reset, payment receipt, shipment delay, temperature alerts, and welcome emails.

---

## Deployment

The project is configured for **Vercel** deployment via `vercel.json`. All non-asset routes are rewritten to `index.html` to support client-side routing.

```bash
npm run build
# Deploy the dist/ folder to Vercel
```

For other hosts (Netlify, S3+CloudFront, etc.), apply the same SPA fallback rule — redirect all 404s to `index.html`.
