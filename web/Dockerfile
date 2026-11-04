FROM node:24.19-alpine AS builder
RUN npm install -g pnpm@12.6.0
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 BACKEND_INTERNAL_URL=http://api:5000
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
RUN pnpm install --frozen-lockfile --filter @elloria/web
COPY web ./web
RUN pnpm --filter @elloria/web run build

FROM node:24.19-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/web/.next/standalone ./
COPY --from=builder --chown=node:node /app/web/public ./web/public
COPY --from=builder --chown=node:node /app/web/.next/static ./web/.next/static
USER node
EXPOSE 3000
CMD ["node", "web/server.js"]
