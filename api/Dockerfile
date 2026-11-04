FROM node:26.13.0-alpine AS base
RUN npm install -g pnpm@12.16.1
WORKDIR /app

FROM base AS builder
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY scripts/install-hooks.cjs ./scripts/install-hooks.cjs
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
RUN pnpm install --frozen-lockfile --filter @elloria/api
COPY api ./api
COPY contracts ./contracts
RUN pnpm --filter @elloria/api run build

FROM base AS production-dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY scripts/install-hooks.cjs ./scripts/install-hooks.cjs
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
RUN pnpm install --prod --frozen-lockfile --filter @elloria/api

FROM node:26.13.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=5000
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=production-dependencies --chown=node:node /app/api/node_modules ./api/node_modules
COPY --from=production-dependencies --chown=node:node /app/api/package.json ./api/package.json
COPY --from=builder --chown=node:node /app/api/dist ./api/dist
COPY --from=builder --chown=node:node /app/api/src/db/migrations ./api/src/db/migrations
COPY --from=builder --chown=node:node /app/contracts ./contracts
WORKDIR /app/api
USER node
EXPOSE 5000
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:5000/health/ready').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "dist/server.js"]
