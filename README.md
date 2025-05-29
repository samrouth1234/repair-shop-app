## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### DATABASE

Create <code>.env or .env.local</code>

```bash
  - DATABASE_URL=postgres://username:password@localhost:port-database/database_name
  - NEXT_PUBLIC_BASE_DOMAIN=http://localhost:3000
  - NODE_ENV=development
```

### TESTING CONNECTION WITH DATABASE

Open Terminal Type CLI

```bash
  - psql postgres://username-db:password-db@localhost:port-db/database_name
```
