# syntax=docker/dockerfile:1

# ---------- base image ----------
FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# ---------- dependencies ----------
FROM base AS deps
# Install OS deps and glibc compatibility et al.
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ---------- builder ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js project (standalone output)
RUN npm run build

# ---------- runner ----------
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary artifacts from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
