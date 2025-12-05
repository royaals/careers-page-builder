# Tech Spec: Careers Page Builder

## 1. Assumptions

###  Business Assumptions
* Each recruiter belongs to **one company**.
* Job listings are **pre-populated**
* No payment/subscription system required.
* Single language (English) support.

### Technical Assumptions
* No real file uploads (using URL-based images for now).


---

## 2. Architecture

### High-Level Architecture


```text
┌─────────────────────────────────────────────────────────────┐
│ CLIENT (Next.js App Router, React Components, Tailwind CSS) │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ API LAYER (Next.js API Routes: /api/auth, /api/companies)   │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ DATA LAYER (Prisma ORM, NextAuth Sessions, PostgreSQL)      │
└─────────────────────────────────────────────────────────────┘


