const isProd = process.env.NODE_ENV === 'production';

console.log('[next is prod:]', isProd);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  basePath: '',
  reactStrictMode: false,
  // output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(isProd && {
    compiler: {
      removeConsole: true,
    },
  }),
});
