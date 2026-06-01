# Enterprise Microfrontend Starter

A reference **microfrontend architecture** built with **React + Vite + Module
Federation** (`@originjs/vite-plugin-federation`) and **Material UI**, deployable
as **independent AWS Amplify apps**.

```
┌──────────────────────────────────────────────────────────────┐
│                        shell-app (host)                        │
│  Header · Sidebar · Footer · Dashboard · Top-level routing     │
│                                                                │
│   /billing/*  ──lazy import('billing/BillingApp')──▶  remote   │
│   /claims/*   ──lazy import('claims/ClaimsApp')───▶  remote    │
└──────────────────────────────────────────────────────────────┘
        │                                  │
        ▼                                  ▼
┌──────────────────┐               ┌──────────────────┐
│   billing-app    │               │    claims-app    │
│ exposes          │               │ exposes          │
│  ./BillingApp    │               │  ./ClaimsApp     │
│ /billing         │               │ /claims          │
│ /billing/history │               │ /claims/open     │
└──────────────────┘               └──────────────────┘

Shared singletons (one instance on the page): react, react-dom, react-router-dom
Shared at build (source): @mfe/design-system, @mfe/event-bus, @mfe/shared-utils
```

## Repository structure

```
microfrontend-test/
├── apps/
│   ├── shell/        # Host / orchestrator (port 5000)
│   ├── billing/      # Billing remote (port 5001), exposes ./BillingApp
│   └── claims/       # Claims remote (port 5002), exposes ./ClaimsApp
├── packages/
│   ├── design-system/  # MUI theme + Button, Header, Footer, Navbar, Layout, NotificationCenter
│   ├── event-bus/      # Cross-MFE pub/sub (singleton on globalThis)
│   └── shared-utils/   # React hooks (useEventListener) + formatters
├── infra/terraform/  # Amplify apps as IaC
├── .github/workflows/# Independent CI/CD per app
├── package.json      # npm workspaces
└── tsconfig.base.json
```

## Quick start (local)

```bash
cd microfrontend-test
npm install
```

Module Federation remotes must be **built and served** (dev server output does
not expose `remoteEntry.js`). The shell can run on the Vite dev server.

```bash
# 1) Build + preview the two remotes (serve remoteEntry.js)
npm run build:billing && npm run build:claims
npm run preview:billing   # http://localhost:5001/assets/remoteEntry.js
npm run preview:claims    # http://localhost:5002/assets/remoteEntry.js  (separate terminal)

# 2) Run the shell (dev server is fine for the host)
npm run dev:shell         # http://localhost:5000
```

Each remote can also run **fully standalone** during development:

```bash
npm run dev:billing   # http://localhost:5001  (wrapped in the shared Layout)
npm run dev:claims    # http://localhost:5002
```

## Route ownership

| Route             | Owned by | Notes |
|-------------------|----------|-------|
| `/`               | shell    | Redirects to `/dashboard` |
| `/dashboard`      | shell    | Main dashboard page |
| `/billing/*`      | shell → billing | Shell owns the prefix; the Billing remote renders nested `<Routes>` relative to `/billing` |
| `/billing`        | billing  | Billing dashboard (`index` route) |
| `/billing/history`| billing  | Billing history |
| `/claims/*`       | shell → claims | Shell owns the prefix; Claims renders nested `<Routes>` relative to `/claims` |
| `/claims`         | claims   | Claims dashboard (`index` route) |
| `/claims/open`    | claims   | Open claims |

The shell mounts each remote under a wildcard route (`/billing/*`). The remote
exports a component that renders **only its own internal `<Routes>`** using
relative paths — it never creates its own `<BrowserRouter>` (the shell owns the
single shared Router instance).

## Runtime loading — how it works

1. Each remote builds with `vite-plugin-federation` configured with `exposes`.
   This emits a **`remoteEntry.js`** manifest (at `/assets/remoteEntry.js`) that
   lists the modules the remote publishes and the shared deps it can reuse.
2. The shell declares those remotes by **URL** in its federation config
   (`billing` → `VITE_BILLING_REMOTE_URL`, `claims` → `VITE_CLAIMS_REMOTE_URL`).
