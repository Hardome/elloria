FROM node:26.13.0-alpine AS builder
RUN npm install -g pnpm@12.16.1
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 BACKEND_INTERNAL_URL=http://api:5000
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
RUN pnpm install --frozen-lockfile --filter @elloria/web
COPY web ./web
RUN pnpm --filter @elloria/web run build

FROM node:26.13.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/web/.next/standalone ./
COPY --from=builder --chown=node:node /app/web/public ./web/public
COPY --from=builder --chown=node:node /app/web/.next/static ./web/.next/static
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=15s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "web/server.js"]
