import path from 'node:path';

import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(process.cwd(), '..'),
  agentRules: false,
  async rewrites() {
    const backendUrl = process.env.BACKEND_INTERNAL_URL ?? 'http://127.0.0.1:5000';

    return [{source: '/api/:path*', destination: `${backendUrl}/:path*`}];
  }
};

export default nextConfig;