3. At runtime, `React.lazy(() => import('billing/BillingApp'))` makes the shell
   fetch `remoteEntry.js`, negotiate **shared singletons** (so the remote reuses
   the shell's React instead of downloading its own), then load the exposed
   chunk. This only happens when the user navigates into that route → **route-level
   code splitting across deployment boundaries**.
4. **Runtime discovery / independent deploys:** because the remote is fetched by
   URL at runtime, you can redeploy `billing-app` independently and the shell
   picks up the new code on next load — no shell rebuild required (unless the
   remote *URL* changes).

> The async boundary in each `main.tsx` (`import('./bootstrap')`) exists so the
> shared scope can be initialized before any React code runs.

## Shared runtime / avoiding duplicate React

`react`, `react-dom` and `react-router-dom` are declared as `singleton: true` in
every app's federation config. Result: exactly **one** React, ReactDOM and Router
on the page, and no duplicate React downloads. Routing context, hooks and the
event bus therefore work seamlessly across module boundaries.

## Shared components

`@mfe/design-system` exports the shared MUI `theme` plus `Button`, `Header`,
`Footer`, `Navbar`, `Layout`, `NotificationCenter`, and `AppThemeProvider`.
The shell and both remotes import from it. (In this starter shared packages are
consumed as **source via path aliases**; you could also federate the design
system as its own remote for runtime sharing.)

## Cross-module communication (event bus)

`@mfe/event-bus` is a tiny typed pub/sub stored on `globalThis`, so all modules
share one instance even though each bundles its own copy of the class.

Demo flow:

- **Billing** dashboard → "Update invoice & emit event" emits `invoice-updated`.
- **Claims** dashboard listens (`useEventListener('invoice-updated', …)`) and
  refreshes its linked-invoice data.
- A shared `notification` event is rendered once by `<NotificationCenter/>` in
  the shell layout (works for any module).

## Performance

- Route-level lazy loading of remotes (`React.lazy` + `<Suspense>`).
- Bundle splitting per remote (independent `remoteEntry.js` + chunks).
- Shared singleton dependencies (no duplicate React).
- `RemoteBoundary` error boundary isolates a failing/deploying remote.

## Deployment — AWS Amplify

Three **separate Amplify apps**: `shell-app`, `billing-app`, `claims-app`. Each
has its own committed `amplify.yml` with `appRoot` set to the monorepo subfolder.
Remotes set permissive CORS headers so the shell can fetch `remoteEntry.js`.

### Environment variables (shell-app)

| Variable | Example |
|----------|---------|
| `VITE_BILLING_REMOTE_URL` | `https://main.<id>.amplifyapp.com/assets/remoteEntry.js` |
| `VITE_CLAIMS_REMOTE_URL`  | `https://main.<id>.amplifyapp.com/assets/remoteEntry.js` |

> Set these on the shell **before** its build. Deploy the remotes first, copy
> their URLs, then build the shell.

### Terraform

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars   # fill in repo URL + GitHub token
terraform init
terraform apply                                 # creates the 3 apps + branches
# copy billing/claims default URLs into terraform.tfvars (+ /assets/remoteEntry.js)
terraform apply                                 # re-apply to rebuild the shell
```

## CI/CD

Independent pipelines in `.github/workflows/` (`shell.yml`, `billing.yml`,
`claims.yml`). Each is **path-filtered** so only the changed app deploys, then
triggers an Amplify release via `aws amplify start-job`.

Required GitHub secrets: `AWS_REGION`, `AWS_ACCESS_KEY_ID`,
`AWS_SECRET_ACCESS_KEY`, `SHELL_AMPLIFY_APP_ID`, `BILLING_AMPLIFY_APP_ID`,
`CLAIMS_AMPLIFY_APP_ID`, and (for the shell) `VITE_BILLING_REMOTE_URL` /
`VITE_CLAIMS_REMOTE_URL`.

## Ports

| App     | Dev / Preview port |
|---------|--------------------|
| shell   | 5000 |
| billing | 5001 |
| claims  | 5002 |
