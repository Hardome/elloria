FROM node:24.19-alpine AS base
RUN npm install -g pnpm@12.6.0
WORKDIR /app

FROM base AS builder
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
RUN pnpm install --frozen-lockfile --filter @elloria/api
COPY api ./api
COPY contracts ./contracts
RUN pnpm --filter @elloria/api run build

FROM base AS runner
ENV NODE_ENV=production HOST=0.0.0.0 PORT=5000
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
RUN pnpm install --prod --frozen-lockfile --filter @elloria/api
COPY --from=builder --chown=node:node /app/api/dist ./api/dist
COPY --from=builder --chown=node:node /app/api/src/db/migrations ./api/src/db/migrations
COPY --from=builder --chown=node:node /app/contracts ./contracts
WORKDIR /app/api
USER node
EXPOSE 5000
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:5000/health/ready').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "dist/server.js"]
