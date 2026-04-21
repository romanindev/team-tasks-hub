# 🚀 Team Tasks Hub

A full-stack pet project built to deeply learn **GraphQL in a real-world scenario** using a modern TypeScript stack.

---

## 🎯 Purpose

This project is not about building a simple CRUD app.

The goal is to understand **how GraphQL is used in production systems**, including:

* when GraphQL is better than REST (and when it's not)
* schema design and query patterns
* performance issues (N+1 problem)
* DataLoader usage
* client-side caching and optimistic UI
* authentication and authorization
* testing strategies across the stack

This project is built with a **Senior Full-Stack Engineer mindset**.

---

## 🧱 Tech Stack

### Frontend

* Next.js (App Router)
* React + TypeScript
* Apollo Client
* Tailwind / shadcn/ui
* Vitest (unit & component testing)
* Playwright (E2E testing)

### Backend

* Node.js
* NestJS
* GraphQL (code-first approach)
* Apollo Driver
* Prisma ORM
* PostgreSQL
* DataLoader
* JWT Authentication

---

## 🏗 Architecture

```txt
[ Next.js (Apollo Client) ]
            ↓
        GraphQL API
            ↓
      NestJS (Resolvers)
            ↓
     Services (Business Logic)
            ↓
        Prisma ORM
            ↓
        PostgreSQL
```

> GraphQL is used as a **data-fetching layer**, not as a place for business logic.

---

## 📦 Monorepo Structure

```txt
team-tasks-hub/
│
├── apps/
│   ├── web/        # Next.js frontend
│   └── api/        # NestJS GraphQL backend
│
├── packages/
│   ├── graphql/    # shared GraphQL types (generated)
│   └── config/     # shared ESLint / TS config
│
├── docker/
│   └── postgres/   # optional init scripts
│
├── docker-compose.yml
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## 🧠 Core Domain

* User
* Workspace
* Project
* Task
* Comment
* Label

---

## ✨ Features (Planned)

* Authentication (JWT)
* Project & Task management
* Filtering, sorting, pagination (cursor-based)
* Nested GraphQL queries
* Dashboard with aggregated data
* Optimistic UI updates
* Activity tracking (optional)

---

## ⚙️ GraphQL Best Practices Applied

* Code-first schema (NestJS)
* Cursor-based pagination (no offset pagination)
* DataLoader to solve N+1 problem
* Separation of resolvers and business logic
* Query complexity & depth limiting
* Typed operations on frontend (codegen)
* Proper error handling

---

## 🧪 Testing Strategy

### Backend

* Unit tests (services)
* Integration tests (GraphQL resolvers)

### Frontend

* Vitest → logic, hooks, components
* Playwright → end-to-end user flows

---

## 🐳 Development Environment

### Prerequisites

* Node.js (>= 20)
* pnpm
* Docker

### Start database

```bash
docker-compose up -d
```

This will start:

* PostgreSQL (port 5432)

---

## 🚀 Getting Started

```bash
# install dependencies
pnpm install

# run backend
pnpm --filter api start:dev

# run frontend
pnpm --filter web dev
```

---

## 📌 Project Structure Philosophy

This project intentionally follows:

* **Monorepo approach** → easier type sharing and development
* **Separation of concerns** → API layer vs business logic
* **Scalability-first mindset** → even as a pet project
* **Real-world patterns** → not simplified demos

---

## ⚠️ Important Notes

* GraphQL is not used everywhere by default
* Some cases (file uploads, health checks, webhooks) may still use REST
* The goal is to understand **trade-offs**, not blindly apply GraphQL

---

## 🧭 Learning Path

This project is built incrementally:

* Day 1 — Monorepo + Docker + GraphQL setup
* Day 2 — Schema design + relations
* Day 3 — Auth + permissions
* Day 4 — Pagination + filtering
* Day 5 — DataLoader + performance
* Day 6 — Frontend GraphQL integration
* Day 7 — Optimistic UI + caching
* Day 8 — Testing (backend + frontend)
* Day 9 — Improvements & refactoring
* Day 10 — System design review

---

## 🎯 Definition of Done

Each step is complete when:

* code works
* tests are present
* decisions are understood
* no "magic" remains unexplained
* structure is scalable

---

## 💡 Final Goal

By the end of this project, you should be able to:

* confidently design GraphQL APIs
* explain trade-offs vs REST
* build a production-like fullstack app
* reason about performance and scalability
* approach system design like a senior engineer

---

## 📄 License

MIT
