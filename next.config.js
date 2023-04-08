/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  swcMinify: true,
  reactStrictMode: true,
  env: {
    // HOST_API_KEY: 'http://localhost:5000',
    HOST_API_KEY: 'https://zaio-server.azurewebsites.net',
  },
});
