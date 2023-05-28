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
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
});
