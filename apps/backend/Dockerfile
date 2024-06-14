FROM node:20-alpine AS base
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "backend" is the name entered in the project's package.json { name: "backend" }
RUN turbo prune backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter backend

FROM base AS runner
RUN apk update -q
RUN apk add curl
WORKDIR /app

ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 honojs
USER honojs

COPY --from=installer /app .

# Healthcheck
HEALTHCHECK --interval=5s --timeout=5s --start-period=5s CMD curl --silent --fail http://localhost:3000 || exit 1

CMD ["pnpm", "--filter", "backend", "start"]
