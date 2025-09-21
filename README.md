# Lightweight Postman analog

A lightweight in-browser REST client: send HTTP requests, inspect responses, and keep a local history & collections.

**Deploy:** https://rest-client-app-taupe.vercel.app/

---

## ✨ Features

- **HTTP methods:** `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`
- **Headers & body:** edit headers, raw JSON/text body, copy request/response
- **Response viewer:** status, headers, body (raw/pretty), basic timing
- **Request history** (local) for quick replay
- **i18n** via `next-intl` — `en`, `de` and `ru` (`/en`, `/de`, `/ru`)
- **Design system:** Tailwind CSS + shadcn/ui, icons via lucide-react
- **Validation:** Zod for request payloads
- **Proxy route** `/api/proxy` to bypass CORS (Next.js Route Handler)

> Roadmap: collections CRUD, env variables, import/export, cURL/JS codegen, JSON formatting & highlight, drafts.

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **UI:** Tailwind CSS, shadcn/ui, lucide-react
- **i18n:** next-intl
- **Validation:** Zod
- **Tests:** Vitest + React Testing Library
- **Quality:** ESLint (flat) + Prettier + Husky
- **CI/CD:** GitHub Actions • Deploy: Vercel

---

## 🚀 Quick Start

```bash
# 1) Clone
git clone https://github.com/Elvira-del/rest-client-app.git
cd rest-client-app

# 2) Install deps
npm ci   # or npm i

# 3) Run dev server
npm run dev

# 4) Open
# http://localhost:3000/en  or  http://localhost:3000/ru
```
