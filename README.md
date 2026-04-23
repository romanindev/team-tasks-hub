# 🚀 Team Tasks Hub

A full-stack pet project built to deeply learn **GraphQL in a real-world scenario** using a modern TypeScript stack.

---

## 🎯 Purpose

This project is not about building a simple CRUD app.

The goal is to understand **how GraphQL is used in production systems**, including:

- when GraphQL is better than REST (and when it's not)
- schema design and query patterns
- performance issues (N+1 problem)
- DataLoader usage
- client-side caching and optimistic UI
- authentication and authorization
- testing strategies across the stack

This project is built with a **Senior Full-Stack Engineer mindset**.

---

## 🧱 Tech Stack

### Frontend

- Next.js (App Router)
- React + TypeScript
- Apollo Client
- Tailwind / shadcn/ui
- Vitest (unit & component testing)
- Playwright (E2E testing)

### Backend

- Node.js
- NestJS
- GraphQL (code-first approach)
- Apollo Driver
- Prisma ORM
- PostgreSQL
- DataLoader
- JWT Authentication

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

- User
- Workspace
- Project
- Task
- Comment
- Label

---

## ✨ Features (Planned)

- Authentication (JWT)
- Project & Task management
- Filtering, sorting, pagination (cursor-based)
- Nested GraphQL queries
- Dashboard with aggregated data
- Optimistic UI updates
- Activity tracking (optional)

---

## ⚙️ GraphQL Best Practices Applied

- Code-first schema (NestJS)
- Cursor-based pagination (no offset pagination)
- DataLoader to solve N+1 problem
- Separation of resolvers and business logic
- Query complexity & depth limiting
- Typed operations on frontend (codegen)
- Proper error handling

---

## 🧪 Testing Strategy

### Backend

- Unit tests (services)
- Integration tests (GraphQL resolvers)

### Frontend

- Vitest → logic, hooks, components
- Playwright → end-to-end user flows

---

## 🐳 Development Environment

### Prerequisites

- Node.js (>= 20)
- pnpm
- Docker

### Start database

```bash
docker-compose up -d
```

This will start:

- PostgreSQL (port 5432)

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

- **Monorepo approach** → easier type sharing and development
- **Separation of concerns** → API layer vs business logic
- **Scalability-first mindset** → even as a pet project
- **Real-world patterns** → not simplified demos

---

## ⚠️ Important Notes

- GraphQL is not used everywhere by default
- Some cases (file uploads, health checks, webhooks) may still use REST
- The goal is to understand **trade-offs**, not blindly apply GraphQL

---

## 🧭 Learning Path

This project is built incrementally:

- Day 1 — Monorepo + Docker + GraphQL setup
- Day 2 — Schema design + relations
- Day 3 — Auth + permissions
- Day 4 — Pagination + filtering
- Day 5 — DataLoader + performance
- Day 6 — Frontend GraphQL integration
- Day 7 — Optimistic UI + caching
- Day 8 — Testing (backend + frontend)
- Day 9 — Improvements & refactoring
- Day 10 — System design review

## Run locally

```bash
docker compose up -d
pnpm install
cp apps/api/.env.example apps/api/.env
pnpm dev:api
```

**API**:

GraphQL: http://localhost:4000/graphql

Health: http://localhost:4000/health

---

## 🎯 Definition of Done

Each step is complete when:

- code works
- tests are present
- decisions are understood
- no "magic" remains unexplained
- structure is scalable

---

## 💡 Final Goal

By the end of this project, you should be able to:

- confidently design GraphQL APIs
- explain trade-offs vs REST
- build a production-like fullstack app
- reason about performance and scalability
- approach system design like a senior engineer

---

## 📄 License

MIT

## Day 1 Status

Implemented:

- pnpm workspace monorepo setup
- root ESLint + Prettier configuration
- Husky + lint-staged pre-commit hooks
- Docker Compose with PostgreSQL
- NestJS GraphQL API base (code-first)
- first GraphQL query: `hello`
- health check endpoint: `GET /health`

---

## Day 2 — Status (Prisma + First Domain (User))

Implemented:

- Prisma setup (`@prisma/client`, `prisma`)
- PostgreSQL connection via Docker
- Environment configuration (`DATABASE_URL`)
- First Prisma schema (`User` model)
- Initial database migration
- PrismaModule + PrismaService (NestJS integration)
- First GraphQL domain module: `users`
  - ObjectType (`User`)
  - Queries (`users`, `user`)
  - Mutation (`createUser`)

**Backend Architecture Progress**

```text
apps/api/src/
  prisma/        # database layer (Prisma)
  users/         # first domain module
  health/        # health check
  common/        # shared config/utils
```

**Database**

```text
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

**Prisma Integration (NestJS)**

- Prisma wrapped in a dedicated service
- Global module for easy injection
- Clean separation: infra layer vs domain layer

**GraphQL (Code-first)**

```GraphQL
query {
  users {
    id
    email
    name
  }
}
```

Example mutation:

```GraphQL
mutation {
  createUser(
    input: {
      email: "roman@example.com"
      name: "Roman"
    }
  ) {
    id
    email
    name
  }
}
```

**Key Learnings**

- Difference between **schema generation vs migration execution**
- Prisma + Docker connection flow
- NestJS + Prisma integration pattern
- GraphQL code-first type limitations (explicit types required)
- Apollo Server CSRF behavior (modern setup vs legacy playground)

**Decisions**

- Prisma downgraded to v5 (stable, production-ready)
- Avoided Prisma v7 experimental config (`prisma.config.ts`)
- Used cuid() for IDs (better for distributed systems than numeric IDs)

**Result**

A working backend slice with:

- real database
- real GraphQL API
- first domain module
- clean architecture foundation

## Day 3 — Authentication (JWT)

Implemented:

- User registration with password hashing (`bcrypt`)
- Login with credential validation
- JWT-based authentication
- JWT strategy using `passport-jwt`
- GraphQL Auth Guard (`GqlAuthGuard`)
- `@CurrentUser()` decorator
- Protected resolvers
- `currentUser` query

**Security**

- Passwords are hashed before storing
- Invalid credentials return generic error (no info leakage)
- JWT payload is minimal (`sub`, `email`)
- Auth context uses `AuthUser` (no DB leakage)

**Architecture Decisions**

- Separated `AuthModule` from `UsersModule`
- Introduced `AuthUser` (instead of exposing Prisma types)
- Resolver → Service → DB separation
- JWT validation handled in `JwtStrategy`
- Guards handle authorization, services handle data

**Configuration**

- Environment variables:
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
- Centralized config via:
  - `ConfigModule`
  - `env.validation.ts`
  - `configuration.ts`
- `JwtModule.registerAsync` with `ConfigService`

**Tested Flow**

- `register` → creates user + returns token
- `login` → returns token for valid credentials
- `currentUser`:
  - ❌ fails without token
  - ✅ works with `Authorization: Bearer <token>`
- Protected queries require authentication
