# 📄 Product Requirements Document: 2026 Full-Stack Portfolio Product

## 1. Executive Summary

- **Product Vision**: A premium, high-fidelity 2026-trending portfolio that functions as an interactive product to demonstrate Python/Django backend prowess and Next.js/React frontend mastery.
- **Target Audience**: **CTOs, Technical Founders, and Engineering Leaders** (Primary); Recruiters and High-Value Clients (Secondary).
- **Core Objective**: Establish an elite "Product-Builder" brand, validate backend architectural credibility, and drive frictionless conversions (hiring/contracts).

---

## 2. Design System & Aesthetics

- **Core Vibe**: **Bento-Grid Minimal + Fluid Kinetic Hybrid**. Clean, highly-organized structure combined with smooth, organic animations.
- **Color Palette**: Custom HSL Deep Dark Mode
  - _Primary_: Deep Midnight Charcoal (`#0F0F11`)
  - _Accents_: Ultra Violet, Electric Indigo, Vibrant Fuchsia (used sparingly in kinetic gradients).
  - _Card Fill_: Frosted Glass (Low opacity white/charcoal with 16px blur, fine 1px borders).
- **Typography**:
  - Headings: Wide sans-serif (e.g., Inter, Geist Sans, or Clash Display)
  - Terminal/Code: Geist Mono or Fira Code
- **Motion Guidelines**:
  - Fluid background blobs must use `will-change: transform` and GPU-accelerated `translate3d` layers.
  - Background motion automatically suspends on mobile OR if browser detects `prefers-reduced-motion` active.

---

## 3. Key Features & Functional Specifications

### A. The Monolith Hero (Bento Card 1)

- **Goal**: Immediate value statement.
- **Headline Rule**: `[BUSINESS OUTCOME] + [TECHNICAL EXECUTION]`.
- **Elements**:
  - Large typography highlighting "Full-Stack Product Engineer."
  - "Availability Pulse" indicator showing current capacity status.
  - One-click direct primary CTA (e.g., "Download CV" and "Schedule Chat").

### B. The Authentic API Sandbox (Bento Card 2)

- **Goal**: Differentiate python/backend skillset via interactive validation.
- **Functionality**:
  - A sleek visual IDE/terminal component.
  - Includes "Quick-Click Actions" (Pills like `GET /projects`, `GET /stack`) so non-technical recruiters can execute queries instantly.
  - **Technical Requirement**: Triggers a _real_ HTTP request to a Python-based backend route (Next.js Python function or a live micro Django app) returning formatted, syntax-highlighted JSON matching a DRF `Response` payload.
  - Validates true Python/DRF comprehension upon Network inspection by technical visitors.

### C. Interactive Product Cards (Bento Cards 3+)

- **Goal**: Prove you ship real-world products with measurable impact.
- **Features**:
  - Cover shows a dynamic "Live Badge" (e.g., actual rows stored, response time metrics, or uptime fetched from Supabase).
  - Hover displays the logical system architecture line connections (e.g., React ↔ Supabase).
  - Clicking launches a slide-over case study detailing the _Problem_, the _Architectural Trade-offs_, and the _Stack Decisioning_.

### D. Live Real-Time Guestbook (Bento Card 5)

- **Goal**: Prove database, state management, and real-time skill.
- **Features**:
  - Powered by Supabase PostgreSQL and Realtime subscriptions.
  - Uses **Hybrid Static Generation**: Initial messages load in <50ms via static build/ISR; real-time hydration attaches post-load silently.

---

## 4. Technical Architecture

### Frontend Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Core**: Shadcn UI (Primitives built on Radix UI)
- **Animations**: Framer Motion

### Backend Stack

- **Real-Time Database & Auth**: Supabase
- **API Engine (Conceptual/Real)**: Python route simulating Django Rest Framework structure (either standalone Django or Vercel Python runtime API).

---

## 5. Non-Functional Hardening (Multi-Agent Approved)

1.  **Performance (Lighthouse 95+)**:
    - Strict framerate budgets for background WebGL/Canvas.
    - Pre-render static states of data to avoid layout shifts or waiting for DB cold-starts.
2.  **Responsive/Mobile-First UX**:
    - On viewports <1024px, heavy widgets (terminal) simplify into single-button triggers.
    - Vital summary info stays at the topmost layer for quick recruiter scanning.
3.  **Authenticity (The CTO Test)**:
    - No fake network calls. The sandbox actually fetches data to prove backend architecture exists and runs efficiently.
4.  **Maintainability**:
    - Projects, experience details, and stack configs isolated in `lib/content/` (JSON) or Supabase rows, allowing updates in under 3 minutes without code deployment.

---

## 6. Phased Implementation Plan

- **Phase 1**: Next.js Boilerplate & Core HSL Tokens setup in Tailwind.
- **Phase 2**: Bento Layout structure & Fluid Kinetic Canvas.
- **Phase 3**: Supabase Integration & API Sandbox Logic (Next.js Route).
- **Phase 4**: Project cards & Deep-dive slide-over content.
- **Phase 5**: Real-time Guestbook component & final QA audit.
