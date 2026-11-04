import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: 'standalone',
  outputFileTracingRoot: path.join(process.cwd(), '..'),
  agentRules: false,
  headers() {
    return Promise.resolve([
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]);
  },
  rewrites() {
    const backendUrl = process.env.BACKEND_INTERNAL_URL ?? 'http://127.0.0.1:5000';

    return Promise.resolve([{ source: '/api/:path*', destination: `${backendUrl}/:path*` }]);
  },
};

export default nextConfig;
